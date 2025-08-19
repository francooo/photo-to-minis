-- Remove the dangerous public read policy
DROP POLICY IF EXISTS "Anyone can view miniature orders" ON public.miniature_orders;

-- Keep the insert policy for form submissions
-- The "Anyone can create miniature orders" policy remains for the order form

-- Create a secure admin-only read policy for business owner access
-- This will require authentication to be implemented later
CREATE POLICY "Admin can view all orders" ON public.miniature_orders
FOR SELECT USING (
  -- For now, no one can read orders until proper admin authentication is implemented
  false
);

-- Add a comment explaining the security decision
COMMENT ON POLICY "Admin can view all orders" ON public.miniature_orders IS 
'Security policy: Orders can only be viewed by authenticated admin users. 
Currently set to false until proper authentication system is implemented.
Customer data is protected from unauthorized access.';