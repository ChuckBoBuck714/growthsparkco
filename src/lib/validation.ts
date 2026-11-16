export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export type FundingPosition = {
  id: string;
  lenderName: string;
  amountFunded: string;
  currentBalance: string;
};

/** Empty string means the optional question was left blank. */
export type YesNoAnswer = "" | "yes" | "no";

export const MAX_FUNDING_POSITIONS = 8;

export type LeadFormData = {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  timeInBusiness: string;
  monthlyRevenue: string;
  fundingAmount: string;
  useOfFunds: string;
  notes?: string;
  consent: boolean;
  fundingPositions: FundingPosition[];
  noOpenPositions: boolean;
  previouslyDefaulted: YesNoAnswer;
  homeowner: YesNoAnswer;
  /** Path of the page that submitted the form. Added by the browser; not a typed field. */
  source?: string;
};

/** Keep digits and a single decimal point with at most two places. */
export function sanitizeCurrencyInput(raw: string): string {
  const cleaned = raw.replace(/,/g, "").replace(/[^\d.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot === -1) return cleaned.slice(0, 12);
  const whole = cleaned.slice(0, dot).slice(0, 12);
  const fraction = cleaned.slice(dot + 1).replace(/\./g, "").slice(0, 2);
  return `${whole}.${fraction}`;
}

export function isValidCurrencyAmount(value: string): boolean {
  if (!/^\d{1,12}(\.\d{1,2})?$/.test(value)) return false;
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 && amount <= 1_000_000_000_000;
}

export function isBlankPosition(position: FundingPosition): boolean {
  return (
    !position.lenderName.trim() &&
    !position.amountFunded.trim() &&
    !position.currentBalance.trim()
  );
}

function readYesNo(value: unknown): YesNoAnswer | null {
  if (value === undefined || value === null || value === "") return "";
  if (value === "yes" || value === "no") return value;
  return null;
}

export function validateLeadForm(data: LeadFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.firstName?.trim()) errors.firstName = "First name is required.";
  if (!data.lastName?.trim()) errors.lastName = "Last name is required.";
  if (!data.businessName?.trim()) errors.businessName = "Business name is required.";
  if (!data.phone?.trim()) errors.phone = "Phone number is required.";
  else if (!isValidPhone(data.phone)) errors.phone = "Enter a valid phone number.";
  if (!data.email?.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(data.email)) errors.email = "Enter a valid email address.";
  if (!data.timeInBusiness) errors.timeInBusiness = "Please select time in business.";
  if (!data.monthlyRevenue) errors.monthlyRevenue = "Please select monthly revenue.";
  if (!data.fundingAmount) errors.fundingAmount = "Please select funding amount.";
  if (!data.useOfFunds) errors.useOfFunds = "Please select intended use of funds.";
  if (!data.consent) errors.consent = "You must agree to the consent terms.";

  const positions = Array.isArray(data.fundingPositions)
    ? data.fundingPositions
    : data.fundingPositions == null
      ? []
      : null;
  if (positions === null) {
    errors.fundingPositions = "Open funding positions could not be read. Please try again.";
  } else if (positions.length > MAX_FUNDING_POSITIONS) {
    errors.fundingPositions = `You can add up to ${MAX_FUNDING_POSITIONS} open positions.`;
  } else if (!data.noOpenPositions) {
    positions.forEach((position, index) => {
      if (!position || typeof position !== "object") {
        errors.fundingPositions = "Open funding positions could not be read. Please try again.";
        return;
      }
      const lenderName = typeof position.lenderName === "string" ? position.lenderName : "";
      const amountFunded = typeof position.amountFunded === "string" ? position.amountFunded : "";
      const currentBalance = typeof position.currentBalance === "string" ? position.currentBalance : "";
      if (!lenderName.trim() && !amountFunded.trim() && !currentBalance.trim()) return;

      const rowId = typeof position.id === "string" && position.id ? position.id : `row-${index + 1}`;
      if (!lenderName.trim()) {
        errors[`position-${rowId}-lenderName`] = "Enter the lender name, or clear this row.";
      } else if (lenderName.trim().length > 120) {
        errors[`position-${rowId}-lenderName`] = "Lender name must be 120 characters or fewer.";
      }
      if (!amountFunded.trim()) {
        errors[`position-${rowId}-amountFunded`] = "Enter the amount funded, or clear this row.";
      } else if (!isValidCurrencyAmount(amountFunded.trim())) {
        errors[`position-${rowId}-amountFunded`] =
          "Enter the amount funded using numbers only, such as 25000 or 25000.00.";
      }
      if (!currentBalance.trim()) {
        errors[`position-${rowId}-currentBalance`] = "Enter the current balance, or clear this row.";
      } else if (!isValidCurrencyAmount(currentBalance.trim())) {
        errors[`position-${rowId}-currentBalance`] =
          "Enter the current balance using numbers only, such as 10000 or 10000.00.";
      }
    });
  }

  if (readYesNo(data.previouslyDefaulted) === null) {
    errors.previouslyDefaulted = "Choose Yes or No, or leave this question blank.";
  }
  if (readYesNo(data.homeowner) === null) {
    errors.homeowner = "Choose Yes or No, or leave this question blank.";
  }

  return errors;
}
