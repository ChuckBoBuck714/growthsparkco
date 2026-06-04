export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

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
};

export function validateLeadForm(data: LeadFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.businessName.trim()) errors.businessName = "Business name is required.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  else if (!isValidPhone(data.phone)) errors.phone = "Enter a valid phone number.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(data.email)) errors.email = "Enter a valid email address.";
  if (!data.timeInBusiness) errors.timeInBusiness = "Please select time in business.";
  if (!data.monthlyRevenue) errors.monthlyRevenue = "Please select monthly revenue.";
  if (!data.fundingAmount) errors.fundingAmount = "Please select funding amount.";
  if (!data.useOfFunds) errors.useOfFunds = "Please select intended use of funds.";
  if (!data.consent) errors.consent = "You must agree to the consent terms.";

  return errors;
}
