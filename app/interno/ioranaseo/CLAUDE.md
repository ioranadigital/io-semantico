# CLAUDE.md — IORANASEO

**Proyecto: SEO Reporting & Content Audit Platform**
**Nivel 3 (Especializado)**
**Versión:** 1.0 | Fecha: 2026-06-11

---

## Información del Proyecto

- **Nombre**: IoranaSEO
- **Tipo**: Next.js 15 + TypeScript + Tailwind v4 + Supabase
- **Propósito**: Plataforma de reportes SEO y auditoría de contenido
- **Puerto Frontend**: 3005
- **Base Datos**: Supabase (compartida)

---

## Stack Técnico

✅ **Frontend**: Next.js 15 (App Router)
✅ **Lenguaje**: TypeScript 5.x (strict: true)
✅ **Estilos**: Tailwind CSS v4
✅ **Package Manager**: pnpm
✅ **Base de Datos**: Supabase (Auth + RLS + Edge Functions)
✅ **Autenticación**: NextAuth + Supabase

---

## Comandos Principales

```bash
# Desarrollo local
pnpm dev              # Inicia servidor en puerto 3005

# Compilación
pnpm build            # Build optimizado
pnpm start            # Inicia servidor de producción

# Validación
pnpm type-check       # TypeScript strict validation
pnpm lint             # ESLint check
pnpm format           # Prettier fix

# Variables de entorno
# Lee desde: E:\master.env (automáticamente)
# Local override: .env.local (NO versionado)
```

---

## Estructura del Proyecto

```
ioranaseo/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   ├── components/         # Componentes reutilizables
│   └── lib/                # Utilidades compartidas
├── public/                 # Archivos estáticos
├── docs/                   # Documentación operacional
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── .env.local             # Variables locales (NO versionado)
└── CLAUDE.md              # Este fichero
```

---

## Variables de Entorno

**Fuente única**: E:\master.env

```env
IORANASEO_FRONTEND_PORT=3005
IORANASEO_ENV=development
IORANASEO_FRONTEND_URL=http://localhost:3005
IORANASEO_SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
IORANASEO_SUPABASE_KEY=<anon-key>
```

**Archivos locales** (git-ignored):

- `.env.local` → Overrides locales para desarrollo

---

## Flujo de Desarrollo

### 1. Iniciar servidor local

```bash
cd E:\git\app\interno\ioranaseo
pnpm dev
# → Disponible en http://localhost:3005
```

### 2. Crear componente

```bash
# Crear en: src/components/MyComponent.tsx
# Exportar en: src/app/page.tsx o layout.tsx
```

### 3. Validar antes de commit

```bash
pnpm type-check  # TypeScript
pnpm lint        # ESLint
pnpm format      # Prettier
```

### 4. Commit y push

```bash
git add .
git commit -m "feat: descripción corta"
git push origin main
```

---

## Integración Supabase

```typescript
// Importar cliente
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Usar en componentes
const { data, error } = await supabase
  .from("table_name")
  .select("*")
  .eq("id", 1);
```

---

## Configuración de Tipos

`tsconfig.json` incluye:

- `strict: true` (análisis de tipos riguroso)
- `noUnusedLocals` (error si hay variables sin usar)
- `noUnusedParameters` (error si hay parámetros sin usar)
- `baseUrl` con aliases (`@/*` → `./src/*`)

---

## Reglas de Desarrollo

1. **No escribir comentarios innecesarios** — nombres claros suficientes
2. **ESLint & Prettier configurados** — ejecutar antes de commit
3. **TypeScript strict** — no usar `any` sin causa justificada
4. **Supabase como única BD** — sin conexiones locales adicionales
5. **pnpm es OBLIGATORIO** — npm prohibido

---

## Troubleshooting

| Problema               | Solución                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Puerto 3005 en uso     | `lsof -ti :3005 \| xargs kill -9` (macOS) o `netstat -ano \| findstr :3005` (Windows) |
| Módulos no encontrados | `pnpm install` (desde raíz)                                                           |
| TypeScript errors      | `pnpm type-check` y revisar src/                                                      |
| Supabase desconectado  | Verificar ENV variables en `.env.local`                                               |

---

## SLA & Alertas

- **Deploy**: < 5 min (local a staging)
- **Type check**: < 1 min
- **Build**: < 2 min

---

## Matriz de Autoridad

Este fichero **se subordina a**:

1. E:\CLAUDE.md (Master Constitutional)
2. E:\git\CLAUDE.md (Orquestación Monorepo)

---

**Versión**: 1.0
**Estatus**: ✅ Operacional
**Última actualización**: 2026-06-11
