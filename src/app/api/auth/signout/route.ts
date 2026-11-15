import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const response = NextResponse.json({ success: true });

    // Explicitly expire and delete all cookies on the server response
    allCookies.forEach((c) => {
      cookieStore.delete(c.name);
      response.cookies.set(c.name, '', {
        maxAge: 0,
        path: '/',
        expires: new Date(0),
      });
    });

    return response;
  } catch (err: any) {
    console.error('[SignOut API] Error during signout:', err?.message || err);
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
