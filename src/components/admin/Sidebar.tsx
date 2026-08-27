import Link from 'next/link';
import { Package, Home, LayoutList, BookOpen, Layers, MessageSquare, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wider uppercase">T&N Admin</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
              <Home size={18} /> Overview
            </Link>
          </li>
          <li className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</li>
          <li>
            <Link href="/dashboard/products" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
              <Package size={18} /> Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/projects" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
              <LayoutList size={18} /> Projects
            </Link>
          </li>
          <li>
            <Link href="/dashboard/stories" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
              <BookOpen size={18} /> Stories
            </Link>
          </li>
          <li>
            <Link href="/dashboard/materials" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
              <Layers size={18} /> Materials
            </Link>
          </li>
          <li className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Inbox</li>
          <li>
            <Link href="/dashboard/requests" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
              <MessageSquare size={18} /> Requests
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800 space-y-1">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium text-gray-400">
          <Settings size={18} /> Settings
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-900/50 hover:text-red-400 transition-colors text-sm font-medium text-gray-400">
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </aside>
  );
}
