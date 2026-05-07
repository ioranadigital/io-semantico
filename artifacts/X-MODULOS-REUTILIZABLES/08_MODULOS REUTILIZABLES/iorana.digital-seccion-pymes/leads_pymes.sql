-- ═══════════════════════════════════════════════════════════
-- IORANA DIGITAL — Pack Pyme: Tabla de Leads + RLS + Trigger
-- Ejecutar en: Supabase > SQL Editor
-- Autor técnico: Iorana Digital (iorana.digital)
-- ═══════════════════════════════════════════════════════════

-- 1. TABLA PRINCIPAL DE LEADS
create table if not exists public.leads_pymes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nombre      text not null,
  email       text not null,
  telefono    text,
  subproducto text not null check (subproducto in (
                'Posicionamiento en Google Maps',
                'Web de Alta Conversión para Pymes',
                'Soporte Directo sin Intermediarios',
                'Pack completo'
              )),
  mensaje     text,
  fuente      text default 'web-pymes',      -- utm tracking
  estado      text default 'nuevo' check (estado in ('nuevo', 'contactado', 'presupuesto', 'cliente', 'descartado')),
  ip_hash     text,                           -- hash SHA-256 del IP (RGPD: no PII directo)
  consentimiento_rgpd boolean not null default false
);

-- Índices para filtros frecuentes
create index if not exists idx_leads_pymes_estado on public.leads_pymes(estado);
create index if not exists idx_leads_pymes_created on public.leads_pymes(created_at desc);
create index if not exists idx_leads_pymes_subproducto on public.leads_pymes(subproducto);

-- ═══════════════════════════════════════════════════════════
-- 2. ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════
alter table public.leads_pymes enable row level security;

-- Política: inserción anónima (formulario público)
create policy "Inserción pública de leads"
  on public.leads_pymes
  for insert
  to anon
  with check (true);

-- Política: lectura solo para roles autenticados (dashboard interno)
create policy "Lectura autenticada de leads"
  on public.leads_pymes
  for select
  to authenticated
  using (true);

-- Política: actualización solo para authenticated (cambio de estado)
create policy "Actualización de estado por equipo"
  on public.leads_pymes
  for update
  to authenticated
  using (true)
  with check (true);

-- Sin borrado permitido (RGPD: conservar registro de consentimiento)
-- Para eliminación legal usar la función de anonimización abajo.

-- ═══════════════════════════════════════════════════════════
-- 3. FUNCIÓN DE ANONIMIZACIÓN (RGPD — derecho al olvido)
-- ═══════════════════════════════════════════════════════════
create or replace function public.anonimizar_lead(lead_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.leads_pymes set
    nombre   = '[ANONIMIZADO]',
    email    = '[ANONIMIZADO]',
    telefono = null,
    mensaje  = null,
    ip_hash  = null
  where id = lead_id;
end;
$$;

-- ═══════════════════════════════════════════════════════════
-- 4. TRIGGER → Webhook n8n (notificación en tiempo real)
-- ═══════════════════════════════════════════════════════════

-- Extensión http (ya incluida en Supabase)
-- create extension if not exists http with schema extensions;

create or replace function public.notificar_lead_n8n()
returns trigger
language plpgsql
security definer
as $$
declare
  webhook_url text := 'https://TU_N8N_HOST/webhook/leads-pymes'; -- reemplazar con tu URL real
  payload     jsonb;
begin
  payload := jsonb_build_object(
    'id',          NEW.id,
    'nombre',      NEW.nombre,
    'email',       NEW.email,
    'telefono',    coalesce(NEW.telefono, ''),
    'subproducto', NEW.subproducto,
    'mensaje',     coalesce(NEW.mensaje, ''),
    'fuente',      NEW.fuente,
    'created_at',  NEW.created_at
  );

  -- Llamada HTTP asíncrona al webhook de n8n
  perform net.http_post(
    url     := webhook_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body    := payload::text
  );

  return NEW;
end;
$$;

create trigger on_new_lead_pyme
  after insert on public.leads_pymes
  for each row
  execute function public.notificar_lead_n8n();

-- ═══════════════════════════════════════════════════════════
-- 5. VISTA RESUMEN (para dashboard Iorana)
-- ═══════════════════════════════════════════════════════════
create or replace view public.resumen_leads_pymes as
select
  subproducto,
  estado,
  count(*)                              as total,
  min(created_at)                       as primer_lead,
  max(created_at)                       as ultimo_lead,
  count(*) filter (where created_at > now() - interval '30 days') as leads_30d
from public.leads_pymes
group by subproducto, estado
order by subproducto, estado;

-- Permisos de vista para authenticated
grant select on public.resumen_leads_pymes to authenticated;
