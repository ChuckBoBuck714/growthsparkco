import { Resend } from "resend";
import { filledFundingPositions } from "@/lib/zoho";
import { isValidCurrencyAmount, isValidEmail, type LeadFormData } from "@/lib/validation";

/** IANA zone used for the timestamp shown to the funding team. */
export const LEAD_EMAIL_TIME_ZONE = "America/Los_Angeles";

export const DEFAULT_LEAD_EMAIL_FROM = "Growth Spark Co. Leads <leads@growthsparkco.com>";
export const DEFAULT_LEAD_NOTIFY_TO = "cs@growthsparkco.com";

const SUBJECT_DASH = "\u2013";

const SOURCE_LABELS: Record<string, string> = {
  "/": "Homepage",
  "/contact": "Contact",
  "/small-business-funding": "Small Business Funding",
  "/working-capital": "Working Capital",
  "/equipment-financing": "Equipment Financing",
  "/business-expansion-capital": "Business Expansion Capital",
  "/inventory-financing": "Inventory Financing",
  "/business-cash-flow": "Business Cash Flow",
};

const OWN_HOSTS = new Set(["growthsparkco.com", "www.growthsparkco.com", "localhost", "127.0.0.1"]);

export type LeadEmailContext = {
  submittedAt: Date;
  /** Page path the form was submitted from, already resolved. */
  source: string;
};

export type LeadEmailPayload = {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

export type LeadEmailSendStatus = {
  ok: boolean;
  skipped?: boolean;
  error?: string;
};

type EmailSendResult = {
  data: { id: string } | null;
  error: { message: string } | null;
};

type PositionRow = {
  lender: string;
  amountFunded: string;
  currentBalance: string;
};

type PositionsBlock =
  | { kind: "none" }
  | { kind: "empty" }
  | { kind: "rows"; rows: PositionRow[] };

type LeadEmailView = {
  subject: string;
  submitted: string;
  source: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  timeInBusiness: string;
  monthlyRevenue: string;
  fundingAmount: string;
  useOfFunds: string;
  positions: PositionsBlock;
  previouslyDefaulted: string;
  homeowner: string;
  notes: string;
  consent: string;
};

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape text before it is placed in HTML. One pass so escaped entities are not double-encoded. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

function cleanLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

function cleanMultiline(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function cleanSource(value: unknown): string {
  if (typeof value !== "string") return "";
  let text = value.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  text = text.slice(0, 300);

  if (/^https?:\/\//i.test(text)) {
    try {
      const url = new URL(text);
      if (OWN_HOSTS.has(url.hostname.toLowerCase())) {
        text = url.pathname || "/";
      }
    } catch {
      return text;
    }
  }

  if (text.startsWith("/")) {
    const pathOnly = text.split(/[?#]/)[0] || "/";
    const collapsed = pathOnly.replace(/\/{2,}/g, "/");
    if (collapsed.length > 1 && collapsed.endsWith("/")) return collapsed.slice(0, -1);
    return collapsed || "/";
  }

  return text;
}

/**
 * Prefer the path the form posted, then the same-site Referer.
 * External referrers are ignored so a third-party page cannot write a URL into the email.
 */
export function resolveLeadSource(
  data: { source?: unknown },
  request?: { headers: { get(name: string): string | null } },
): string {
  const direct = cleanSource(data.source);
  if (direct) return direct;

  const referer = request?.headers.get("referer");
  if (!referer) return "Unknown";

  try {
    const url = new URL(referer);
    if (!OWN_HOSTS.has(url.hostname.toLowerCase())) return "Unknown";
    return cleanSource(url.pathname || "/") || "Unknown";
  } catch {
    return "Unknown";
  }
}

export function formatLeadSource(source: string): string {
  const cleaned = cleanSource(source) || "Unknown";
  const label = SOURCE_LABELS[cleaned];
  if (!label) return cleaned;
  return cleaned === "/" ? "Homepage (/)" : `${label} (${cleaned})`;
}

export function formatLeadTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: LEAD_EMAIL_TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hourCycle: "h12",
  }).format(date);
}

function formatMoney(value: string): string {
  const trimmed = value.trim();
  if (!isValidCurrencyAmount(trimmed)) return trimmed || "Not provided";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(trimmed));
}

function yesNoDisplay(value: unknown): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "Not answered";
}

function formatSubjectAmount(value: string): string {
  const cleaned = cleanLine(value);
  if (!cleaned) return "amount not provided";
  return cleaned.startsWith("$") ? cleaned : `$${cleaned}`;
}

export function leadEmailSubject(businessName: string, fundingAmount: string): string {
  const name = cleanLine(businessName).slice(0, 120) || "Unknown business";
  return `New funding lead: ${name} ${SUBJECT_DASH} ${formatSubjectAmount(fundingAmount)}`;
}

