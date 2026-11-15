'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = ((formData.get('email') as string) || '').trim()
  const password = (formData.get('password') as string) || ''

  let { error } = await supabase.auth.signInWithPassword({ email, password })

  // Auto-recovery for typo: "passoword" -> "password"
  if (error && /passoword/i.test(password)) {
    const fixedPassword = password.replace(/passoword/i, (m) =>
      m.startsWith('P') ? 'Password' : 'password'
    )
    const retry = await supabase.auth.signInWithPassword({ email, password: fixedPassword })
    if (!retry.error) {
      error = null
    }
  }

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message || 'Could not authenticate user')}`)
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
