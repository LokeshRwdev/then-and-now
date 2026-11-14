'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { login } from './actions';

interface LoginFormProps {
  initialMessage?: string;
}

export default function LoginForm({ initialMessage }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="mt-8 space-y-6"
      action={async (formData) => {
        setIsSubmitting(true);
        try {
          await login(formData);
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {initialMessage && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 leading-relaxed animate-in fade-in">
          <span className="font-semibold block mb-0.5">Authentication Failed:</span>
          {initialMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Mail size={16} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue="admin@nowthen.com"
              className="block w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              placeholder="admin@nowthen.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Lock size={16} />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="block w-full pl-9 pr-10 py-2.5 text-sm rounded-lg border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </div>
    </form>
  );
}

