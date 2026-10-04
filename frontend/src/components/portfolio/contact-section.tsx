"use client";

import type { FormEvent } from "react";
import { memo, useEffect, useState } from "react";
import { Check, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { resumeDownloadUrl } from "@/lib/api";
import { SocialIcon } from "./SocialIcon";

type Props = {
  profile: Portfolio["profile"];
  onCopy: (text: string, message: string) => void;
  onContact: (event: FormEvent<HTMLFormElement>) => void;
  sending: boolean;
  sent: boolean;
  error: string | null;
};

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function ContactSection({ profile, onCopy, onContact, sending, sent, error }: Props) {
  const [copied, setCopied] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const nextErrors: FieldErrors = {};
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!message) nextErrors.message = "Please add a short message.";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onContact(event);
  };

  const copyEmail = () => {
    onCopy(profile.email, "Direct email address copied to clipboard!");
    setCopied(true);
  };

  const inputClass = "w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 light:border-slate-300 light:bg-slate-100 light:text-slate-900";

  return (
    <section id="contact" className="border-t border-slate-800/60 bg-slate-950/50 py-16 light:border-slate-200 light:bg-slate-100 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex h-full flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-widest text-brand-400">{"// Let's Connect"}</span>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to add value to your engineering team?</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-300 light:text-slate-700">
                I&apos;m open to Full-Stack Developer roles<br className="hidden sm:block" /> where I can build reliable products with React, Next.js, and NestJS.
              </p>
              <p className="mt-3 text-sm font-medium text-emerald-400 light:text-emerald-700">I usually reply within 24 hours.</p>

              <div className="mt-7 space-y-3 sm:mt-8 sm:space-y-4">
                <a href={`mailto:${profile.email}`} className="glass-card flex min-w-0 items-center gap-4 rounded-xl p-4 transition hover:border-brand-500/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400"><Mail className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block font-mono text-xs text-slate-400">Direct Email</span><span className="block break-all text-sm font-semibold">{profile.email}</span></span>
                </a>
                <div className="glass-card flex min-w-0 items-center gap-4 rounded-xl p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><MapPin className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block font-mono text-xs text-slate-400">Location &amp; Availability</span><span className="block text-sm font-semibold">India (IST) · Open to remote and hybrid</span></span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-800/40 bg-gradient-to-r from-brand-950/60 to-indigo-950/60 p-5 sm:p-6">
              <div className="text-sm font-semibold">Prefer a direct conversation?</div>
              <p className="mt-1 text-xs text-slate-300">Copy my email or connect with me online.</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="button" onClick={copyEmail} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-500">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-200" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy Email"}
                </button>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-brand-400 hover:text-white"><SocialIcon network="github" /></a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-brand-400 hover:text-white"><SocialIcon network="linkedin" /></a>
                <a href={resumeDownloadUrl()} className="inline-flex min-h-10 items-center rounded-xl border border-slate-700 px-3 text-xs font-semibold text-slate-200 transition hover:border-brand-400 hover:text-white">Resume</a>
              </div>
            </div>
          </div>

          <div className="h-full lg:col-span-7">
            <div className="glass-card h-full rounded-2xl border border-slate-800 p-5 shadow-xl light:border-slate-200 sm:p-7 md:p-8">
              <h3 className="mb-6 text-xl font-bold">Send a Message</h3>
              <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-xs" htmlFor="name">Your Name *</label>
                    <input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="Jane Doe" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} className={`${inputClass} ${fieldErrors.name ? "border-rose-500" : ""}`} />
                    {fieldErrors.name && <p id="name-error" className="mt-1.5 text-xs text-rose-400">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs" htmlFor="email">Email Address *</label>
                    <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="jane@company.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} className={`${inputClass} ${fieldErrors.email ? "border-rose-500" : ""}`} />
                    {fieldErrors.email && <p id="email-error" className="mt-1.5 text-xs text-rose-400">{fieldErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs" htmlFor="inquiryType">Inquiry Type</label>
                  <select id="inquiryType" name="inquiryType" className={inputClass}>
                    <option>Full-Time Engineering Role</option>
                    <option>Contract / Technical Consultation</option>
                    <option>General Networking</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs" htmlFor="message">Message Details *</label>
                  <textarea id="message" name="message" rows={5} required maxLength={5000} placeholder="Hi Smitraj, we are looking for a Full-Stack Developer..." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "message-error" : undefined} className={`${inputClass} resize-y ${fieldErrors.message ? "border-rose-500" : ""}`} />
                  {fieldErrors.message && <p id="message-error" className="mt-1.5 text-xs text-rose-400">{fieldErrors.message}</p>}
                </div>

                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {error && <p role="alert" className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
                {sent && <p role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">Thanks for reaching out. Your message has been sent.</p>}
                <button type="submit" disabled={sending} className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 via-sky-600 to-indigo-600 py-4 font-bold text-white shadow-lg shadow-brand-500/20 disabled:cursor-wait disabled:opacity-70">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                  {sending ? "Sending message..." : sent ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ContactSection);
