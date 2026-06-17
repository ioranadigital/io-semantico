-- Create clientes table
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  url TEXT,
  descripcion TEXT,
  keywords_count INTEGER DEFAULT 0,
  urls_count INTEGER DEFAULT 0,
  optimizaciones_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on created_at for sorting
CREATE INDEX idx_clientes_created_at ON public.clientes(created_at DESC);

-- Enable RLS
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all reads (development)
CREATE POLICY "Allow all reads" ON public.clientes
  FOR SELECT USING (true);

-- Create policy to allow all writes (development)
CREATE POLICY "Allow all writes" ON public.clientes
  FOR INSERT WITH CHECK (true);

-- Create policy to allow all updates (development)
CREATE POLICY "Allow all updates" ON public.clientes
  FOR UPDATE USING (true) WITH CHECK (true);

-- Create policy to allow all deletes (development)
CREATE POLICY "Allow all deletes" ON public.clientes
  FOR DELETE USING (true);
