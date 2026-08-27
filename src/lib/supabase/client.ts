import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Using a dummy browser client.');
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

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}
