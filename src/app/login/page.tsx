import React from 'react';
import LoginForm from './LoginForm';
import Link from 'next/link';

export default async function LoginPage(props: { searchParams: Promise<{ message?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7F6F3] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-8 sm:p-10">
        <div className="text-center">
          <Link
            href="/"
            className="font-serif text-2xl tracking-wider uppercase font-semibold text-neutral-900 block mb-2"
          >
            Now &amp; Then
          </Link>
          <div className="inline-block bg-neutral-100 text-neutral-700 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded tracking-widest font-semibold border border-neutral-200 mb-4">
            Admin Studio
          </div>
          <p className="text-xs text-neutral-500">
            Sign in with your admin credentials to manage content and catalog
          </p>
        </div>

        <LoginForm initialMessage={searchParams?.message} />

        <div className="mt-8 pt-6 border-t border-neutral-100 text-center text-[11px] text-neutral-400">
          <Link href="/" className="hover:text-neutral-900 transition-colors">
            &larr; Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
