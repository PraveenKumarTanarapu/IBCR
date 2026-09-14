import { MEMBERSHIP_TIERS, MEMBER_SECTORS } from "@/lib/content";
import { clientKey, deliver, json, rateLimit, validate } from "@/lib/server/submissions";

const TIER_NAMES = MEMBERSHIP_TIERS.map((t) => t.name);

const RULES = [
  { name: "company", label: "Company name", required: true, max: 160 },
  { name: "contactName", label: "Contact name", required: true, max: 120 },
  { name: "position", label: "Position", max: 120 },
  { name: "email", label: "Email", required: true, type: "email", max: 160 },
  { name: "phone", label: "Phone", required: true, type: "phone", max: 40 },
  { name: "country", label: "Country", required: true, max: 80 },
  { name: "city", label: "City", max: 80 },
  { name: "website", label: "Website", max: 200 },
  { name: "sector", label: "Sector", oneOf: MEMBER_SECTORS },
  { name: "tier", label: "Membership category", required: true, oneOf: TIER_NAMES },
  { name: "employees", label: "Team size", max: 40 },
  { name: "objectives", label: "Objectives", type: "textarea", max: 4000 },
  { name: "consent", label: "Consent", required: true, max: 10 },
] as const;

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request))) {
    return json({ error: "Too many submissions. Please try again shortly." }, 429);
  }

  const body = await request.json().catch(() => null);
  const result = validate(body, RULES);
  if (!result.ok) return json({ error: result.error }, 400);

  await deliver("membership", result.data);

  return json({
    message: `Application received for ${result.data.company}. The membership team will be in touch within three working days to confirm the next steps.`,
  });
}
