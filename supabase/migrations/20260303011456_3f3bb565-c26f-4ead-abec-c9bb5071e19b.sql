
ALTER TABLE public.miniature_orders
  ADD COLUMN order_type text NOT NULL DEFAULT 'photo_miniature',
  ADD COLUMN model_name text,
  ADD COLUMN model_display_name text,
  ADD COLUMN model_image_url text,
  ADD COLUMN source_page text;

-- Make photo_url and photo_path nullable for car orders
ALTER TABLE public.miniature_orders
  ALTER COLUMN photo_url DROP NOT NULL,
  ALTER COLUMN photo_path DROP NOT NULL;
