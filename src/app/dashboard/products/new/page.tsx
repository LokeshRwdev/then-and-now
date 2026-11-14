import React from 'react';
import VisualProductPageEditor from '@/components/admin/VisualProductPageEditor';

export const metadata = {
  title: 'Add New Product (Visual Studio) | Now & Then',
  description: 'Visually create and customize a product page in real time.',
};

export default function NewProductPage() {
  return <VisualProductPageEditor isNew={true} />;
}
