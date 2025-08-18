-- Create table for storing miniature orders
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

-- Enable Row Level Security
ALTER TABLE public.miniature_orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert orders (public form)
CREATE POLICY "Anyone can create miniature orders" 
ON public.miniature_orders 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading orders (for admin purposes later)
CREATE POLICY "Anyone can view miniature orders" 
ON public.miniature_orders 
FOR SELECT 
USING (true);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public) VALUES ('miniature-photos', 'miniature-photos', true);

-- Create storage policies for photo uploads
CREATE POLICY "Anyone can upload miniature photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'miniature-photos');

CREATE POLICY "Anyone can view miniature photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'miniature-photos');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_miniature_orders_updated_at
BEFORE UPDATE ON public.miniature_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();