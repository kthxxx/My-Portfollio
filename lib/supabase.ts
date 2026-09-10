import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Returns a Supabase client, or null if NEXT_PUBLIC_SUPABASE_URL /
 * NEXT_PUBLIC_SUPABASE_ANON_KEY aren't set. The guestbook feature
 * (see app/api/guestbook/route.ts and the `guestbook` terminal command)
 * is fully optional — the site works fine without a database.
 */
export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  client = createClient(url, key);
  return client;
}

/**
 * SQL to run once in the Supabase SQL editor if you want the guestbook:
 *
 * create table guestbook (
 *   id uuid primary key default gen_random_uuid(),
 *   name text not null,
 *   message text not null,
 *   created_at timestamptz not null default now()
 * );
 *
 * alter table guestbook enable row level security;
 * create policy "anyone can read" on guestbook for select using (true);
 * create policy "anyone can insert" on guestbook for insert with check (true);
 */
