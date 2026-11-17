import { put, del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Multi-Tier Cloud Upload & Storage API
 *
 * Tier 1: Vercel Blob CDN (if BLOB_READ_WRITE_TOKEN is valid, starts with 'vercel_blob_rw_')
 * Tier 2: Supabase Public Storage (uses existing Supabase credentials and public 'products' bucket)
 * Tier 3: Local uploads (/public/uploads/) for offline local development
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const rawFilename = searchParams.get('filename') || `upload-${Date.now()}.jpg`;

  // Clean filename for safety and add timestamp prefix to avoid name collisions
  const sanitizedFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();

  // Helper to read request buffer
  const contentType = request.headers.get('content-type') || 'application/octet-stream';
  let buffer: Buffer;
  let uploadPayload: any;

  try {
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
      }
      buffer = Buffer.from(await file.arrayBuffer());
      uploadPayload = file;
    } else {
      buffer = Buffer.from(await request.arrayBuffer());
      uploadPayload = buffer;
    }
  } catch (err: any) {
    return NextResponse.json({ error: `Failed to read file data: ${err.message}` }, { status: 400 });
  }

  // Token validation checks
  const isValidVercelToken = Boolean(
    token && (token.startsWith('vercel_blob_rw_') || token.startsWith('vercel_blob_'))
  );

  // ========================================================
  // Strategy 1: Vercel Blob CDN (if valid read-write token is present)
  // ========================================================
  if (isValidVercelToken) {
    try {
      const blob = await put(uniqueFilename, uploadPayload, {
        access: 'public',
        token,
      });
      return NextResponse.json(blob);
    } catch (error: any) {
      console.warn('[Vercel Blob failed, trying Supabase Cloud Storage]:', error.message || error);
    }
  }

  // ========================================================
  // Strategy 2: Supabase Cloud Storage (Production & General Fallback)
  // ========================================================
  try {
    const adminClient = createAdminClient();
    if (adminClient) {
      const mimeType = contentType.includes('multipart') || contentType === 'application/octet-stream'
        ? getMimeType(uniqueFilename)
        : contentType;

      const { data, error } = await adminClient.storage
        .from('products')
        .upload(uniqueFilename, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (!error && data) {
        const { data: pubData } = adminClient.storage
          .from('products')
          .getPublicUrl(uniqueFilename);

        const publicUrl = pubData.publicUrl;

        return NextResponse.json({
          url: publicUrl,
          downloadUrl: `${publicUrl}?download=1`,
          pathname: uniqueFilename,
          contentType: mimeType,
          provider: 'supabase',
        });
      } else if (error) {
        console.warn('[Supabase Storage upload warning]:', error.message);
      }
    }
  } catch (supabaseErr: any) {
    console.warn('[Supabase Storage upload error]:', supabaseErr.message || supabaseErr);
  }

  // ========================================================
  // Strategy 3: Local Dev Storage (/public/uploads/)
  // ========================================================
  if (process.env.NODE_ENV !== 'production') {
    const localUrl = saveToLocalUploads(uniqueFilename, buffer);
    return NextResponse.json({
      url: localUrl,
      downloadUrl: localUrl,
      pathname: uniqueFilename,
      contentType,
      warning: 'Image saved locally to /public/uploads/.',
      isFallback: true,
    });
  }

  // ========================================================
  // Strategy 4: If all cloud storage failed in production, return actionable error
  // ========================================================
  const isStoreIdOnly = Boolean(token && token.startsWith('store_'));
  if (isStoreIdOnly) {
    return NextResponse.json(
      {
        error: `Invalid Token: "${token}" is your Vercel Store ID, not the Read/Write Token. Your token starts with "vercel_blob_rw_". Go to Vercel Project Dashboard > Storage > your Blob store > Settings / .env.local to copy BLOB_READ_WRITE_TOKEN.`,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      error: 'Cloud storage unavailable. Please check that Supabase credentials or BLOB_READ_WRITE_TOKEN (starting with "vercel_blob_rw_") are configured.',
    },
    { status: 500 }
  );
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url');

    if (!urlToDelete) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    // 1. Handle local uploads deletion
    if (urlToDelete.startsWith('/uploads/')) {
      const filename = path.basename(urlToDelete);
      const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch {
          // ignore unlink error
        }
      }
      return NextResponse.json({ success: true });
    }

    // 2. Handle Supabase Storage deletion
    if (urlToDelete.includes('supabase.co/storage')) {
      const adminClient = createAdminClient();
      if (adminClient) {
        const parts = urlToDelete.split('/products/');
        const filename = parts[parts.length - 1]?.split('?')[0];
        if (filename) {
          await adminClient.storage.from('products').remove([decodeURIComponent(filename)]);
        }
      }
      return NextResponse.json({ success: true });
    }

    // 3. Handle Vercel Blob deletion
    const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
    if (
      token &&
      (token.startsWith('vercel_blob_rw_') || token.startsWith('vercel_blob_')) &&
      urlToDelete.includes('blob.vercel-storage.com')
    ) {
      await del(urlToDelete, { token });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Determines file MIME type based on extension
 */
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.gif':
      return 'image/gif';
    case '.jpg':
    case '.jpeg':
    default:
      return 'image/jpeg';
  }
}

/**
 * Saves uploaded buffer to /public/uploads/ for instant local development availability
 */
function saveToLocalUploads(filename: string, buffer: Buffer): string {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${filename}`;
}
