"use client";

import { useState } from "react";

export type FormState = "idle" | "submitting" | "success" | "error";

/**
 * Small helper shared by every form on the site: posts JSON, tracks state and
 * surfaces the server's message. Deliberately dependency-free.
 */
export function useFormPost(endpoint: string) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setState("submitting");
    setMessage(undefined);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { message?: string; error?: string };

      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setState("success");
      setMessage(data.message ?? "Thank you — we have received your message.");
      form.reset();
    } catch {
      setState("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
    }
  }

  return { state, message, submit };
}
