"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { site } from "@/data/site";
import { ENQUIRY_TYPES, type FormState } from "@/lib/enquiry";

export type { FormState };

/**
 * Enquiry handling — Master Spec V2.0, Chapter 15.
 *
 * • Server-side validation on every field.
 * • Honeypot + minimum-time trap + per-IP throttling (anti-spam).
 * • Consent is mandatory and timestamped; privacy notice is linked.
 * • Lead tags follow the approved taxonomy:
 *   FORGE, CARE, TITAN, TERRA, TIDE, LAB, BUCKi, HOME,
 *   PERSONA-E200/H200/C200/M200/S300, general.
 * • Delivery: JSONL store owned by the project (company-controlled) and,
 *   when configured, an outbound CRM/webhook endpoint via env vars:
 *     CRM_WEBHOOK_URL  — POST lead JSON (CRM / inbox integration)
 *     LEADS_FILE       — override path of the JSONL lead store
 *   No external service is contacted unless the owner configures one.
 * • Success copy never claims a booking, pilot or delivery is confirmed.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FORM_MIN_SECONDS = 3;
const MAX_PER_HOUR = 5;

/** In-memory throttle — replaced by CRM-side throttling in production. */
const hits = new Map<string, { count: number; reset: number }>();

function throttle(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60 * 60 * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_HOUR;
}

/** Map the approved taxonomy to lead tags. */
function computeTags(input: {
  enquiryType: string;
  industry: string;
  model: string;
}): string[] {
  const tags = new Set<string>();

  const familyTag: Record<string, string> = {
    forge: "FORGE",
    care: "CARE",
    titan: "TITAN",
    terra: "TERRA",
    tide: "TIDE",
    lab: "LAB",
    bucki: "BUCKi",
    "bucki-home": "HOME",
    "bucki-persona": "BUCKi PERSONA",
  };

  if (input.model) {
    const [familySlug, short] = input.model.split("|");
    if (familySlug === "bucki-persona" && short) {
      tags.add(`PERSONA-${short}`);
    } else if (familyTag[familySlug]) {
      tags.add(familyTag[familySlug]);
    }
  }

  if (input.industry) tags.add(`industry:${input.industry}`);
  if (input.enquiryType.startsWith("persona")) tags.add("PERSONA-general");
  if (input.enquiryType === "partnership") tags.add("partnership");

  if (tags.size === 0) tags.add("general");
  return [...tags];
}

export async function submitEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // ---- anti-spam --------------------------------------------------
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "error", message: "Submission rejected." };
  }
  const renderedAt = Number(formData.get("renderedAt") ?? 0);
  if (!renderedAt || Date.now() - renderedAt < FORM_MIN_SECONDS * 1000) {
    return { status: "error", message: "Please take a moment to review your enquiry." };
  }
  if (!throttle(ip)) {
    return {
      status: "error",
      message: "Too many enquiries from this network. Please try again later or email us directly.",
    };
  }

  // ---- field validation -------------------------------------------
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const errors: Record<string, string> = {};

  const contactName = get("contactName");
  if (contactName.length < 2) errors.contactName = "Please enter your full name.";

  const organization = get("organization");
  if (organization.length < 2) errors.organization = "Please enter your organization.";

  const email = get("email");
  if (!email) errors.email = "Business email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  const location = get("location");
  if (location.length < 2) errors.location = "Country or province is required.";

  const enquiryType = get("enquiryType");
  if (!ENQUIRY_TYPES.some((t) => t.value === enquiryType)) {
    errors.enquiryType = "Select what you are looking for.";
  }

  const task = get("task");
  if (task.length < 20) {
    errors.task = "Please describe the physical task in at least 20 characters.";
  }

  const consent = formData.get("consent");
  if (consent !== "yes") {
    errors.consent = "Consent is required so we may respond to your enquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
    };
  }

  // ---- record ------------------------------------------------------
  const industry = get("industry");
  const model = get("model");
  const tags = computeTags({ enquiryType, industry, model });
  const refId = `BB-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

  const lead = {
    refId,
    receivedAt: new Date().toISOString(),
    consentTimestamp: new Date().toISOString(),
    consent: {
      contact: true,
      marketing: formData.get("marketing") === "yes",
      privacyNoticeVersion: "draft-2026-10",
    },
    source: "www.buckbotics.com/contact",
    ip,
    contactName,
    organization,
    email,
    location,
    enquiryType,
    industry,
    requestedModel: model || null,
    task,
    environment: get("environment") || null,
    frequency: get("frequency") || null,
    schedule: get("schedule") || null,
    budgetBand: get("budgetBand") || "Prefer not to say",
    tags,
  };

  try {
    const file = process.env.LEADS_FILE ?? path.join(process.cwd(), ".leads", "enquiries.jsonl");
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, `${JSON.stringify(lead)}\n`, "utf8");
  } catch (e) {
    console.error("[enquiry] failed to persist lead", e);
    return {
      status: "error",
      message: `We could not record your enquiry. Please email ${site.email} directly.`,
    };
  }

  // Optional outbound CRM / inbox integration (owner-configured).
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
    } catch (e) {
      console.error("[enquiry] CRM webhook failed (lead stored locally)", e);
    }
  }

  return {
    status: "success",
    refId,
    tags,
    message: `Thank you — your enquiry has been recorded (reference ${refId}). An acknowledgement will follow by email. This is not a confirmation of a booking, pilot or delivery; a team member will review the details first.`,
  };
}
