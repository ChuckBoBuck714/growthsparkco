import { SITE_URL } from "@/lib/constants";
import { isBlankPosition, type FundingPosition, type LeadFormData, type YesNoAnswer } from "@/lib/validation";

function yesNoLabel(value: YesNoAnswer | undefined): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "";
}

function formatUsd(value: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

/** Rows the applicant actually filled in. "None" drops every row. */
export function filledFundingPositions(data: LeadFormData): FundingPosition[] {
  if (data.noOpenPositions || !Array.isArray(data.fundingPositions)) return [];
  return data.fundingPositions.filter(
    (position) => position && typeof position.lenderName === "string" && !isBlankPosition(position),
  );
}

/**
 * Human-readable positions for Zoho. "None" when the applicant chose no open
 * positions, blank when they left the optional section empty.
 */
export function formatFundingPositions(data: LeadFormData): string {
  if (data.noOpenPositions) return "None";
  const rows = filledFundingPositions(data);
  if (rows.length === 0) return "";
  return rows
    .map(
      (position, index) =>
        `${index + 1}. ${position.lenderName.trim()} — funded ${formatUsd(position.amountFunded)}, balance ${formatUsd(position.currentBalance)}`,
    )
    .join("\n");
}

/** Block appended to the existing Description and notes arguments. */
export function fundingProfileBlock(data: LeadFormData): string {
  const positions = formatFundingPositions(data) || "Not provided";
  const defaulted = yesNoLabel(data.previouslyDefaulted) || "Not answered";
  const homeowner = yesNoLabel(data.homeowner) || "Not answered";
  return [
    "Open business funding positions:",
    positions,
    `Previously defaulted on business funding: ${defaulted}`,
    `Homeowner: ${homeowner}`,
  ].join("\n");
}

function descriptionWithProfile(data: LeadFormData): string {
  const notes = data.notes?.trim() ?? "";
  const profile = fundingProfileBlock(data);
  return notes ? `${notes}\n\n${profile}` : profile;
}

/** Maps website lead fields to Zoho function `arguments` (named + camelCase for Deluge flexibility). */
export function buildZohoLeadArguments(data: LeadFormData): Record<string, string> {
  const description = descriptionWithProfile(data);
  const openPositions = formatFundingPositions(data);
  const previouslyDefaulted = yesNoLabel(data.previouslyDefaulted);
  const homeowner = yesNoLabel(data.homeowner);

  return {
    First_Name: data.firstName.trim(),
    Last_Name: data.lastName.trim(),
    Company: data.businessName.trim(),
    Phone: data.phone.trim(),
    Email: data.email.trim(),
    Time_in_Business: data.timeInBusiness,
    Monthly_Revenue: data.monthlyRevenue,
    Funding_Amount: data.fundingAmount,
    Use_of_Funds: data.useOfFunds,
    Description: description,
    Lead_Source: "Growth Spark Co. Website",
    Website: SITE_URL,
    Consent: data.consent ? "true" : "false",
    Open_Funding_Positions: openPositions,
    Previously_Defaulted: previouslyDefaulted,
    Homeowner: homeowner,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    businessName: data.businessName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    timeInBusiness: data.timeInBusiness,
    monthlyRevenue: data.monthlyRevenue,
    fundingAmount: data.fundingAmount,
    useOfFunds: data.useOfFunds,
    notes: description,
    openFundingPositions: openPositions,
    previouslyDefaulted,
    homeowner,
  };
}

type ZohoExecuteResponse = {
  code?: string;
  message?: string;
  details?: unknown;
};

/**
 * POST lead data to Zoho CRM function `twl_campaign` via REST API execute.
 * @see https://www.zoho.com/crm/developer/docs/functions/serverless-functions.html
 */
export async function submitLeadToZoho(data: LeadFormData): Promise<{
  ok: boolean;
  error?: string;
}> {
  const executeUrl = process.env.ZOHO_CRM_FUNCTION_EXECUTE_URL?.trim();

  if (!executeUrl) {
    console.error("[Zoho] Missing ZOHO_CRM_FUNCTION_EXECUTE_URL");
    return { ok: false, error: "CRM integration is not configured." };
  }

  const argumentsPayload = buildZohoLeadArguments(data);
  const formBody = new URLSearchParams();
  formBody.set("arguments", JSON.stringify(argumentsPayload));

  try {
    const response = await fetch(executeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString(),
      cache: "no-store",
    });

    const rawText = await response.text();
    let parsed: ZohoExecuteResponse = {};

    try {
      parsed = rawText ? (JSON.parse(rawText) as ZohoExecuteResponse) : {};
    } catch {
      console.error("[Zoho] Non-JSON response", { status: response.status, rawText: rawText.slice(0, 500) });
      return { ok: false, error: "Unexpected CRM response." };
    }

    if (!response.ok || parsed.code !== "success") {
      console.error("[Zoho] Execute failed", {
        status: response.status,
        code: parsed.code,
        message: parsed.message,
      });
      return { ok: false, error: parsed.message ?? "CRM submission failed." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[Zoho] Request error", err);
    return { ok: false, error: "Unable to reach CRM." };
  }
}
