import { resolveLeadSource, sendLeadNotification, type LeadEmailContext, type LeadEmailSendStatus } from "@/lib/lead-email";
import { validateLeadForm, type LeadFormData } from "@/lib/validation";
import { submitLeadToZoho } from "@/lib/zoho";

const ZOHO_FAILURE_MESSAGE =
  "We could not submit your request right now. Please try again or contact us directly.";

const SUCCESS_MESSAGE =
  "Thank you. Your request has been received. A funding specialist may contact you during business hours to review your information.";

export type LeadApiBody = {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export type LeadDeliveryResult = {
  httpStatus: number;
  body: LeadApiBody;
  zohoOk: boolean;
  emailOk: boolean;
  emailSkipped: boolean;
};

type ZohoResult = { ok: boolean; error?: string };

export type LeadDeliveryDeps = {
  submitToZoho: (data: LeadFormData) => Promise<ZohoResult>;
  notify: (data: LeadFormData, context: LeadEmailContext) => Promise<LeadEmailSendStatus>;
};

const defaultDeps: LeadDeliveryDeps = {
  submitToZoho: submitLeadToZoho,
  notify: sendLeadNotification,
};

type Settled<T> = { status: "fulfilled"; value: T } | { status: "rejected"; reason: unknown };

/**
 * Run a side effect that must not be skipped when the other side effect throws
 * while the call list is being built. Both the CRM push and the email start.
 */
function settle<T>(start: () => Promise<T> | T): Promise<Settled<T>> {
  try {
    return Promise.resolve(start()).then(
      (value) => ({ status: "fulfilled", value }),
      (reason: unknown) => ({ status: "rejected", reason }),
    );
  } catch (reason) {
    return Promise.resolve({ status: "rejected", reason });
  }
}

/**
 * Push a validated lead to Zoho and email the funding team.
 * Either failure is independent: a rejected email still waits for Zoho, and a
 * rejected Zoho push still sends the email. The HTTP result follows Zoho only.
 */
export async function deliverSubmittedLead(
  data: LeadFormData,
  context: LeadEmailContext,
  deps: LeadDeliveryDeps = defaultDeps,
): Promise<LeadDeliveryResult> {
  const zohoAttempt = settle(() => deps.submitToZoho(data));
  const emailAttempt = settle(() => deps.notify(data, context));
  const [zohoSettled, emailSettled] = await Promise.all([zohoAttempt, emailAttempt]);

  let zohoOk = false;
  if (zohoSettled.status === "fulfilled") {
    zohoOk = zohoSettled.value.ok;
  } else {
    console.error("[Lead] Zoho submission threw", zohoSettled.reason);
  }

  let emailOk = false;
  let emailSkipped = false;
  if (emailSettled.status === "fulfilled") {
    emailOk = emailSettled.value.ok;
    emailSkipped = emailSettled.value.skipped === true;
  } else {
    console.error("[Lead email] Notification threw", emailSettled.reason);
  }

  if (!zohoOk) {
    return {
      httpStatus: 502,
      body: { success: false, errors: { form: ZOHO_FAILURE_MESSAGE } },
      zohoOk: false,
      emailOk,
      emailSkipped,
    };
  }

  return {
    httpStatus: 200,
    body: { success: true, message: SUCCESS_MESSAGE },
    zohoOk: true,
    emailOk,
    emailSkipped,
  };
}

/**
 * Validate a lead, then deliver it. Invalid forms do not call Zoho or send mail.
 */
export async function handleLeadSubmission(
  body: LeadFormData,
  request: { headers: { get(name: string): string | null } },
  deps?: LeadDeliveryDeps,
): Promise<LeadDeliveryResult> {
  const errors = validateLeadForm(body);
  if (Object.keys(errors).length > 0) {
    return {
      httpStatus: 400,
      body: { success: false, errors },
      zohoOk: false,
      emailOk: false,
      emailSkipped: false,
    };
  }

  return deliverSubmittedLead(
    body,
    { source: resolveLeadSource(body, request), submittedAt: new Date() },
    deps,
  );
}
