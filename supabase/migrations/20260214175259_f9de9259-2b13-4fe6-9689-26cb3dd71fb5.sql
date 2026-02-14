
-- Create miniature_orders table
CREATE TABLE public.miniature_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  photo_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.miniature_orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form, no auth required)
CREATE POLICY "Anyone can create orders"
ON public.miniature_orders
FOR INSERT
WITH CHECK (true);

-- Allow reading orders (for admin/edge functions via service role)
CREATE POLICY "Service role can read orders"
ON public.miniature_orders
FOR SELECT
USING (true);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('order-photos', 'order-photos', true);

-- Allow anyone to upload photos
CREATE POLICY "Anyone can upload photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'order-photos');

-- Allow public read access to photos
CREATE POLICY "Public photo access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'order-photos');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_miniature_orders_updated_at
BEFORE UPDATE ON public.miniature_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