export function leadEmailFrom(raw = process.env.LEAD_EMAIL_FROM): string {
  if (!raw?.trim()) return DEFAULT_LEAD_EMAIL_FROM;
  const value = raw.trim();
  if (/[\r\n]/.test(value) || !value.includes("@")) {
    console.warn("[Lead email] LEAD_EMAIL_FROM is invalid; using the default from address.");
    return DEFAULT_LEAD_EMAIL_FROM;
  }
  return value;
}

export function leadNotifyRecipients(raw = process.env.LEAD_NOTIFY_TO): string[] {
  if (!raw?.trim()) return [DEFAULT_LEAD_NOTIFY_TO];
  const recipients = raw
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0 && !/[\r\n]/.test(item) && isValidEmail(item));
  if (recipients.length === 0) {
    console.warn("[Lead email] LEAD_NOTIFY_TO has no valid addresses; using cs@growthsparkco.com.");
    return [DEFAULT_LEAD_NOTIFY_TO];
  }
  return recipients;
}

function replyToAddress(email: string): string | undefined {
  const trimmed = email.trim();
  if (!trimmed || /[\r\n]/.test(trimmed) || !isValidEmail(trimmed)) return undefined;
  return trimmed;
}

function positionsBlock(data: LeadFormData): PositionsBlock {
  if (data.noOpenPositions) return { kind: "none" };
  const rows = filledFundingPositions(data);
  if (rows.length === 0) return { kind: "empty" };
  return {
    kind: "rows",
    rows: rows.map((position) => ({
      lender: cleanLine(position.lenderName) || "Not provided",
      amountFunded: formatMoney(typeof position.amountFunded === "string" ? position.amountFunded : ""),
      currentBalance: formatMoney(typeof position.currentBalance === "string" ? position.currentBalance : ""),
    })),
  };
}

function positionsSummary(positions: PositionsBlock): string {
  if (positions.kind === "none") return "None";
  if (positions.kind === "empty") return "Not provided";
  return positions.rows
    .map(
      (row, index) =>
        `${index + 1}. Lender: ${row.lender}\n   Amount funded: ${row.amountFunded}\n   Current balance: ${row.currentBalance}`,
    )
    .join("\n");
}

function buildView(data: LeadFormData, context: LeadEmailContext): LeadEmailView {
  const businessName = cleanLine(data.businessName) || "Not provided";
  const fundingAmount = cleanLine(data.fundingAmount) || "Not provided";
  const notes = cleanMultiline(data.notes);

  return {
    subject: leadEmailSubject(data.businessName, data.fundingAmount),
    submitted: formatLeadTimestamp(context.submittedAt),
    source: formatLeadSource(context.source),
    firstName: cleanLine(data.firstName) || "Not provided",
    lastName: cleanLine(data.lastName) || "Not provided",
    email: cleanLine(data.email) || "Not provided",
    phone: cleanLine(data.phone) || "Not provided",
    businessName,
    timeInBusiness: cleanLine(data.timeInBusiness) || "Not provided",
    monthlyRevenue: cleanLine(data.monthlyRevenue) || "Not provided",
    fundingAmount,
    useOfFunds: cleanLine(data.useOfFunds) || "Not provided",
    positions: positionsBlock(data),
    previouslyDefaulted: yesNoDisplay(data.previouslyDefaulted),
    homeowner: yesNoDisplay(data.homeowner),
    notes: notes || "None",
    consent: data.consent ? "Yes" : "No",
  };
}

function renderText(view: LeadEmailView): string {
  const positions =
    view.positions.kind === "rows"
      ? `Open business funding positions:\n${positionsSummary(view.positions)}`
      : `Open business funding positions: ${positionsSummary(view.positions)}`;

  return [
    view.subject,
    "",
    `Submitted (Pacific time): ${view.submitted}`,
    `Page: ${view.source}`,
    "",
    "Contact",
    `First name: ${view.firstName}`,
    `Last name: ${view.lastName}`,
    `Email: ${view.email}`,
    `Phone: ${view.phone}`,
    "",
    "Business",
    `Business name: ${view.businessName}`,
    `Time in business: ${view.timeInBusiness}`,
    `Monthly revenue: ${view.monthlyRevenue}`,
    `Funding amount requested: ${view.fundingAmount}`,
    `Intended use of funds: ${view.useOfFunds}`,
    "",
    positions,
    "",
    `Previously defaulted on business funding: ${view.previouslyDefaulted}`,
    `Homeowner: ${view.homeowner}`,
    `Notes: ${view.notes}`,
    `Consent to be contacted: ${view.consent}`,
    "",
    "Reply to this message to reach the applicant.",
  ].join("\n");
}

function fieldRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;width:46%;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;color:#4a5568;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.45;color:#0f1729;vertical-align:top;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`;
}

function sectionHeading(title: string): string {
  return `<h2 style="margin:28px 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;">${escapeHtml(title)}</h2>`;
}

