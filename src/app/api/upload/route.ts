import { put, del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Vercel Blob Upload & Storage API (with Local Dev Fallback)
 *
 * 1. Upload (POST):
 *    - If valid Vercel Blob token (starts with 'vercel_blob_rw_') is provided:
 *      Uploads directly to Vercel Blob Edge CDN using `put(filename, stream, { access: 'public' })`.
 *    - In local development:
 *      If token is missing, invalid, or is just a Store ID ('store_...'),
 *      gracefully saves to `/public/uploads/` so the admin studio continues to work immediately.
 *    - Returns:
 *      `{ url, downloadUrl, pathname, contentType, warning?, isFallback? }`
 *
 * 2. Delete (DELETE):
 *    - Permanently deletes from Vercel Blob or `/public/uploads/`.
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
  const isStoreIdOnly = Boolean(token && token.startsWith('store_'));

  // 1. If valid Vercel Blob token is provided, upload directly to Vercel Blob
  if (isValidVercelToken) {
    try {
      const blob = await put(uniqueFilename, uploadPayload, {
        access: 'public',
        token,
      });
      return NextResponse.json(blob);
    } catch (error: any) {
      console.error('[Vercel Blob Upload Error]:', error);

      // In local development, fall back gracefully to local uploads so developer isn't blocked
      if (process.env.NODE_ENV !== 'production') {
        const localUrl = saveToLocalUploads(uniqueFilename, buffer);
        return NextResponse.json({
          url: localUrl,
          downloadUrl: localUrl,
          pathname: uniqueFilename,
          contentType,
          warning: `Vercel Blob failed (${error.message}). Saved locally to ${localUrl}.`,
          isFallback: true,
        });
      }

      return NextResponse.json(
        { error: error.message || 'Failed to upload to Vercel Blob' },
        { status: 500 }
      );
    }
  }

  // 2. Fallback for Local Development (when token is missing or is just a store_ ID)
  if (process.env.NODE_ENV !== 'production') {
    const localUrl = saveToLocalUploads(uniqueFilename, buffer);
    let warningMsg = 'Image saved locally to /public/uploads/.';

    if (isStoreIdOnly) {
      warningMsg = `Image saved locally. Note: "${token}" is your Vercel Store ID, not the token. To use Vercel CDN, copy the token starting with "vercel_blob_rw_" from Vercel > Storage > Settings / .env.local.`;
    } else if (!token || token.includes('your_token_here')) {
      warningMsg = 'Image saved locally to /public/uploads/. Configure BLOB_READ_WRITE_TOKEN in .env.local for Vercel CDN.';
    }

    return NextResponse.json({
      url: localUrl,
      downloadUrl: localUrl,
      pathname: uniqueFilename,
      contentType,
      warning: warningMsg,
      isFallback: true,
    });
  }

  // 3. In production: Return helpful, actionable error
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
      error: 'Vercel Blob: BLOB_READ_WRITE_TOKEN is missing or invalid. Please configure a valid token starting with "vercel_blob_rw_" in your environment variables.',
    },
    { status: 400 }
  );
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url');

    if (!urlToDelete) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    // Handle local uploads deletion
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

    // Handle Vercel Blob deletion
    const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
    if (token && (token.startsWith('vercel_blob_rw_') || token.startsWith('vercel_blob_')) && urlToDelete.includes('blob.vercel-storage.com')) {
      await del(urlToDelete, { token });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
