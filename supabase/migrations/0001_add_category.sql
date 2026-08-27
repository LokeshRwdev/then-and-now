-- Add category column to products table
ALTER TABLE products ADD COLUMN category text NOT NULL DEFAULT 'object';
-- The category can be 'object' or 'light'
