import { EVENTS } from "@/lib/content";
import { clientKey, deliver, json, rateLimit, validate } from "@/lib/server/submissions";

const EVENT_TITLES = EVENTS.filter((e) => e.status === "upcoming").map((e) => e.title);

const RULES = [
  { name: "event", label: "Event", required: true, oneOf: EVENT_TITLES },
  { name: "name", label: "Full name", required: true, max: 120 },
  { name: "company", label: "Company", required: true, max: 160 },
  { name: "position", label: "Position", max: 120 },
  { name: "email", label: "Email", required: true, type: "email", max: 160 },
  { name: "phone", label: "Phone", type: "phone", max: 40 },
  { name: "attendees", label: "Number of attendees", max: 10 },
  { name: "notes", label: "Notes", type: "textarea", max: 2000 },
] as const;

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request))) {
    return json({ error: "Too many submissions. Please try again shortly." }, 429);
  }

  const body = await request.json().catch(() => null);
  const result = validate(body, RULES);
  if (!result.ok) return json({ error: result.error }, 400);

  await deliver("event", result.data);

  return json({
    message: `You're registered for ${result.data.event}. A confirmation with venue details is on its way to ${result.data.email}.`,
  });
}
