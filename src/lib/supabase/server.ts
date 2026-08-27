import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Using a dummy client.');
    // Return a dummy client to prevent server components from crashing
    return {
      auth: { getUser: async () => ({ data: { user: null } }) },
      from: () => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              order: async () => ({ data: null, error: 'No env vars' }),
              single: async () => ({ data: null, error: 'No env vars' })
            }),
            single: async () => ({ data: null, error: 'No env vars' }),
            order: async () => ({ data: null, error: 'No env vars' })
          }),
          order: async () => ({ data: null, error: 'No env vars' })
        })
      })
    } as any;
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
