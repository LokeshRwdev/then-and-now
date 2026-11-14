import AdminClient from './AdminClient';

export const metadata = {
  title: 'Admin Panel | Now & Then',
  description: 'Manage website content, products, and visual pages with live CRUD operations.',
};

export default function AdminPage() {
  return <AdminClient />;
}
