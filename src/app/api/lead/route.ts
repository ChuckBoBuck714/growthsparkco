import { NextResponse } from "next/server";
import { handleLeadSubmission } from "@/lib/deliver-lead";
import type { LeadFormData } from "@/lib/validation";

/**
 * Lead submission endpoint.
 *
 * Validates the form, pushes the lead to Zoho CRM function `twl_campaign`,
 * and emails the funding team. The email is best-effort: a mail failure does
 * not change the response, and a Zoho failure still attempts the email.
 *
 * Requires ZOHO_CRM_FUNCTION_EXECUTE_URL. Email uses RESEND_API_KEY,
 * LEAD_EMAIL_FROM, and LEAD_NOTIFY_TO (see .env.example).
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadFormData;
    const result = await handleLeadSubmission(body, request);

    if (result.zohoOk && process.env.NODE_ENV === "development") {
      console.log("[Lead submission] forwarded to Zoho", {
        receivedAt: new Date().toISOString(),
        email: body.email,
        businessName: body.businessName,
        emailOk: result.emailOk,
        emailSkipped: result.emailSkipped,
      });
    }

    return NextResponse.json(result.body, { status: result.httpStatus });
  } catch {
    return NextResponse.json(
      { success: false, errors: { form: "Invalid request." } },
      { status: 500 },
    );
  }
}
