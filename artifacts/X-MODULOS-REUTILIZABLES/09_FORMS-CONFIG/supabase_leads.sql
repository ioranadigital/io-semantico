-- ═══════════════════════════════════════════════════════════
-- IORANA DIGITAL — Fix: crear tabla leads unificada
-- Ejecutar en: Supabase > SQL Editor
-- ═══════════════════════════════════════════════════════════

-- 1. CREAR TABLA leads (la que usan todos los formularios)
create table if not exists public.leads (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  nombre              text not null,
  email               text not null,
  telefono            text,
  empresa             text,
  servicio            text,
  mensaje             text,
  fuente              text not null default 'web',
  estado              text not null default 'nuevo'
                        check (estado in ('nuevo','contactado','presupuesto','cliente','descartado')),
  consentimiento_rgpd boolean not null default false
);

-- 2. ÍNDICES
create index if not exists idx_leads_estado     on public.leads(estado);
create index if not exists idx_leads_fuente     on public.leads(fuente);
create index if not exists idx_leads_created_at on public.leads(created_at desc);

-- 3. RLS
alter table public.leads enable row level security;

-- Inserción pública (formularios del site)
create policy "leads_insert_publico"
  on public.leads for insert to anon
  with check (true);

-- Lectura solo autenticados (dashboard)
create policy "leads_select_autenticado"
  on public.leads for select to authenticated
  using (true);

-- Actualización solo autenticados (cambio de estado)
create policy "leads_update_autenticado"
  on public.leads for update to authenticated
  using (true) with check (true);

-- 4. VISTA RESUMEN
create or replace view public.resumen_leads as
select
  fuente,
  estado,
  count(*)                                                         as total,
  count(*) filter (where created_at > now() - interval '30 days') as ultimos_30d,
  max(created_at)                                                  as ultimo_lead
from public.leads
group by fuente, estado
order by fuente, estado;

grant select on public.resumen_leads to authenticated;

-- 5. FUNCIÓN RGPD
create or replace function public.anonimizar_lead(lead_id uuid)
returns void language plpgsql security definer as $$
begin
  update public.leads set
    nombre   = '[ANONIMIZADO]',
    email    = '[ANONIMIZADO]',
    telefono = null,
    empresa  = null,
    mensaje  = null
  where id = lead_id;
end;
$$;