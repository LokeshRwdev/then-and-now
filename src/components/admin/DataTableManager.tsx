'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EditableEntity } from './AdminEditModal';
import { Plus, Search, Edit2, Trash2, Eye, Filter, Sparkles } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

interface DataTableManagerProps {
  products: EditableEntity[];
  steps: EditableEntity[];
  stories: EditableEntity[];
  sections: EditableEntity[];
  onEditEntity: (entity: EditableEntity) => void;
  onDeleteEntity: (id: string, type: EditableEntity['type']) => void;
  onAddNewEntity: (type: EditableEntity['type'], defaultData?: Partial<EditableEntity>) => void;
}

export default function DataTableManager({
  products,
  steps,
  stories,
  sections,
  onEditEntity,
  onDeleteEntity,
  onAddNewEntity,
}: DataTableManagerProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'steps' | 'stories' | 'sections'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filter items based on activeTab and search
  const getFilteredItems = (): EditableEntity[] => {
    let list: EditableEntity[] = [];
    if (activeTab === 'products') list = products;
    if (activeTab === 'steps') list = steps;
    if (activeTab === 'stories') list = stories;
    if (activeTab === 'sections') list = sections;

    return list.filter((item) => {
      const matchesSearch =
        (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.content || '').toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === 'products' && categoryFilter !== 'all') {
        return item.category === categoryFilter;
      }

      return true;
    });
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden font-sans">
      {/* Top Header & Tab Switcher */}
      <div className="p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-neutral-50/50">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Database Records Manager</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage Supabase tables and website records with full CRUD control
          </p>
        </div>

        {/* Action Button */}
        {activeTab === 'products' ? (
          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Add Product (Visual Studio)</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (activeTab === 'steps') onAddNewEntity('step');
              if (activeTab === 'stories') onAddNewEntity('story');
              if (activeTab === 'sections') onAddNewEntity('section', { page_slug: 'home' });
            }}
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>
              Add New {activeTab === 'steps' ? 'Step' : activeTab === 'stories' ? 'Story' : 'Section'}
            </span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 px-6 gap-6 bg-white overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Products ({products.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('steps')}
          className={`py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'steps'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Process Steps ({steps.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stories')}
          className={`py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'stories'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Stories / Press ({stories.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sections')}
          className={`py-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'sections'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Page Sections ({sections.length})
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search records by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-900"
          />
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={14} className="text-neutral-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="all">All Categories</option>
              <option value="object">Objects (Furniture)</option>
              <option value="light">Lights (Lighting)</option>
            </select>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-neutral-700">
          <thead className="bg-neutral-50 text-neutral-500 font-semibold uppercase tracking-wider border-b border-neutral-200">
            <tr>
              <th className="py-3 px-4 w-16">Image</th>
              <th className="py-3 px-4">Title / Label</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Page / Type</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-neutral-400">
                  No records found matching your query.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                  {/* Image */}
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 relative bg-neutral-100 rounded overflow-hidden border border-neutral-200">
                      <AppImage
                        src={item.image_url || '/images/placeholders/default.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  {/* Title */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-neutral-900 block truncate max-w-xs">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                    )}
                  </td>

                  {/* Details */}
                  <td className="py-3 px-4 max-w-sm">
                    <p className="line-clamp-2 text-neutral-600">
                      {item.content || item.section_key || item.category || '—'}
                    </p>
                  </td>

                  {/* Page / Type */}
                  <td className="py-3 px-4">
                    <span className="inline-block bg-neutral-100 text-neutral-800 text-[10px] font-mono px-2 py-0.5 rounded border border-neutral-200 uppercase">
                      {item.page_slug || item.category || item.type}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.type === 'product' && (
                        <Link
                          href={`/dashboard/products/${item.id}`}
                          className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded transition-colors"
                          title="Open in Visual Product Studio"
                        >
                          <Sparkles size={14} className="text-amber-500" />
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => onEditEntity(item)}
                        className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 rounded transition-colors"
                        title="Edit record"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteEntity(item.id, item.type)}
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Delete record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
