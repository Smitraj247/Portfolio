import type { Portfolio } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
export const MAINTENANCE_MESSAGE =
  "We're currently performing maintenance. The site is temporarily offline for scheduled updates and improvements. We'll be back soon. Thank you for your patience.";

export class ApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch(path: string, init: RequestInit = {}) {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      signal: init.signal ?? AbortSignal.timeout(10_000),
    });
  } catch {
    throw new ApiError("We can't reach the site right now. Please check your connection and try again.");
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { message?: string | string[] };
    const message = response.status === 503
      ? MAINTENANCE_MESSAGE
      : response.status >= 500
        ? "Something went wrong on our end. Please try again shortly."
        : Array.isArray(body.message)
          ? body.message.join(" ")
          : body.message || "We couldn't complete your request. Please try again.";
    throw new ApiError(message, response.status);
  }
  return response;
}

export async function fetchPortfolio(): Promise<Portfolio> {
  return (await apiFetch("/api/portfolio", { cache: "no-store" })).json();
}

export async function sendContact(payload: {
  name: string;
  email: string;
  inquiryType: string;
  subject?: string;
  message: string;
  website?: string;
}) {
  const response = await apiFetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<{ ok: boolean; message: string }>;
}

export type ChatTurn = { role: "user" | "assistant"; content: string };

export async function sendChatMessage(message: string, history: ChatTurn[]) {
  const response = await apiFetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  const data = (await response.json()) as { answer?: string };
  if (!data.answer) throw new ApiError("The assistant couldn't reply right now.");
  return data.answer;
}

export function resumeDownloadUrl() {
  return `${API_URL}/api/resume`;
}
