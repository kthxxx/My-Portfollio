"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailControl = event.currentTarget.elements.namedItem("email") as HTMLInputElement | null;
    if (!fromEmail.trim() || !emailControl?.validity.valid || !message.trim()) {
      setStatus("error");
      setFeedback(!fromEmail.trim() ? "Add your email before sending." : !emailControl?.validity.valid ? "Enter a valid email address." : "Add a message before sending.");
      return;
    }
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromEmail: fromEmail.trim(), message: message.trim() }),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || result.ok !== true) {
        setStatus("error");
        setFeedback(result.error || "Your message could not be sent. Try again shortly.");
        return;
      }
      setFromEmail("");
      setMessage("");
      setStatus("success");
      setFeedback("");
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => {
        setStatus((current) => current === "success" ? "idle" : current);
        setFeedback("");
      }, 4000);
    } catch {
      setStatus("error");
      setFeedback("Connection error. Your message is still here—please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label className="contact-field">
        <span>YOUR EMAIL</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={fromEmail}
          onChange={(event) => setFromEmail(event.target.value)}
          aria-invalid={status === "error" && (!fromEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail))}
        />
      </label>
      <label className="contact-field contact-field-message">
        <span>MESSAGE</span>
        <textarea
          name="message"
          rows={3}
          maxLength={2000}
          placeholder="Tell me what you're thinking about..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={status === "error" && !message.trim()}
        />
      </label>
      <div className="contact-submit-row">
        <p className={`contact-feedback ${status}`} role="status" aria-live="polite">{feedback}</p>
        {status === "success" && <div className="contact-toast" role="status">Message sent</div>}
        <button className="contact-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "SENDING..." : "SEND MESSAGE ↗"}
        </button>
      </div>
    </form>
  );
}
