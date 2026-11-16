"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CONSENT_TEXT,
  FUNDING_AMOUNT_OPTIONS,
  MONTHLY_REVENUE_OPTIONS,
  TIME_IN_BUSINESS_OPTIONS,
  USE_OF_FUNDS_OPTIONS,
  type UseOfFundsOption,
} from "@/lib/constants";
import {
  MAX_FUNDING_POSITIONS,
  sanitizeCurrencyInput,
  validateLeadForm,
  type FundingPosition,
  type LeadFormData,
  type YesNoAnswer,
} from "@/lib/validation";

function createPosition(id: string): FundingPosition {
  return { id, lenderName: "", amountFunded: "", currentBalance: "" };
}

function createFormState(defaultUseOfFunds?: UseOfFundsOption): LeadFormData {
  return {
    firstName: "",
    lastName: "",
    businessName: "",
    phone: "",
    email: "",
    timeInBusiness: "",
    monthlyRevenue: "",
    fundingAmount: "",
    useOfFunds: defaultUseOfFunds ?? "",
    notes: "",
    consent: false,
    fundingPositions: [createPosition("position-1")],
    noOpenPositions: false,
    previouslyDefaulted: "",
    homeowner: "",
  };
}

type LeadFormProps = {
  id?: string;
  className?: string;
  defaultUseOfFunds?: UseOfFundsOption;
};

