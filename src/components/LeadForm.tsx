"use client";

import { useState, type FormEvent } from "react";
import {
  CONSENT_TEXT,
  FUNDING_AMOUNT_OPTIONS,
  MONTHLY_REVENUE_OPTIONS,
  TIME_IN_BUSINESS_OPTIONS,
  USE_OF_FUNDS_OPTIONS,
} from "@/lib/constants";
import { validateLeadForm, type LeadFormData } from "@/lib/validation";

const initialState: LeadFormData = {
  firstName: "",
  lastName: "",
  businessName: "",
  phone: "",
  email: "",
  timeInBusiness: "",
  monthlyRevenue: "",
  fundingAmount: "",
  useOfFunds: "",
  notes: "",
  consent: false,
};

type LeadFormProps = {
  id?: string;
  className?: string;
};

export function LeadForm({ id = "request-review", className = "" }: LeadFormProps) {
  const [form, setForm] = useState<LeadFormData>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof LeadFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLeadForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) setErrors(data.errors);
        else setErrors({ form: "Something went wrong. Please try again." });
        return;
      }

      setSuccess(true);
      setForm(initialState);
    } catch {
      setErrors({ form: "Unable to submit. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        id={id}
        className={`rounded-2xl border border-accent-green/30 bg-accent-green-light p-8 shadow-lg ${className}`}
        role="status"
      >
        <div className="flex items-start gap-3">
          <svg className="h-6 w-6 shrink-0 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-navy font-medium leading-relaxed">
            Thank you. Your request has been received. A funding specialist may contact you during
            business hours to review your information.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-medium text-accent-blue hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-navy placeholder:text-slate-400 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-navy";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <div
      id={id}
      className={`rounded-2xl border border-border bg-white p-6 shadow-lg sm:p-8 ${className}`}
    >
      <h2 className="text-xl font-bold text-navy sm:text-2xl">Request a Business Funding Review</h2>
      <p className="mt-2 text-sm text-charcoal leading-relaxed">
        Tell us a little about your business and a funding specialist may contact you to review
        available options.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
            />
            {errors.firstName && <p id="firstName-error" className={errorClass}>{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="businessName" className={labelClass}>
            Business Name <span className="text-red-600">*</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className={inputClass}
            aria-invalid={!!errors.businessName}
          />
          {errors.businessName && <p className={errorClass}>{errors.businessName}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="timeInBusiness" className={labelClass}>
              Time in Business <span className="text-red-600">*</span>
            </label>
            <select
              id="timeInBusiness"
              name="timeInBusiness"
              value={form.timeInBusiness}
              onChange={(e) => update("timeInBusiness", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.timeInBusiness}
            >
              <option value="">Select...</option>
              {TIME_IN_BUSINESS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.timeInBusiness && <p className={errorClass}>{errors.timeInBusiness}</p>}
          </div>
          <div>
            <label htmlFor="monthlyRevenue" className={labelClass}>
              Monthly Business Revenue / Deposits <span className="text-red-600">*</span>
            </label>
            <select
              id="monthlyRevenue"
              name="monthlyRevenue"
              value={form.monthlyRevenue}
              onChange={(e) => update("monthlyRevenue", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.monthlyRevenue}
            >
              <option value="">Select...</option>
              {MONTHLY_REVENUE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.monthlyRevenue && <p className={errorClass}>{errors.monthlyRevenue}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fundingAmount" className={labelClass}>
              Funding Amount Requested <span className="text-red-600">*</span>
            </label>
            <select
              id="fundingAmount"
              name="fundingAmount"
              value={form.fundingAmount}
              onChange={(e) => update("fundingAmount", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.fundingAmount}
            >
              <option value="">Select...</option>
              {FUNDING_AMOUNT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.fundingAmount && <p className={errorClass}>{errors.fundingAmount}</p>}
          </div>
          <div>
            <label htmlFor="useOfFunds" className={labelClass}>
              Intended Use of Funds <span className="text-red-600">*</span>
            </label>
            <select
              id="useOfFunds"
              name="useOfFunds"
              value={form.useOfFunds}
              onChange={(e) => update("useOfFunds", e.target.value)}
              className={inputClass}
              aria-invalid={!!errors.useOfFunds}
            >
              <option value="">Select...</option>
              {USE_OF_FUNDS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.useOfFunds && <p className={errorClass}>{errors.useOfFunds}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelClass}>
            Optional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className={inputClass}
            placeholder="Share any additional context about your funding needs."
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
            aria-invalid={!!errors.consent}
          />
          <label htmlFor="consent" className="text-xs leading-relaxed text-charcoal">
            {CONSENT_TEXT}
          </label>
        </div>
        {errors.consent && <p className={errorClass}>{errors.consent}</p>}
        {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit for Review"}
        </button>
      </form>
    </div>
  );
}
