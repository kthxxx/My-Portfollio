import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { z } from "zod";

export const dynamic = "force-dynamic";

const postSchema = z.object({
  name: z.string().trim().min(1).max(40),
  message: z.string().trim().min(1).max(280),
});

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { configured: false, entries: [] },
      { status: 200 }
    );
  }

  const { data, error } = await supabase
    .from("guestbook")
    .select("name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json(
      { configured: true, entries: [], error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ configured: true, entries: data });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        configured: false,
        error:
          "Guestbook isn't configured yet — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      { status: 200 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { configured: true, error: "name and message are required." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("guestbook").insert(parsed.data);
  if (error) {
    return NextResponse.json(
      { configured: true, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ configured: true, ok: true });
}
