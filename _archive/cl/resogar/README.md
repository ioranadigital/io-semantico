# Resogar — Plataforma de Alquiler de Apartamentos

Plataforma de reservas de apartamentos vacacionales en Salamanca, España.

## MVP Scope

**Alcance confirmado:**
- 3 apartamentos (escalable a más)
- Motor de reservas propio (Direct Booking)
- Pagos híbridos: Stripe/PayPal + transferencia bancaria
- Panel de admin: ver reservas + bloquear fechas
- Reseñas post-reserva
- Sincronización manual de calendarios con OTAs
- Política de cancelación: 14d→100% | 7d→50% | <7d→0%

## Stack

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS v4
- **Backend/DB:** Supabase (PostgreSQL, Auth, RLS)
- **Pagos:** Stripe + PayPal
- **Automatización:** n8n
- **Hosting:** Vercel + Supabase

## Quick Start

1. Ejecutar SQL en `SUPABASE_SETUP.sql`
2. Copiar credenciales a `.env.local`
3. `npm install && npm run dev`

Ver `SETUP.md` para detalles completos.

## Features Completadas

✓ Estructura base Next.js 16 + Tailwind
✓ Home + galería de apartamentos
✓ Formulario de reserva (modal)
✓ Panel de admin (reservas + bloquear fechas)
✓ Página de contacto
✓ Componentes Header/Footer
✓ Tipos TypeScript
✓ Supabase setup SQL

## Next Steps

⏳ Autenticación de admin
⏳ Integración Stripe/PayPal
⏳ Emails con n8n
⏳ Reseñas funcionales
⏳ Deploy a Vercel
