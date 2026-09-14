import { AREAS_OF_INTEREST } from "@/lib/content";
import { clientKey, deliver, json, rateLimit, validate } from "@/lib/server/submissions";

const RULES = [
  { name: "name", label: "Name", required: true, max: 120 },
  { name: "company", label: "Company", max: 160 },
  { name: "email", label: "Email", required: true, type: "email", max: 160 },
  { name: "phone", label: "Phone", type: "phone", max: 40 },
  { name: "interest", label: "Area of interest", oneOf: AREAS_OF_INTEREST },
  { name: "message", label: "Message", required: true, type: "textarea", max: 4000 },
] as const;

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request))) {
    return json({ error: "Too many submissions. Please try again shortly." }, 429);
  }

  const body = await request.json().catch(() => null);
  const result = validate(body, RULES);
  if (!result.ok) return json({ error: result.error }, 400);

  await deliver("enquiry", result.data);

  return json({
    message: `Thank you, ${result.data.name.split(" ")[0]}. Your enquiry has reached the IBCR secretariat — we usually reply within two working days.`,
  });
}
