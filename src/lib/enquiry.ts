/**
 * Enquiry form constants and types.
 * (Constants cannot live in a "use server" file — server modules may only
 * export async functions.)
 */

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  refId?: string;
  tags?: string[];
}

export const initialFormState: FormState = { status: "idle" };

export const ENQUIRY_TYPES = [
  { value: "feasibility", label: "Robotics feasibility discussion" },
  { value: "pilot", label: "Controlled pilot programme" },
  { value: "partnership", label: "Partner / OEM / research discussion" },
  { value: "private-consultation", label: "Private PERSONA consultation" },
  { value: "persona-executive", label: "PERSONA EXECUTIVE pilot interest" },
  { value: "persona-care", label: "PERSONA CARE pilot interest" },
  { value: "persona-memoria", label: "MEMORIA private enquiry" },
  { value: "persona-signature", label: "SIGNATURE bespoke commission" },
  { value: "support", label: "General or support enquiry" },
] as const;

export const BUDGET_BANDS = [
  "Prefer not to say",
  "Under CA$25,000",
  "CA$25,000 – CA$100,000",
  "CA$100,000 – CA$250,000",
  "Above CA$250,000",
] as const;
