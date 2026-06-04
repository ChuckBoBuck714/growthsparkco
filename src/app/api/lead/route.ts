import { NextResponse } from "next/server";
import { submitLeadToZoho } from "@/lib/zoho";
import { validateLeadForm, type LeadFormData } from "@/lib/validation";

/**
 * Lead submission endpoint → Zoho CRM function `twl_campaign`.
 *
 * Requires ZOHO_CRM_FUNCTION_EXECUTE_URL in environment (see .env.example).
 * Set the same variable in Vercel/hosting for production.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadFormData;

    const errors = validateLeadForm(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const zoho = await submitLeadToZoho(body);

    if (!zoho.ok) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            form:
              "We could not submit your request right now. Please try again or contact us directly.",
          },
        },
        { status: 502 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Lead submission] forwarded to Zoho", {
        receivedAt: new Date().toISOString(),
        email: body.email,
        businessName: body.businessName,
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your request has been received. A funding specialist may contact you during business hours to review your information.",
    });
  } catch {
    return NextResponse.json(
      { success: false, errors: { form: "Invalid request." } },
      { status: 500 }
    );
  }
}