export function LeadForm({ id = "request-review", className = "", defaultUseOfFunds }: LeadFormProps) {
  const pathname = usePathname();
  const [form, setForm] = useState<LeadFormData>(() => createFormState(defaultUseOfFunds));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const nextPositionId = useRef(2);
  const positionToFocus = useRef<string | null>(null);

  useEffect(() => {
    if (!positionToFocus.current) return;
    const fieldId = `lenderName-${positionToFocus.current}`;
    positionToFocus.current = null;
    document.getElementById(fieldId)?.focus();
  }, [form.fundingPositions]);

  const clearError = (key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const update = (field: keyof LeadFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const updatePosition = (
    positionId: string,
    field: "lenderName" | "amountFunded" | "currentBalance",
    value: string,
  ) => {
    const nextValue = field === "lenderName" ? value : sanitizeCurrencyInput(value);
    setForm((prev) => ({
      ...prev,
      fundingPositions: prev.fundingPositions.map((position) =>
        position.id === positionId ? { ...position, [field]: nextValue } : position,
      ),
    }));
    clearError(`position-${positionId}-${field}`);
    clearError("fundingPositions");
  };

  const addPosition = () => {
    if (form.fundingPositions.length >= MAX_FUNDING_POSITIONS) return;
    const positionId = `position-${nextPositionId.current++}`;
    positionToFocus.current = positionId;
    setForm((prev) => ({
      ...prev,
      noOpenPositions: false,
      fundingPositions: [...prev.fundingPositions, createPosition(positionId)],
    }));
    clearError("fundingPositions");
  };

  const removePosition = (positionId: string) => {
    setForm((prev) => ({
      ...prev,
      fundingPositions: prev.fundingPositions.filter((position) => position.id !== positionId),
    }));
    clearError(`position-${positionId}-lenderName`);
    clearError(`position-${positionId}-amountFunded`);
    clearError(`position-${positionId}-currentBalance`);
    clearError("fundingPositions");
  };

  const setNoOpenPositions = (checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      noOpenPositions: checked,
      fundingPositions:
        !checked && prev.fundingPositions.length === 0
          ? [createPosition(`position-${nextPositionId.current++}`)]
          : prev.fundingPositions,
    }));
    clearError("fundingPositions");
  };

  const toggleYesNo = (field: "previouslyDefaulted" | "homeowner", value: Exclude<YesNoAnswer, "">) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
    clearError(field);
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
        body: JSON.stringify({ ...form, source: pathname || "/" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.errors) setErrors(data.errors);
        else setErrors({ form: "Something went wrong. Please try again." });
        return;
      }

      setSuccess(true);
      nextPositionId.current = 2;
      setForm(createFormState(defaultUseOfFunds));
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
        className={`scroll-mt-28 rounded-2xl border border-accent-green/30 bg-accent-green-light p-8 shadow-lg ${className}`}
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
      className={`scroll-mt-28 rounded-2xl border border-border bg-white p-6 shadow-lg sm:p-8 ${className}`}
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

        <div className="rounded-xl border border-border bg-slate-50 p-4">
          <h3 id={`${id}-open-positions-heading`} className="text-sm font-semibold text-navy">
            Open Business Funding Positions
          </h3>
          <p id={`${id}-open-positions-help`} className="mt-1 text-xs leading-relaxed text-charcoal">
            Optional. Add a row for each business funding balance you still owe, or select None if you
            have no open positions. A blank row is ignored.
          </p>
          <div className="mt-3 flex items-start gap-3">
            <input
              id={`${id}-no-open-positions`}
              name="noOpenPositions"
              type="checkbox"
              checked={form.noOpenPositions}
              onChange={(e) => setNoOpenPositions(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
              aria-describedby={`${id}-open-positions-help`}
            />
            <label htmlFor={`${id}-no-open-positions`} className="text-sm text-charcoal">
              None. I have no open business funding positions.
            </label>
          </div>

          {form.noOpenPositions ? null : (
            <div className="mt-4 space-y-4" aria-labelledby={`${id}-open-positions-heading`}>
              {form.fundingPositions.length === 0 ? (
                <p className="text-sm text-charcoal">No positions added.</p>
              ) : null}
              {form.fundingPositions.map((position, index) => {
                const lenderId = `lenderName-${position.id}`;
                const fundedId = `amountFunded-${position.id}`;
                const balanceId = `currentBalance-${position.id}`;
                const lenderError = errors[`position-${position.id}-lenderName`];
                const fundedError = errors[`position-${position.id}-amountFunded`];
                const balanceError = errors[`position-${position.id}-currentBalance`];
                return (
                  <div
                    key={position.id}
                    className="rounded-lg border border-border bg-white p-4"
                    role="group"
                    aria-label={`Funding position ${index + 1}`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-navy">Position {index + 1}</p>
                      <button
                        type="button"
                        onClick={() => removePosition(position.id)}
                        className="inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-red-700 hover:underline focus:outline-none focus:ring-2 focus:ring-accent-blue"
                        aria-label={`Remove funding position ${index + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label htmlFor={lenderId} className={labelClass}>
                          Lender name
                        </label>
                        <input
                          id={lenderId}
                          name={lenderId}
                          type="text"
                          value={position.lenderName}
                          onChange={(e) => updatePosition(position.id, "lenderName", e.target.value)}
                          className={inputClass}
                          maxLength={120}
                          autoComplete="organization"
                          aria-invalid={!!lenderError}
                          aria-describedby={lenderError ? `${lenderId}-error` : undefined}
                        />
                        {lenderError && (
                          <p id={`${lenderId}-error`} className={errorClass}>
                            {lenderError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={fundedId} className={labelClass}>
                          Amount funded
                        </label>
                        <div className="relative">
                          <span
                            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-charcoal"
                            aria-hidden="true"
                          >
                            $
                          </span>
                          <input
                            id={fundedId}
                            name={fundedId}
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                            placeholder="0.00"
                            value={position.amountFunded}
                            onChange={(e) => updatePosition(position.id, "amountFunded", e.target.value)}
                            className={`${inputClass} pl-7`}
                            aria-invalid={!!fundedError}
                            aria-describedby={fundedError ? `${fundedId}-error` : `${fundedId}-hint`}
                          />
                        </div>
                        <p id={`${fundedId}-hint`} className="sr-only">
                          Dollars and cents. Numbers only.
                        </p>
                        {fundedError && (
                          <p id={`${fundedId}-error`} className={errorClass}>
                            {fundedError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor={balanceId} className={labelClass}>
                          Current balance
                        </label>
                        <div className="relative">
                          <span
                            className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-charcoal"
                            aria-hidden="true"
                          >
                            $
                          </span>
                          <input
                            id={balanceId}
                            name={balanceId}
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                            placeholder="0.00"
                            value={position.currentBalance}
                            onChange={(e) => updatePosition(position.id, "currentBalance", e.target.value)}
                            className={`${inputClass} pl-7`}
                            aria-invalid={!!balanceError}
                            aria-describedby={balanceError ? `${balanceId}-error` : `${balanceId}-hint`}
                          />
                        </div>
                        <p id={`${balanceId}-hint`} className="sr-only">
                          Dollars and cents. Numbers only.
                        </p>
                        {balanceError && (
                          <p id={`${balanceId}-error`} className={errorClass}>
                            {balanceError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addPosition}
                disabled={form.fundingPositions.length >= MAX_FUNDING_POSITIONS}
                className="inline-flex min-h-11 items-center rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-accent-blue hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add another position
              </button>
              {errors.fundingPositions && <p className={errorClass}>{errors.fundingPositions}</p>}
            </div>
          )}
        </div>

        <fieldset>
          <legend className={labelClass}>Have you ever previously defaulted on business funding?</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            <label className="inline-flex min-h-11 items-center gap-2 text-sm text-charcoal" htmlFor={`${id}-defaulted-yes`}>
              <input
                id={`${id}-defaulted-yes`}
                name="previouslyDefaulted"
                type="checkbox"
                checked={form.previouslyDefaulted === "yes"}
                onChange={() => toggleYesNo("previouslyDefaulted", "yes")}
                className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
              />
              Yes
            </label>
            <label className="inline-flex min-h-11 items-center gap-2 text-sm text-charcoal" htmlFor={`${id}-defaulted-no`}>
              <input
                id={`${id}-defaulted-no`}
                name="previouslyDefaulted"
                type="checkbox"
                checked={form.previouslyDefaulted === "no"}
                onChange={() => toggleYesNo("previouslyDefaulted", "no")}
                className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
              />
              No
            </label>
          </div>
          {errors.previouslyDefaulted && <p className={errorClass}>{errors.previouslyDefaulted}</p>}
        </fieldset>

        <fieldset>
          <legend className={labelClass}>Are you a homeowner?</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            <label className="inline-flex min-h-11 items-center gap-2 text-sm text-charcoal" htmlFor={`${id}-homeowner-yes`}>
              <input
                id={`${id}-homeowner-yes`}
                name="homeowner"
                type="checkbox"
                checked={form.homeowner === "yes"}
                onChange={() => toggleYesNo("homeowner", "yes")}
                className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
              />
              Yes
            </label>
            <label className="inline-flex min-h-11 items-center gap-2 text-sm text-charcoal" htmlFor={`${id}-homeowner-no`}>
              <input
                id={`${id}-homeowner-no`}
                name="homeowner"
                type="checkbox"
                checked={form.homeowner === "no"}
                onChange={() => toggleYesNo("homeowner", "no")}
                className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue"
              />
              No
            </label>
          </div>
          {errors.homeowner && <p className={errorClass}>{errors.homeowner}</p>}
        </fieldset>

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
            {CONSENT_TEXT} View our{" "}
            <Link
              href="/terms"
              className="font-medium text-accent-blue underline hover:text-blue-700"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-accent-blue underline hover:text-blue-700"
            >
              Privacy Policy
            </Link>
            .
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
