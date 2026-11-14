"use client";

import React, { useState, useEffect } from "react";
import { X, Save, Trash2, Check, AlertTriangle, Eye } from "lucide-react";
import VercelImageUploader from "./VercelImageUploader";

export interface EditableEntity {
  id: string;
  type: "section" | "product" | "step" | "story" | "material";
  page_slug?: string;
  section_key?: string;
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
  secondary_image_url?: string;
  button_text?: string;
  button_link?: string;
  category?: string;
  step_number?: string;
  slug?: string;
  metadata?: Record<string, any>;
  sort_order?: number;
  is_active?: boolean;
}

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: EditableEntity | null;
  onSave: (updated: EditableEntity) => Promise<void> | void;
  onDelete: (id: string, type: EditableEntity["type"]) => Promise<void> | void;
}

export default function AdminEditModal({
  isOpen,
  onClose,
  entity,
  onSave,
  onDelete,
}: AdminEditModalProps) {
  const [formData, setFormData] = useState<EditableEntity | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (entity) {
      setFormData({ ...entity });
      setShowDeleteConfirm(false);
    }
  }, [entity]);

  if (!isOpen || !formData) return null;

  const handleFieldChange = (field: keyof EditableEntity, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error("Failed to save entity:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!formData) return;
    setIsDeleting(true);
    try {
      await onDelete(formData.id, formData.type);
      onClose();
    } catch (err) {
      console.error("Failed to delete entity:", err);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase bg-white/20 text-white px-2 py-0.5 rounded">
              {formData.type.toUpperCase()}
            </span>
            <h2 className="text-base font-semibold truncate max-w-sm">
              {formData.title || "Edit Item"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSave}
          className="p-6 space-y-5 max-h-[80vh] overflow-y-auto font-sans"
        >
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
              Title / Heading
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              required
              className="w-full text-sm border border-neutral-300 rounded-md px-3.5 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              placeholder="Section or item title..."
            />
          </div>

          {/* Subtitle / Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                Subtitle / Tag / Badge
              </label>
              <input
                type="text"
                value={formData.subtitle || ""}
                onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                className="w-full text-sm border border-neutral-300 rounded-md px-3.5 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                placeholder="Optional subtitle..."
              />
            </div>

            {/* Step Number or Category */}
            {formData.type === "step" ? (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Step Number (e.g. 01, 02)
                </label>
                <input
                  type="text"
                  value={formData.step_number || ""}
                  onChange={(e) =>
                    handleFieldChange("step_number", e.target.value)
                  }
                  className="w-full text-sm border border-neutral-300 rounded-md px-3.5 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                  placeholder="01"
                />
              </div>
            ) : formData.type === "product" ? (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category || "object"}
                  onChange={(e) =>
                    handleFieldChange("category", e.target.value)
                  }
                  className="w-full text-sm border border-neutral-300 rounded-md px-3.5 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                >
                  <option value="object">Object (Furniture)</option>
                  <option value="light">Light (Lighting)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Section Key
                </label>
                <input
                  type="text"
                  value={formData.section_key || ""}
                  disabled
                  className="w-full text-sm border border-neutral-200 bg-neutral-100 rounded-md px-3.5 py-2 text-neutral-500 cursor-not-allowed font-mono text-xs"
                />
              </div>
            )}
          </div>

          {/* Description / Content Body */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
              Content / Description
            </label>
            <textarea
              rows={4}
              value={formData.content || ""}
              onChange={(e) => handleFieldChange("content", e.target.value)}
              className="w-full text-sm border border-neutral-300 rounded-md p-3 text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              placeholder="Editorial text, specs, or paragraph..."
            />
          </div>

          {/* Primary Image Upload using Vercel Blob */}
          <div className="pt-2 border-t border-neutral-200">
            <VercelImageUploader
              label="Primary Image"
              currentUrl={formData.image_url || ""}
              onImageUploaded={(url) => handleFieldChange("image_url", url)}
            />
          </div>

          {/* Secondary Image Upload (if present or applicable) */}
          {(formData.secondary_image_url !== undefined ||
            formData.type === "section") && (
            <div className="pt-2 border-t border-neutral-200">
              <VercelImageUploader
                label="Secondary Image (Optional)"
                currentUrl={formData.secondary_image_url || ""}
                onImageUploaded={(url) =>
                  handleFieldChange("secondary_image_url", url)
                }
              />
            </div>
          )}

          {/* Button Text & Link (Optional for call-to-actions) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.button_text || ""}
                onChange={(e) =>
                  handleFieldChange("button_text", e.target.value)
                }
                className="w-full text-sm border border-neutral-300 rounded-md px-3.5 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                placeholder="e.g. EXPLORE COLLECTION"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                CTA Button Link
              </label>
              <input
                type="text"
                value={formData.button_link || ""}
                onChange={(e) =>
                  handleFieldChange("button_link", e.target.value)
                }
                className="w-full text-sm border border-neutral-300 rounded-md px-3.5 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                placeholder="e.g. /objects or https://..."
              />
            </div>
          </div>

          {/* Actions Footer */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} /> Delete this section
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 p-2 rounded-md">
                  <span className="text-xs text-red-700 font-medium">
                    Are you sure?
                  </span>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-xs bg-red-600 text-white px-2.5 py-1 rounded hover:bg-red-700 transition-colors font-medium"
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="text-xs text-neutral-600 hover:text-neutral-900 px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-neutral-600 hover:text-neutral-900 px-4 py-2 rounded-md hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 text-xs bg-black text-white hover:bg-neutral-800 px-5 py-2.5 rounded-md font-medium shadow transition-all duration-200 disabled:opacity-50"
              >
                <Save size={15} />
                {isSaving ? "Saving..." : "Save & Publish"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
