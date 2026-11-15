import { createClient } from '@/lib/supabase/client';

/**
 * Robust sign out procedure:
 * 1. Fully clears localStorage and sessionStorage (removes all Supabase tokens & cached keys).
 * 2. Clears client-side accessible cookies.
 * 3. Calls Supabase browser client signOut.
 * 4. Calls server-side /api/auth/signout to clear HTTP-only session cookies.
 * 5. Performs a clean, hard page redirect to /login.
 */
export async function performSignOut() {
  // 1. Clear Local Storage and Session Storage (clearing all auth tokens)
  if (typeof window !== 'undefined') {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('[SignOut] Failed to clear localStorage/sessionStorage:', e);
    }

    // 2. Clear client-accessible cookies
    try {
      const cookies = document.cookie.split(';');
      for (const c of cookies) {
        const eq = c.indexOf('=');
        const name = eq > -1 ? c.substring(0, eq).trim() : c.trim();
        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        }
      }
    } catch (e) {
      console.warn('[SignOut] Failed to clear document cookies:', e);
    }
  }

  // 3. Supabase browser client signOut
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (e) {
    console.warn('[SignOut] Supabase client signOut failed:', e);
  }

  // 4. Server-side sign out route call
  try {
    await fetch('/api/auth/signout', { method: 'POST' });
  } catch (e) {
    console.warn('[SignOut] Server signout route call failed:', e);
  }

  // 5. Hard browser reload & redirect to /login
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}
