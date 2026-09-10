import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contact } from "@/data/portfolio-data";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  fromEmail: z.string().trim().email(),
  message: z.string().trim().min(1).max(2000),
});

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Contact form isn't wired up yet — set RESEND_API_KEY in the environment.",
      },
      { status: 200 }
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "valid fromEmail and a message are required." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);
  const { fromEmail, message } = parsed.data;

  try {
    await resend.emails.send({
      // Resend requires a verified sending domain in production —
      // swap this for something on your own domain once it's verified.
      from: "Portfolio Terminal <onboarding@resend.dev>",
      to: contact.email,
      replyTo: fromEmail,
      subject: `New message from your portfolio terminal (${fromEmail})`,
      text: message,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send. Try again in a bit." },
      { status: 500 }
    );
  }
}
