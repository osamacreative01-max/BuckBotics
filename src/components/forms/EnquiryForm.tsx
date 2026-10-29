"use client";

import Link from "next/link";
import { useActionState, useMemo, useRef } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
import { BUDGET_BANDS, ENQUIRY_TYPES, initialFormState } from "@/lib/enquiry";
import { INDUSTRIES } from "@/data/industries";
import { FAMILIES } from "@/data/families";
import { site } from "@/data/site";
import { CARE_SENTINEL } from "@/data/careSentinel";

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-[0.95rem] text-midnight placeholder:text-muted/70 transition-colors focus:border-blue focus:outline-none";

function fieldClass(invalid: boolean) {
  return `${inputBase} ${invalid ? "border-red-400 bg-red-50/40" : "border-line"}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-600" role="alert">
      {message}
    </p>
  );
}

export function EnquiryForm({
  defaultType = "feasibility",
  showTypeSelect = true,
}: {
  defaultType?: string;
  showTypeSelect?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialFormState);
  const renderedAtRef = useRef<number | null>(null);

  const industryOptions = useMemo(() => INDUSTRIES, []);
  const modelGroups = useMemo(
    () =>
      FAMILIES.map((f) => ({
        label: f.name,
        options: f.models.map((m) => ({ value: `${f.slug}|${m.short}`, label: m.name })),
      })),
    [],
  );

  if (state.status === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8"
        role="status"
        aria-live="polite"
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-700">
          Enquiry recorded
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-midnight">Thank you.</h3>
        <p className="mt-3 leading-relaxed text-graphite">{state.message}</p>
        {state.tags?.length ? (
          <p className="mt-4 font-mono text-xs text-muted">
            Lead tags: {state.tags.join(" · ")}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-outline mt-6 px-5 py-2.5 text-sm font-semibold"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const errs = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="grid gap-6">
      {state.status === "error" && !Object.keys(errs).length ? (
        <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      ) : null}

      {Object.keys(errs).length > 0 ? (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          <p className="font-semibold">Please correct the following:</p>
          <ul className="mt-1 list-disc pl-5">
            {Object.entries(errs).map(([k, v]) => (
              <li key={k}>{v}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Hidden anti-spam controls */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {/* Time-trap: stamped imperatively at mount (client only, no re-render). */}
      <input
        type="hidden"
        name="renderedAt"
        ref={(el) => {
          if (el && !el.value) {
            renderedAtRef.current = Date.now();
            el.value = String(renderedAtRef.current);
          }
        }}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contactName" className="spec-label block mb-1.5">
            Contact name *
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errs.contactName)}
            aria-describedby={errs.contactName ? "err-contactName" : undefined}
            className={fieldClass(Boolean(errs.contactName))}
          />
          <FieldError id="err-contactName" message={errs.contactName} />
        </div>

        <div>
          <label htmlFor="organization" className="spec-label block mb-1.5">
            Organization *
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={Boolean(errs.organization)}
            aria-describedby={errs.organization ? "err-organization" : undefined}
            className={fieldClass(Boolean(errs.organization))}
          />
          <FieldError id="err-organization" message={errs.organization} />
        </div>

        <div>
          <label htmlFor="email" className="spec-label block mb-1.5">
            Business email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errs.email)}
            aria-describedby={errs.email ? "err-email" : undefined}
            className={fieldClass(Boolean(errs.email))}
          />
          <FieldError id="err-email" message={errs.email} />
        </div>

        <div>
          <label htmlFor="location" className="spec-label block mb-1.5">
            Country / province *
          </label>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="country-name"
            placeholder="e.g. Ontario, Canada"
            required
            aria-invalid={Boolean(errs.location)}
            aria-describedby={errs.location ? "err-location" : undefined}
            className={fieldClass(Boolean(errs.location))}
          />
          <FieldError id="err-location" message={errs.location} />
        </div>

        {showTypeSelect ? (
          <div>
            <label htmlFor="enquiryType" className="spec-label block mb-1.5">
              What are you looking for? *
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              required
              defaultValue={defaultType}
              aria-invalid={Boolean(errs.enquiryType)}
              aria-describedby={errs.enquiryType ? "err-enquiryType" : undefined}
              className={fieldClass(Boolean(errs.enquiryType))}
            >
              {ENQUIRY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <FieldError id="err-enquiryType" message={errs.enquiryType} />
          </div>
        ) : (
          <input type="hidden" name="enquiryType" value={defaultType} />
        )}

        <div>
          <label htmlFor="industry" className="spec-label block mb-1.5">
            Requested industry
          </label>
          <select id="industry" name="industry" defaultValue="" className={fieldClass(false)}>
            <option value="">Not industry-specific</option>
            {industryOptions.map((i) => (
              <option key={i.n} value={i.title}>
                {String(i.n).padStart(2, "0")}, {i.title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="model" className="spec-label block mb-1.5">
            Requested robot family / model or PERSONA collection
          </label>
          <select id="model" name="model" defaultValue="" className={fieldClass(false)}>
            <option value="">General enquiry</option>
            {modelGroups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
            <optgroup label="PERSONA services">
              <option value="bucki-persona|ATELIER">PERSONA ATELIER (service)</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="task" className="spec-label block mb-1.5">
          Task description * <span className="normal-case tracking-normal">(what must move or be inspected, and where)</span>
        </label>
        <textarea
          id="task"
          name="task"
          rows={5}
          required
          placeholder="Describe the physical task, locations and how often it repeats…"
          aria-invalid={Boolean(errs.task)}
          aria-describedby={errs.task ? "err-task" : "hint-task"}
          className={fieldClass(Boolean(errs.task))}
        />
        <p id="hint-task" className="mt-1.5 text-xs text-muted">
          Please do not attach faces, medical records, household or memorial material to this form.
        </p>
        <FieldError id="err-task" message={errs.task} />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="environment" className="spec-label block mb-1.5">
            Operating environment
          </label>
          <input
            id="environment"
            name="environment"
            type="text"
            placeholder="e.g. warehouse aisles, wet plant"
            className={fieldClass(false)}
          />
        </div>
        <div>
          <label htmlFor="frequency" className="spec-label block mb-1.5">
            Frequency / shift pattern
          </label>
          <input
            id="frequency"
            name="frequency"
            type="text"
            placeholder="e.g. 3 shifts, ~200 moves/shift"
            className={fieldClass(false)}
          />
        </div>
        <div>
          <label htmlFor="schedule" className="spec-label block mb-1.5">
            Target schedule
          </label>
          <input
            id="schedule"
            name="schedule"
            type="text"
            placeholder="e.g. assessment this quarter"
            className={fieldClass(false)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="budgetBand" className="spec-label block mb-1.5">
          Approximate budget band <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <select id="budgetBand" name="budgetBand" defaultValue="Prefer not to say" className={fieldClass(false)}>
          {BUDGET_BANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-line bg-arctic/60 p-5">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="yes"
            required
            aria-invalid={Boolean(errs.consent)}
            aria-describedby={errs.consent ? "err-consent" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[#158DE6]"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-graphite">
            I consent to BUCKBOTICS storing and using these details to respond to my enquiry, as
            described in the{" "}
            <Link href="/legal/privacy" className="link-quiet" target="_blank">
              Privacy Policy
            </Link>
            . *
          </label>
        </div>
        <FieldError id="err-consent" message={errs.consent} />

        <div className="mt-3 flex items-start gap-3">
          <input
            id="marketing"
            name="marketing"
            type="checkbox"
            value="yes"
            className="mt-1 h-5 w-5 shrink-0 accent-[#158DE6]"
          />
          <label htmlFor="marketing" className="text-sm leading-relaxed text-graphite">
            Optional: send me occasional project and concept updates (CASL opt-in; unsubscribe any
            time).
          </label>
        </div>
      </div>

      {/* Part A14 privacy note, displayed immediately above the submit
          control for CARE SENTINEL research enquiries (Master file B14). */}
      {defaultType === "care-sentinel-research" ? (
        <aside className="rounded-xl border border-copper/40 bg-copper/10 px-5 py-4 text-sm leading-relaxed text-[#6d4a26]">
          {CARE_SENTINEL.contact.privacy}
        </aside>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="btn-fx btn-lift btn-grad btn-glow-blue inline-flex items-center justify-center gap-2 rounded-full bg-blue px-7 py-3.5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-muted">
          Encrypted transit · server-side validation · enquiries to {site.email}
        </p>
      </div>
    </form>
  );
}
