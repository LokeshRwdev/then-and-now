"use client";

import React, { useState, useRef } from "react";
import type { PutBlobResult } from "@vercel/blob";
import {
  Upload,
  Download,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  X,
  ExternalLink,
} from "lucide-react";
import AppImage from "@/components/ui/AppImage";

interface VercelImageUploaderProps {
  currentUrl?: string;
  onImageUploaded: (url: string) => void;
  label?: string;
}

export default function VercelImageUploader({
  currentUrl = "",
  onImageUploaded,
  label = "Section Image (Vercel Blob)",
}: VercelImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentUrl);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [manualUrl, setManualUrl] = useState<string>(currentUrl);
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Exact client upload method as per Vercel Official Docs
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);
    setSuccessNotice(null);

    try {
      // 1. Send file directly as body with ?filename= parameter (Vercel App Router standard)
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        },
      );

      const newBlob = (await response.json()) as PutBlobResult & {
        warning?: string;
        isFallback?: boolean;
      };

      if (!response.ok) {
        throw new Error(
          (newBlob as any).error || "Failed to upload image to Vercel Blob",
        );
      }

      if (newBlob.url) {
        setPreviewUrl(newBlob.url);
        setDownloadUrl(newBlob.downloadUrl || `${newBlob.url}?download=1`);
        onImageUploaded(newBlob.url);

        if ((newBlob as any).provider === "supabase") {
          setSuccessNotice("Image uploaded to Cloud Storage successfully!");
        } else if (newBlob.isFallback) {
          setSuccessNotice(
            newBlob.warning ||
              "Image saved locally. Enter BLOB_READ_WRITE_TOKEN in .env.local for Vercel CDN storage.",
          );
        } else {
          setSuccessNotice("Uploaded to Cloud CDN successfully!");
        }
      }
    } catch (err: any) {
      console.error("Upload failed:", err);
      setErrorMessage(err.message || "Image upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleManualApply = () => {
    if (!manualUrl.trim()) return;
    setPreviewUrl(manualUrl.trim());
    setDownloadUrl(`${manualUrl.trim()}?download=1`);
    onImageUploaded(manualUrl.trim());
    setSuccessNotice("Image URL updated");
    setErrorMessage(null);
  };

  const handleRemove = async () => {
    const urlToRemove = previewUrl;
    setPreviewUrl("");
    setDownloadUrl("");
    setManualUrl("");
    onImageUploaded("");
    setSuccessNotice("Image removed");
    setErrorMessage(null);

    // Optional: Call DELETE on Vercel Blob if it was hosted on Vercel
    if (urlToRemove && urlToRemove.includes("blob.vercel-storage.com")) {
      try {
        await fetch(`/api/upload?url=${encodeURIComponent(urlToRemove)}`, {
          method: "DELETE",
        });
      } catch {}
    }
  };

  const handleCopyUrl = () => {
    if (!previewUrl) return;
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const effectiveDownloadUrl =
    downloadUrl ||
    (previewUrl
      ? `${previewUrl}${previewUrl.includes("?") ? "&" : "?"}download=1`
      : "");

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
          {label}
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              activeTab === "upload"
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`text-xs px-2.5 py-1 rounded transition-colors ${
              activeTab === "url"
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {/* Preview & Actions Box */}
      {previewUrl && (
        <div className="relative w-full h-48 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 group">
          <AppImage
            src={previewUrl}
            alt="Current image preview"
            fill
            className="object-cover"
          />

          {/* Hover Action Bar: Download, Copy URL, Remove */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
            {/* Download Button (as per Vercel Blob docs) */}
            <a
              href={effectiveDownloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white text-neutral-900 text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow font-medium transition-transform hover:scale-105"
              title="Download original file from Vercel Blob"
            >
              <Download size={13} /> Download
            </a>

            {/* Copy URL */}
            <button
              type="button"
              onClick={handleCopyUrl}
              className="bg-white/90 hover:bg-white text-neutral-900 text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow font-medium transition-transform hover:scale-105"
              title="Copy Vercel Blob CDN URL"
            >
              {copied ? (
                <Check size={13} className="text-emerald-600" />
              ) : (
                <Copy size={13} />
              )}
              <span>{copied ? "Copied!" : "Copy URL"}</span>
            </button>

            {/* Remove / Delete Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow font-medium transition-transform hover:scale-105"
              title="Remove image"
            >
              <X size={13} /> Remove
            </button>
          </div>

          <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded font-mono truncate max-w-[80%]">
            {previewUrl.startsWith("data:") ? "Local preview data" : previewUrl}
          </span>
        </div>
      )}

      {/* Upload View (Per Vercel Quickstart) */}
      {activeTab === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="vercel-file-input"
          />
          <label
            htmlFor="vercel-file-input"
            className={`w-full border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-all ${
              isUploading
                ? "border-neutral-400 bg-neutral-50"
                : "border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50/70"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-2">
                <Loader2 size={24} className="animate-spin text-neutral-900" />
                <span className="text-xs font-medium text-neutral-700">
                  Uploading to Vercel Blob Edge CDN...
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center py-1">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                  <Upload size={18} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-900 block">
                    Click to select or drop an image
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Streams to Vercel Blob per official SDK (PNG, JPG, WEBP,
                    SVG)
                  </span>
                </div>
              </div>
            )}
          </label>
        </div>
      )}

      {/* Manual URL View */}
      {activeTab === "url" && (
        <div className="flex gap-2">
          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://... or /images/..."
            className="flex-1 text-xs border border-neutral-300 rounded px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
          />
          <button
            type="button"
            onClick={handleManualApply}
            className="bg-neutral-900 text-white text-xs px-4 py-2 rounded hover:bg-neutral-800 transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      {/* Status Notices */}
      {successNotice && (
        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-md">
          <Check size={14} className="shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
          <AlertCircle size={14} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
