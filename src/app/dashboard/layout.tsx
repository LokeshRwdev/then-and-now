import Sidebar from '@/components/admin/Sidebar';
import { Inter } from "next/font/google";

// We force the admin dashboard to use Inter and be isolated from the global brand theme
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard | Then & Now',
  description: 'Manage website content',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-screen w-full bg-gray-50 text-gray-900 ${inter.className}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
