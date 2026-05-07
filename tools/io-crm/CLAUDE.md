# CLAUDE.md — io-crm
**CRM frontend: Forms + WhatsApp + Supabase + Automación**

## Rol

io-crm es la **capa de captación y gestión de leads** de Iorana. Aquí implementas:
- ✅ Formularios de contacto y captación
- ✅ Integración con WhatsApp
- ✅ Dashboard de contactos/leads
- ✅ Sincronización con Supabase auth
- ✅ Trigger de automaciones en n8n

🔴 **NO es el lugar para**:
- Lógica SaaS principal (usa iorana-next)
- Landing pages de servicios (usa iorana-next)
- Auditorías SEO (usa audit-seo)
- Componentes reutilizables genéricos (usa iorana-next)

---

## Antes de empezar: Lee esto

**OBLIGATORIO LEER (en orden):**
1. `E:\git\iorana-next\AGENTS.md` (comprende la arquitectura)
2. Este CLAUDE.md
3. Los archivos de configuración en tu repo

---

## Estructura de carpetas

```
io-crm/
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx       ← Formulario de contacto
│   │   │   ├── DemoForm.tsx          ← Solicitud de demo
│   │   │   ├── QuoteForm.tsx         ← Solicitud de presupuesto
│   │   │   └── [otros formularios]
│   │   ├── dashboard/
│   │   │   ├── LeadsList.tsx         ← Lista de leads
│   │   │   ├── LeadsMetrics.tsx      ← Métricas
│   │   │   └── [otros componentes]
│   │   └── shared/
│   │       └── [componentes compartidos]
│   │
│   ├── lib/
│   │   ├── supabase-client.ts        ← Cliente Supabase
│   │   ├── whatsapp.ts               ← Integración WhatsApp
│   │   ├── n8n-hooks.ts              ← Webhooks a n8n
│   │   └── [otros helpers]
│   │
│   ├── pages/
│   │   ├── index.tsx                 ← Home del CRM
│   │   ├── leads/
│   │   │   ├── index.tsx             ← Dashboard de leads
│   │   │   └── [id].tsx              ← Detalle de lead
│   │   └── [otras páginas]
│   │
│   ├── hooks/
│   │   ├── useLeads.ts               ← Hook para leads
│   │   ├── useWhatsApp.ts            ← Hook para WhatsApp
│   │   └── [otros hooks]
│   │
│   ├── n8n/                          ← Workflows de automatización
│   │   └── lead-routing.json
│   │
│   ├── supabase/                     ← SQL y RLS policies
│   │   ├── migrations/
│   │   └── seed.sql
│   │
│   └── types/
│       └── index.ts                  ← Tipos TypeScript compartidos
│
├── public/
│   └── [assets estáticos]
│
├── vite.config.ts                   ← Config Vite (si es SPA)
├── package.json
├── tsconfig.json
├── CLAUDE.md                         ← Este archivo
└── .env.local                        ← Variables (NO en Git)
```

---

## Antes de empezar: Configura el entorno

### 1. Instala dependencias
```powershell
cd E:\git\io-crm
npm install
```

### 2. Crea .env.local
```powershell
# Copia template
copy .env.example .env.local 2>nul
# O crea nuevo
```

### 3. Configura variables
```
# Supabase (requerida)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# WhatsApp Business API (opcional pero recomendado)
VITE_WHATSAPP_BUSINESS_ID=your-business-id
WHATSAPP_API_TOKEN=your-api-token
WHATSAPP_PHONE_NUMBER=+34XXXXXXXXX

# n8n webhooks (para automaciones)
VITE_N8N_WEBHOOK_URL=https://n8n.iorana.digital/webhook/lead-new
VITE_N8N_WEBHOOK_URL_UPDATE=https://n8n.iorana.digital/webhook/lead-updated

# Email (para notificaciones)
VITE_CONTACT_EMAIL=contacto@iorana.digital
```

### 4. Verificar Supabase
- Tabla `leads` creada en Supabase
- RLS policies configuradas
- Autenticación habilitada

---

## Workflow 1: Crear formulario de contacto

### Paso 1: Define el tipo de dato
```typescript
// src/types/index.ts
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: 'contact-form' | 'demo' | 'quote' | 'whatsapp';
  status: 'nuevo' | 'contactado' | 'calificado' | 'perdido';
  created_at: Date;
  updated_at: Date;
}
```

