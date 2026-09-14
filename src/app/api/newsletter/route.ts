import { clientKey, deliver, json, rateLimit, validate } from "@/lib/server/submissions";

const RULES = [{ name: "email", label: "Email", required: true, type: "email", max: 160 }] as const;

export async function POST(request: Request) {
  if (!rateLimit(clientKey(request))) {
    return json({ error: "Too many attempts. Please try again shortly." }, 429);
  }

  const body = await request.json().catch(() => null);
  const result = validate(body, RULES);
  if (!result.ok) return json({ error: result.error }, 400);

  await deliver("newsletter", result.data);

  return json({ message: "You're on the list. The next brief will land in your inbox." });
}