function fieldTable(rows: Array<[string, string]>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;border-collapse:separate;overflow:hidden;background:#ffffff;">
    ${rows.map(([label, value]) => fieldRow(label, value)).join("")}
  </table>`;
}

function positionsHtml(positions: PositionsBlock): string {
  if (positions.kind !== "rows") {
    const label = positions.kind === "none" ? "None" : "Not provided";
    return `<p style="margin:0;padding:14px 16px;border:1px solid #e2e8f0;border-radius:10px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0f1729;">Open business funding positions: ${escapeHtml(label)}</p>`;
  }

  const body = positions.rows
    .map(
      (row) => `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0f1729;">${escapeHtml(row.lender)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0f1729;">${escapeHtml(row.amountFunded)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0f1729;">${escapeHtml(row.currentBalance)}</td>
      </tr>`,
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;border-collapse:separate;overflow:hidden;background:#ffffff;">
    <thead>
      <tr>
        <th align="left" style="padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#4a5568;">Lender</th>
        <th align="left" style="padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#4a5568;">Amount funded</th>
        <th align="left" style="padding:10px 12px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:#4a5568;">Current balance</th>
      </tr>
    </thead>
    <tbody>${body}</tbody>
  </table>`;
}

function renderHtml(view: LeadEmailView): string {
  const preheader = `New funding lead from ${view.businessName} for ${view.fundingAmount}. Submitted ${view.submitted}.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(view.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 24px;background:#0f1729;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#93c5fd;">Growth Spark Co.</p>
              <h1 style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;color:#ffffff;">New funding lead</h1>
              <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;">${escapeHtml(view.fundingAmount)}</p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.4;color:#e2e8f0;">${escapeHtml(view.businessName)}</p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;color:#cbd5e1;">${escapeHtml(`${view.firstName} ${view.lastName}`)} · ${escapeHtml(view.email)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">
              ${sectionHeading("Contact")}
              ${fieldTable([
                ["First name", view.firstName],
                ["Last name", view.lastName],
                ["Email", view.email],
                ["Phone", view.phone],
              ])}
              ${sectionHeading("Business")}
              ${fieldTable([
                ["Business name", view.businessName],
                ["Time in business", view.timeInBusiness],
                ["Monthly revenue", view.monthlyRevenue],
                ["Funding amount requested", view.fundingAmount],
                ["Intended use of funds", view.useOfFunds],
              ])}
              ${sectionHeading("Open business funding positions")}
              ${positionsHtml(view.positions)}
              ${sectionHeading("Qualification")}
              ${fieldTable([
                ["Previously defaulted on business funding", view.previouslyDefaulted],
                ["Homeowner", view.homeowner],
              ])}
              ${sectionHeading("Notes")}
              ${fieldTable([["Notes", view.notes]])}
              ${sectionHeading("Submission")}
              ${fieldTable([
                ["Page", view.source],
                ["Submitted (Pacific time)", view.submitted],
                ["Consent to be contacted", view.consent],
              ])}
              <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#4a5568;">Reply to this message to reach the applicant. This notification was sent because a lead form was submitted on growthsparkco.com.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** HTML and plain-text notification. Does not send. */
export function buildLeadNotification(data: LeadFormData, context: LeadEmailContext): LeadEmailPayload {
  const view = buildView(data, context);
  const replyTo = replyToAddress(view.email);

  return {
    from: leadEmailFrom(),
    to: leadNotifyRecipients(),
    ...(replyTo ? { replyTo } : {}),
    subject: view.subject,
    html: renderHtml(view),
    text: renderText(view),
  };
}

async function sendWithResend(payload: LeadEmailPayload, apiKey: string): Promise<EmailSendResult> {
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  });
  return { data: result.data, error: result.error };
}

/**
 * Send the lead notification. Missing API key skips the send with a warning.
 * Network and provider errors are logged and returned; this function does not throw.
 * RESEND_API_KEY is configured in Vercel.
 */
export async function sendLeadNotification(
  data: LeadFormData,
  context: LeadEmailContext,
  options?: { send?: (payload: LeadEmailPayload) => Promise<EmailSendResult> },
): Promise<LeadEmailSendStatus> {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.warn("[Lead email] RESEND_API_KEY is not set; skipping notification email.");
      return { ok: true, skipped: true };
    }

    const payload = buildLeadNotification(data, context);
    const result = await (options?.send ?? ((message) => sendWithResend(message, apiKey)))(payload);

    if (result.error) {
      console.error("[Lead email] Failed to send notification", {
        businessName: cleanLine(data.businessName),
        applicantEmail: cleanLine(data.email),
        error: result.error.message,
      });
      return { ok: false, error: result.error.message };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email send failed.";
    console.error("[Lead email] Failed to send notification", {
      businessName: cleanLine(data.businessName),
      applicantEmail: cleanLine(data.email),
      error: message,
    });
    return { ok: false, error: message };
  }
}
