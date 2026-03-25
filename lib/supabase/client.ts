'use client';

// Browser-side Supabase client.
// Use this in Client Components only ('use client' files).
// For Server Components, use lib/supabase/server.ts instead.

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
