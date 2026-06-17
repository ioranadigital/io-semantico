# 📋 INSTRUCCIÓN: Archivos de Configuración para Nuevo Proyecto

**Status:** ✅ OBLIGATORIA | Versión: 1.0 | Fecha: 2026-06-11

---

## 📌 ARCHIVOS QUE FALTAN

Después de crear la estructura base, necesitas crear estos archivos:

### **1. .gitignore** (OBLIGATORIO)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\.gitignore`

```
# Dependencies
node_modules/
dist/
build/
.next/

# Environment
.env.local
.env.*.local
.env

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Cache
.cache/
.turbo/
.eslintcache

# Testing
coverage/
.nyc_output/

# Temporary
tmp/
temp/
*.tmp
```

---

### **2. .env.example** (OBLIGATORIO)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\.env.example`

```
# Copiar a .env.local para desarrollo local
# Este archivo es versionado (sin valores reales)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
SUPABASE_URL=https://placeholder.supabase.co
SUPABASE_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# API
NEXT_PUBLIC_API_URL=http://localhost:[PUERTO]
API_URL=http://localhost:[PUERTO]

# Redis
REDIS_URL=redis://localhost:6379

# Otros
NODE_ENV=development
LOG_LEVEL=info
```

---

### **3. .env.local** (DESARROLLO LOCAL)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\.env.local`

**Nota:** Este archivo NO va a git (está en .gitignore)

```
# Copiado de .env.example
# Completa con valores reales para desarrollo local

NEXT_PUBLIC_SUPABASE_URL=[TU_URL]
SUPABASE_URL=[TU_URL]
SUPABASE_KEY=[TU_KEY]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[TU_KEY]

NEXT_PUBLIC_API_URL=http://localhost:[PUERTO_EXACTO_DE_MASTER.ENV]
API_URL=http://localhost:[PUERTO_EXACTO_DE_MASTER.ENV]

REDIS_URL=redis://localhost:6379
NODE_ENV=development
LOG_LEVEL=debug
```

---

### **4. next.config.js** (SI ES NEXT.JS)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;
```

---

### **5. tailwind.config.js** (SI USA TAILWIND)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0066ff",
        secondary: "#667eea",
      },
    },
  },
  plugins: [],
};
```

---

### **6. .eslintrc.json** (YA LISTADO, COMPLETO)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
  }
}
```

---

### **7. prettier.config.js** (YA LISTADO, COMPLETO)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\prettier.config.js`

```javascript
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
};
```

---

### **8. tsconfig.json** (YA LISTADO, COMPLETO)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "next-env.d.ts"],
  "exclude": ["node_modules", "dist", ".next"]
}
```

---

### **9. README.md** (DOCUMENTACIÓN BÁSICA)

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\README.md`

````markdown
# [NOMBRE_PROYECTO]

[Descripción breve del proyecto]

## Stack

- Next.js 15
- TypeScript 5.x
- Tailwind CSS v4
- Supabase
- pnpm

## Instalación

```bash
pnpm install
```
````

## Desarrollo

Crear `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
# Editar .env.local con valores reales
```

Iniciar servidor:

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Build

```bash
pnpm build
pnpm start
```

## Testing

```bash
pnpm test
```

## Linting

```bash
pnpm lint
```

## Documentación

- [CLAUDE.md](./CLAUDE.md) - Guía del proyecto
- [docs/](./docs/) - Documentación adicional

---

**Versión:** 1.0
**Status:** En desarrollo

```

---

### **10. Estructura básica src/** (PARA NEXT.JS)

```

src/
├── app/
│ ├── layout.tsx (Root layout)
│ ├── page.tsx (Home page)
│ ├── globals.css (Tailwind imports)
│ └── favicon.ico
├── components/
│ ├── Header.tsx
│ └── Footer.tsx
├── lib/
│ ├── supabase.ts (Supabase client)
│ └── utils.ts (Utilities)
├── types/
│ └── index.ts (Type definitions)
└── styles/
└── globals.css (Global styles)

````

**Archivo base: `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '[NOMBRE_PROYECTO]',
  description: '[Descripción]',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
````

---

### **11. GitHub Actions (CI-CD) - OPCIONAL**

**Ubicación:** `E:\git\app\[TIPO]\[NOMBRE]\.github\workflows\ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: tsc --noEmit

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test --coverage
```

---

## ✅ CHECKLIST COMPLETO

Después de crear estructura base:

**PASO 1: Archivos de configuración**

- [ ] `.gitignore` creado
- [ ] `.env.example` creado
- [ ] `.env.local` creado y gitignored
- [ ] `next.config.js` creado (si Next.js)
- [ ] `tailwind.config.js` creado (si Tailwind)
- [ ] `.eslintrc.json` creado
- [ ] `prettier.config.js` creado
- [ ] `tsconfig.json` creado

**PASO 2: Documentación**

- [ ] `README.md` creado

**PASO 3: Estructura de código**

- [ ] Carpeta `src/` creada
- [ ] `src/app/layout.tsx` creado (si Next.js)
- [ ] `src/app/page.tsx` creado (si Next.js)
- [ ] Carpetas `components/`, `lib/`, `types/` creadas

**PASO 4: CI-CD (opcional)**

- [ ] `.github/workflows/ci.yml` creado (si needed)

**PASO 5: Validación**

- [ ] `pnpm install` sin errores
- [ ] `tsc --noEmit` sin errores
- [ ] `pnpm lint` sin errores
- [ ] `pnpm dev` inicia sin errores

---

## ⚡ INSTRUCCIÓN RÁPIDA: Script automático

Crear archivo: `E:\scripts\create-project.ps1`

```powershell
# PowerShell script que genera todo automáticamente
# Uso: . E:\scripts\create-project.ps1 -Name io-nuevo -Type tools
```

Este script podría:

1. Crear estructura de carpeta
2. Crear CLAUDE.md
3. Crear todos los archivos de configuración
4. Agregar a master.env
5. Agregar a pnpm-workspace.yaml
6. Ejecutar `pnpm install`

---

## 🎯 ORDEN CORRECTO DE CREACIÓN

1. ✅ Crear carpeta y CLAUDE.md
2. ✅ Agregar a master.env y pnpm-workspace.yaml
3. ✅ Crear package.json
4. ✅ Crear **todos los archivos de configuración** (10 archivos)
5. ✅ Crear estructura src/ con archivos base
6. ✅ `pnpm install`
7. ✅ `tsc --noEmit` (validar)
8. ✅ `pnpm lint` (validar)

---

**Documento:** INSTRUCCION-ARCHIVOS-CONFIGURACION-PROYECTO.md
**Status:** ✅ OBLIGATORIA
**Criticidad:** 🔴 ALTA
**Versión:** 1.0
