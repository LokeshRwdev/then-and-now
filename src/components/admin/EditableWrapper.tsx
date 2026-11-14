'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { EditableEntity } from './AdminEditModal';

interface EditableWrapperProps {
  entity: EditableEntity;
  onEdit: (entity: EditableEntity) => void;
  onDelete: (id: string, type: EditableEntity['type']) => void;
  children: React.ReactNode;
  label?: string;
  className?: string;
  canDelete?: boolean;
}

export default function EditableWrapper({
  entity,
  onEdit,
  onDelete,
  children,
  label,
  className = '',
  canDelete = true,
}: EditableWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const displayLabel = label || entity.title || entity.section_key || 'Section';

  const handleClick = (e: React.MouseEvent) => {
    // If clicking a link or button inside, prevent full page navigation in admin edit mode
    // and open editor instead
    e.preventDefault();
    e.stopPropagation();
    onEdit(entity);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(entity);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }
    onDelete(entity.id, entity.type);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowConfirm(false);
      }}
      onClick={handleClick}
      className={`group/editable relative cursor-pointer transition-all duration-200 ${
        isHovered
          ? 'ring-2 ring-neutral-900 ring-offset-2 ring-offset-white shadow-xl z-20'
          : 'ring-1 ring-black/10 hover:ring-black/30'
      } ${className}`}
    >
      {/* Floating Action Bar */}
      <div
        className={`absolute top-3 right-3 z-30 flex items-center gap-1.5 transition-all duration-200 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="bg-neutral-900/90 text-white text-[10px] font-mono uppercase px-2 py-1 rounded shadow tracking-wider backdrop-blur-sm">
          {displayLabel}
        </span>

        {/* Edit Button */}
        <button
          type="button"
          onClick={handleEditClick}
          className="bg-white hover:bg-neutral-100 text-neutral-900 text-xs px-2.5 py-1 rounded shadow-md border border-neutral-200 flex items-center gap-1 font-medium transition-transform hover:scale-105"
          title="Click to edit content or image"
        >
          <Edit2 size={13} />
          <span>Edit</span>
        </button>

        {/* Delete Button */}
        {canDelete && (
          <button
            type="button"
            onClick={handleDeleteClick}
            className={`text-xs px-2.5 py-1 rounded shadow-md border flex items-center gap-1 font-medium transition-all ${
              showConfirm
                ? 'bg-red-600 text-white border-red-700 animate-pulse'
                : 'bg-white hover:bg-red-50 text-red-600 border-neutral-200 hover:border-red-300'
            }`}
            title={showConfirm ? 'Click again to confirm delete' : 'Delete this box'}
          >
            <Trash2 size={13} />
            <span>{showConfirm ? 'Confirm?' : 'Delete'}</span>
          </button>
        )}
      </div>

      {/* Visual Click-to-Edit Indicator on Image Hover */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-900/0 group-hover/editable:bg-neutral-900/5 transition-colors z-10" />

      {/* Render the actual page component/box */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
