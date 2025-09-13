-- =============================================
-- Hexagonal Architecture Boilerplate
-- Supabase Database Setup Script
-- =============================================

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow public read access (for demo purposes)
CREATE POLICY IF NOT EXISTS "Users are publicly readable"
ON public.users FOR SELECT
USING (true);

-- Allow public insert access (for demo purposes)
CREATE POLICY IF NOT EXISTS "Users can be inserted by anyone"
ON public.users FOR INSERT
WITH CHECK (true);

-- Allow public update access (for demo purposes)
CREATE POLICY IF NOT EXISTS "Users can be updated by anyone"
ON public.users FOR UPDATE
USING (true);

-- Allow public delete access (for demo purposes)
CREATE POLICY IF NOT EXISTS "Users can be deleted by anyone"
ON public.users FOR DELETE
USING (true);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_users_updated_at ON public.users;
CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert some sample data (optional)
INSERT INTO public.users (email, name)
VALUES
    ('john.doe@example.com', 'John Doe'),
    ('jane.smith@example.com', 'Jane Smith'),
    ('bob.wilson@example.com', 'Bob Wilson')
ON CONFLICT (email) DO NOTHING;

-- Show confirmation
SELECT 'Supabase database setup completed successfully!' as message;