import type { LeadFormData } from "@/lib/validation";

/** Maps website lead fields to Zoho function `arguments` (named + camelCase for Deluge flexibility). */
export function buildZohoLeadArguments(data: LeadFormData): Record<string, string> {
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
    Description: data.notes?.trim() ?? "",
    Lead_Source: "Growth Spark Co. Website",
    Website: "https://growthsparkco.com",
    Consent: data.consent ? "true" : "false",
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    businessName: data.businessName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    timeInBusiness: data.timeInBusiness,
    monthlyRevenue: data.monthlyRevenue,
    fundingAmount: data.fundingAmount,
    useOfFunds: data.useOfFunds,
    notes: data.notes?.trim() ?? "",
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
