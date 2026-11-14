import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Studio | Now & Then',
  description: 'Manage website content, products, and visual pages with live CRUD operations.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-neutral-100 text-neutral-900 ${inter.className}`}>
      {children}
    </div>
  );
}
