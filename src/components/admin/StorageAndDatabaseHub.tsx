'use client';

import React, { useState } from 'react';
import { Database, Cloud, Check, Copy, AlertCircle, Key, FileCode, ExternalLink } from 'lucide-react';
import VercelImageUploader from './VercelImageUploader';

const SUPABASE_SCHEMA_SQL = `-- Run this in your Supabase SQL Editor to initialize all tables & policies

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. PRODUCTS TABLE
create table if not exists products (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  category text not null default 'object',
  short_description text,
  long_description text,
  image_url text,
  button_text text default 'REQUEST PRICE',
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PAGE SECTIONS TABLE
create table if not exists page_sections (
  id text primary key default gen_random_uuid()::text,
  page_slug text not null,
  section_key text not null,
  title text,
  subtitle text,
  content text,
  image_url text,
  secondary_image_url text,
  button_text text,
  button_link text,
  metadata jsonb default '{}'::jsonb,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(page_slug, section_key)
);

-- 4. PROCESS STEPS TABLE
create table if not exists process_steps (
  id text primary key default gen_random_uuid()::text,
  step_number text not null,
  heading text not null,
  subheading text,
  paragraph text,
  image_url text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. STORIES TABLE
create table if not exists stories (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  subtitle text default 'COLLECTION',
  content text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. ENABLE ROW LEVEL SECURITY
alter table products enable row level security;
alter table page_sections enable row level security;
alter table process_steps enable row level security;
alter table stories enable row level security;

-- 7. POLICIES
create policy "Public can view products" on products for select using (true);
create policy "Public can view active page sections" on page_sections for select using (is_active = true);
create policy "Public can view process steps" on process_steps for select using (true);
create policy "Public can view stories" on stories for select using (true);

create policy "Admin CRUD products" on products for all using (true);
create policy "Admin CRUD page_sections" on page_sections for all using (true);
create policy "Admin CRUD process_steps" on process_steps for all using (true);
create policy "Admin CRUD stories" on stories for all using (true);
`;

export default function StorageAndDatabaseHub() {
  const [copiedSql, setCopiedSql] = useState(false);
  const [testUploadedUrl, setTestUploadedUrl] = useState('');

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <h2 className="text-xl font-bold text-neutral-900">Database & Cloud Storage Configuration</h2>
        <p className="text-xs text-neutral-500 mt-1">
          Connect your Supabase PostgreSQL Database and Vercel Blob Storage. Keys and tokens are configured in your <code className="bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded font-mono text-[11px]">.env.local</code> file.
        </p>
      </div>

      {/* Grid: Supabase & Vercel Blob */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Supabase Status Card */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Database size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Supabase Database</h3>
                <span className="text-[11px] text-neutral-500">PostgreSQL with Row Level Security</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                  Required Environment Variables (.env.local)
                </span>
                <ul className="space-y-1.5 font-mono text-[11px] text-neutral-800">
                  <li className="flex items-center justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_URL</span>
                    <span className="text-emerald-600 text-[10px] font-sans font-semibold">Configured</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                    <span className="text-emerald-600 text-[10px] font-sans font-semibold">Configured</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>SUPABASE_SERVICE_ROLE_KEY</span>
                    <span className="text-emerald-600 text-[10px] font-sans font-semibold">Configured</span>
                  </li>
                </ul>
              </div>

              <div className="text-neutral-600 text-[11px] leading-relaxed">
                If the remote database is unreachable or tables haven't been migrated yet, the admin studio safely falls back to local and initial state so your UI never breaks.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-900 font-semibold hover:underline flex items-center gap-1"
            >
              Open Supabase Dashboard <ExternalLink size={13} />
            </a>
            <button
              type="button"
              onClick={copySqlToClipboard}
              className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors"
            >
              {copiedSql ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
            </button>
          </div>
        </div>

        {/* Vercel Blob Storage Card */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Cloud size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Vercel Blob Storage</h3>
                <span className="text-[11px] text-neutral-500">Global Edge CDN for Images & Assets</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                  Required Environment Variable (.env.local)
                </span>
                <div className="font-mono text-[11px] text-neutral-800 flex items-center justify-between">
                  <span>BLOB_READ_WRITE_TOKEN</span>
                  <span className="text-neutral-500 text-[10px] font-sans font-medium">Ready for user token</span>
                </div>
              </div>

              <div className="text-neutral-600 text-[11px] leading-relaxed">
                Obtain your <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[11px]">BLOB_READ_WRITE_TOKEN</code> from your Vercel Project Dashboard &gt; Storage &gt; Blob tab, then paste it in <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-[11px]">.env.local</code>.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <a
              href="https://vercel.com/dashboard/stores"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-900 font-semibold hover:underline flex items-center gap-1"
            >
              Open Vercel Storage <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Vercel Blob Image Test Bench */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900">Vercel Blob Storage Test Bench</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Test uploading any photo or asset directly to Vercel Blob. You can copy the generated URL to use anywhere on the website.
          </p>
        </div>

        <div className="max-w-md">
          <VercelImageUploader
            label="Upload Test Asset"
            currentUrl={testUploadedUrl}
            onImageUploaded={(url) => setTestUploadedUrl(url)}
          />
        </div>

        {testUploadedUrl && (
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between text-xs">
            <span className="font-mono text-neutral-700 truncate max-w-lg">
              {testUploadedUrl}
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(testUploadedUrl)}
              className="flex items-center gap-1 text-neutral-900 font-semibold hover:underline shrink-0 ml-4"
            >
              <Copy size={13} /> Copy URL
            </button>
          </div>
        )}
      </div>

      {/* SQL Migration Script Box */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Supabase SQL Migration Code</h3>
            <p className="text-xs text-neutral-500">
              Run this in your Supabase project's SQL Editor to create all necessary database tables and security policies.
            </p>
          </div>
          <button
            type="button"
            onClick={copySqlToClipboard}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-3.5 py-2 rounded-lg font-medium transition-colors"
          >
            {copiedSql ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
          </button>
        </div>

        <pre className="p-4 bg-neutral-900 text-neutral-100 rounded-lg font-mono text-xs overflow-x-auto max-h-72 border border-neutral-800">
          {SUPABASE_SCHEMA_SQL}
        </pre>
      </div>
    </div>
  );
}
