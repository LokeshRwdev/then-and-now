import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase font-semibold tracking-wider text-neutral-300">New Feature</span>
          </div>
          <h2 className="text-xl font-bold">Interactive Live Visual Studio</h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl">
            Click directly on any box or image across all website pages to edit content, upload to Vercel Blob storage, or delete sections in real-time.
          </p>
        </div>
        <Link
          href="/admin"
          className="flex items-center gap-2 bg-white text-neutral-900 text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-all shrink-0 shadow"
        >
          <span>Launch /admin Studio</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <h2 className="text-2xl font-bold">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">New Requests</h3>
          <p className="text-3xl font-bold mt-2">2</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-8">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <p className="text-gray-500 text-sm">Dashboard metrics will be populated when Supabase is connected.</p>
      </div>
    </div>
  );
}
