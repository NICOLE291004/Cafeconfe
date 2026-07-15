import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente sin cookies para contextos que no tienen un request de usuario
 * (ej. sitemap.ts) — evita depender de cookies() donde no aplica.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