### Paso 2: Crea el formulario
```typescript
// src/components/forms/ContactForm.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { triggerN8nWebhook } from '@/lib/n8n-hooks';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
    };

    try {
      // 1. Inserta en Supabase
      const { data: lead, error } = await supabase
        .from('leads')
        .insert([
          {
            ...data,
            source: 'contact-form',
            status: 'nuevo',
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // 2. Trigger a n8n para automación (WhatsApp, email, etc)
      await triggerN8nWebhook('lead-new', lead);

      setSubmitted(true);
    } catch (err) {
      console.error('Error:', err);
      // Mostrar error al usuario
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div>¡Gracias! Nos pondremos en contacto pronto.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Tu nombre"
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Tu email"
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono (opcional)"
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        name="company"
        placeholder="Empresa (opcional)"
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="message"
        placeholder="Tu mensaje"
        required
        rows={4}
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
```

### Paso 3: Usa el formulario en iorana-next
```typescript
// En iorana-next, import del componente:
import ContactForm from '@/io-crm/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div>
      <h1>Contacta con nosotros</h1>
      <ContactForm />
    </div>
  );
}
```

---

## Workflow 2: Dashboard de leads

### Paso 1: Crea el hook para obtener leads
```typescript
// src/hooks/useLeads.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Lead } from '@/types';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setLeads(data || []);
      setLoading(false);
    };

    fetchLeads();

    // Subscribe a cambios en tiempo real
    const subscription = supabase
      .channel('leads')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          setLeads((prev) => {
            if (payload.eventType === 'INSERT') {
              return [payload.new as Lead, ...prev];
            } else if (payload.eventType === 'UPDATE') {
              return prev.map((l) => (l.id === payload.new.id ? payload.new : l));
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return { leads, loading };
}
```

### Paso 2: Crea el componente del dashboard
```typescript
// src/components/dashboard/LeadsList.tsx
import { useLeads } from '@/hooks/useLeads';
import { Lead } from '@/types';

export default function LeadsList() {
  const { leads, loading } = useLeads();

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Fuente</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead: Lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="border p-2">{lead.name}</td>
              <td className="border p-2">{lead.email}</td>
              <td className="border p-2">{lead.source}</td>
              <td className="border p-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  lead.status === 'nuevo' ? 'bg-yellow-100' :
                  lead.status === 'calificado' ? 'bg-green-100' :
                  'bg-gray-100'
                }`}>
                  {lead.status}
                </span>
              </td>
              <td className="border p-2">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Paso 3: Página del dashboard
```typescript
// src/pages/leads/index.tsx
import LeadsList from '@/components/dashboard/LeadsList';
import LeadsMetrics from '@/components/dashboard/LeadsMetrics';

export default function LeadsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Leads</h1>
      <LeadsMetrics />
      <LeadsList />
    </div>
  );
}
```

---

## Integración con WhatsApp

### Paso 1: Helper para enviar por WhatsApp
```typescript
// src/lib/whatsapp.ts
export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string
) {
  const response = await fetch(
    `https://graph.instagram.com/v18.0/${process.env.VITE_WHATSAPP_BUSINESS_ID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'text',
        text: { body: message },
      }),
    }
  );

  return response.json();
}
```

### Paso 2: Trigger desde n8n
En el workflow de n8n, añade acción:
```json
{
  "node": "WhatsApp",
  "type": "sendMessage",
  "phoneNumber": "{{ $json.phone }}",
  "message": "Hola {{ $json.name }}, te hemos recibido tu contacto..."
}
```

---

## Comandos principales

```powershell
cd E:\git\io-crm

# Desarrollo
npm install                  # Primera vez
npm run dev                  # Dev server
npm run build                # Build
npm run start                # Producción

# Verificación
npx tsc --noEmit            # Chequea tipos TypeScript

# Supabase
# (si tienes CLI de Supabase)
supabase db push             # Sincroniza migraciones
supabase start               # Inicia Supabase local
```

---

## Responsabilidades

✅ **Debe**:
- Crear y validar formularios
- Sincronizar leads con Supabase
- Integrar con WhatsApp y email
- Mantener RLS policies configuradas
- Trigger automaciones en n8n

🔴 **NO debe**:
- Crear componentes genéricos (están en iorana-next)
- Almacenar credenciales sin encripción
- Modificar el schema de leads sin documentar
- Usar datos de leads para otra cosa que no sea CRM

---

## Variables críticas (.env.local)

```
# Requeridas
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Opcionales pero recomendadas
VITE_WHATSAPP_BUSINESS_ID=...
WHATSAPP_API_TOKEN=...
VITE_N8N_WEBHOOK_URL=...
```

---

## Cuándo necesites...

| Necesidad | Acción |
|---|---|
| Nuevo formulario | Crea en src/components/forms/, usa useLeads() |
| Dashboard de leads | Crea página en src/pages/leads/, usa LeadsList |
| Enviar WhatsApp | Importa sendWhatsAppMessage desde lib/whatsapp.ts |
| Trigger a n8n | triggerN8nWebhook('webhook-name', data) |
| Mostrar métrica de leads | LeadsMetrics component |
