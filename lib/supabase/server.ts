// Server-side Supabase client.
// Use this in Server Components, Server Actions, and Route Handlers.
// For Client Components, use lib/supabase/client.ts instead.
//
// Uses next/headers cookies() — async per Next.js 15 patterns (async-patterns.md).

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll is called from Server Components — cookie mutations are a no-op there.
            // This is fine; the middleware handles session refresh.
          }
        },
      },
    },
  );
}

// Admin client — bypasses Row Level Security. Use with caution; server-only.
// Only uncomment and use when you explicitly need RLS bypass (e.g., admin actions).
// export async function createAdminClient() {
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!,
//     { cookies: { getAll: () => [], setAll: () => {} } },
//   );
// }
