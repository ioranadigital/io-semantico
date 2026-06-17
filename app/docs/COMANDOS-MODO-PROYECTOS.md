# 🎮 REFERENCIA COMPLETA: Comandos, Instrucciones y Modos para Proyectos

**Status:** ✅ DOCUMENTACIÓN CENTRALIZADA | Versión: 3.5 | Fecha: 2026-06-17 | 52 Instrucciones/Modos

**Centro único de referencia:** Todas las instrucciones, modos automáticos, funciones PowerShell Y COMANDOS DE DISEÑO documentados en un solo lugar.

---

## 📚 DOCUMENTACIÓN GLOBAL CENTRALIZADA

**↳ E:\lib\007 DOCUMENTACION\ ← FUENTE ÚNICA DE VERDAD**

---

## 💬 CÓMO SOLICITAR A CLAUDE CODE

Las solicitudes abajo son ejemplos **reales y directos** que puedes copiar-pegar en Claude Code.

---

## 📊 TABLA MAESTRA: TODOS LOS COMANDOS, MODOS E INSTRUCCIONES (52 TOTAL)

| #                              | Categoría     | Instrucción/Modo             | Keyword       | Ejemplo de Solicitud                                    | Tipo       |
| ------------------------------ | ------------- | ---------------------------- | ------------- | ------------------------------------------------------- | ---------- |
| **INSTRUCCIONES LOCALES (7)**  |               |                              |               |                                                         |            |
| 1                              | Setup         | Crear Proyecto               | Script        | `. E:\scripts\create-project.ps1`                       | Automático |
| 2                              | Protocolo     | Iniciar Servidores           | Master.env    | `Inicia los servidores del proyecto [nombre]`           | Manual     |
| 3                              | Protocolo     | Verificar Puertos            | netstat       | `. E:\scripts\verify-ports.ps1`                         | Automático |
| 4                              | Protocolo     | Guardar Archivos             | docs/         | `Guarda esto en docs/instructions/`                     | Manual     |
| 5                              | Setup         | Archivos de Configuración    | config        | `Crea .gitignore, tsconfig.json, prettier`              | Manual     |
| 6                              | Setup         | Estructura de Carpeta /docs/ | docs          | `Cómo estructurar la carpeta docs/`                     | Referencia |
| 7                              | Control       | Git Control Diario           | #git          | `#git-daily-prompt` o `¿Quieres hacer git hoy?`         | Automático |
| **MODOS DE DESARROLLO (8)**    |               |                              |               |                                                         |            |
| 8                              | Desarrollo    | #refactor                    | refactor      | `Refactoriza este código para mejorar legibilidad`      | Automático |
| 9                              | Desarrollo    | #performance                 | performance   | `Audita performance - Core Web Vitals`                  | Automático |
| 10                             | Desarrollo    | #tests                       | tests         | `Genera tests unitarios para esta función`              | Automático |
| 11                             | Desarrollo    | #contenido                   | contenido     | `Escribe artículo blog sobre [tema]`                    | Automático |
| 12                             | Desarrollo    | #duplicacion                 | duplicacion   | `Detecta código duplicado (DRY)`                        | Automático |
| 13                             | Desarrollo    | #config                      | config        | `Crea configuración: .eslintrc, tsconfig, prettier`     | Automático |
| 14                             | Desarrollo    | #logs                        | logs          | `Agrega logs estratégicos a este código`                | Automático |
| 15                             | Desarrollo    | #email                       | email         | `Diseña template email responsivo`                      | Automático |
| **MODOS DE MANTENIMIENTO (6)** |               |                              |               |                                                         |            |
| 16                             | Mantenimiento | #seguridad                   | seguridad     | `Audita seguridad - OWASP Top 10`                       | Automático |
| 17                             | Mantenimiento | #analisis                    | analisis      | `Analiza stack de dependencias y updates`               | Automático |
| 18                             | Mantenimiento | #validacion                  | validacion    | `Crea Zod schemas para validación`                      | Automático |
| 19                             | Mantenimiento | #accessibility               | accessibility | `Audita accesibilidad WCAG 2.1`                         | Automático |
| 20                             | Mantenimiento | #migracion                   | migracion     | `Crea migration SQL y rollback script`                  | Automático |
| 21                             | Mantenimiento | #limpieza                    | limpieza      | `#limpieza --tipo all --seco true`                      | Automático |
| **MODOS DE AUDITORÍAS (6)**    |               |                              |               |                                                         |            |
| 22                             | Auditoría     | #competencia                 | competencia   | `Analiza competencia SEO y stack`                       | Automático |
| 23                             | Auditoría     | #auditoria                   | auditoria     | `#auditoria --cliente="ESMUNAS" --criterios="completa"` | Automático |
| 24                             | Auditoría     | #imagenes                    | imagenes      | `Optimiza imágenes - WebP, alt text, compression`       | Automático |
| 25                             | Auditoría     | #sitemaps                    | sitemaps      | `Genera sitemap.xml + robots.txt + canonical`           | Automático |
| 26                             | Auditoría     | #schema                      | schema        | `Agrega JSON-LD structured data`                        | Automático |
| 27                             | Auditoría     | #api                         | api           | `Documenta API - OpenAPI 3.0 + Swagger`                 | Automático |
| **MODOS ADICIONALES (3)**      |               |                              |               |                                                         |            |
| 28                             | Documentación | #instrucciones               | instrucciones | `#instrucciones` (genera README automático)             | Automático |
| 29                             | Desarrollo    | #componente                  | componente    | `#componente Button` (crea React component)             | Automático |
| 30                             | Herramientas  | #symlink                     | symlink       | `#symlink E:\lib\01-Componentes\Button`                 | Automático |
| 31                             | SEO           | #semantico                   | semantico     | `#semantico cliente="ESMUNAS" categoria="all"`          | Automático |
| 32                             | Sistema       | #reiniciar                   | reiniciar     | `#reiniciar --puerto=4006` (reinicia servidor)          | Automático |
| **FUNCIONES POWERSHELL (13)**  |               |                              |               |                                                         |            |
| 32                             | PowerShell    | io-audit                     | audit         | `io-audit -Cliente ESMUNAS -Archivo datos.xlsx`         | Automático |
| 33                             | PowerShell    | io-sem                       | sem           | `io-sem -Cliente ESMUNAS`                               | Automático |
| 34                             | PowerShell    | io-docs                      | docs          | `io-docs` (genera documentación)                        | Automático |
| 35                             | PowerShell    | io-comp                      | comp          | `io-comp -Nombre Button` (crea componente)              | Automático |
| 36                             | PowerShell    | io-dev                       | dev           | `io-dev -All` (inicia todos servidores)                 | Automático |
| 37                             | PowerShell    | io-setup                     | setup         | `io-setup --puerto=3005` (Docker + .env)                | Automático |
| 38                             | PowerShell    | io-org                       | org           | `io-org` (organiza documentación)                       | Automático |
| 39                             | PowerShell    | io-mail                      | mail          | `io-mail` (limpia Gmail)                                | Automático |
| 40                             | PowerShell    | io-outreach                  | outreach      | `io-outreach` (email prospección)                       | Automático |
| 41                             | PowerShell    | io-sched                     | sched         | `io-sched` (scheduler tareas)                           | Automático |
| 42                             | PowerShell    | io-status                    | status        | `io-status` (estado proyecto)                           | Automático |
| 43                             | PowerShell    | io-ayuda                     | ayuda         | `io-ayuda` (help de skills)                             | Automático |
| **MODOS DE DISEÑO (8)**        |               |                              |               |                                                         |            |
| 44                             | Diseño        | Componentes                  | Agrega        | `Agrega Hero` / `Agrega Card` / `Agrega Button`         | Automático |
| 45                             | Diseño        | #unificar-diseño             | unificar      | `#unificar-diseño` (sincroniza 100% estilos)            | Automático |
| 46                             | Diseño        | #paleta                      | paleta        | `#paleta https://sitio.com` (extrae colores)            | Automático |
| 47                             | Diseño        | #reiniciar                   | reiniciar     | `#reiniciar` (reinicia servidor + navegador)            | Automático |
| 48                             | Diseño        | #iconos                      | iconos        | `#iconos lucide` (reemplaza emojis)                     | Automático |
| 49                             | Diseño        | /clone-site                  | clone         | `/clone-site https://sitio.com` (clona estructura)      | Automático |
| 50                             | Diseño        | #clone-crear & #plantillas   | clonacion     | `#clone-crear` / `#plantillas` (detector automático)    | Automático |
| 51                             | SEO           | #aplicar-seo                 | seo           | `#aplicar-seo` (audita SEO de todas las páginas)        | Automático |
| 52                             | Cumplimiento  | #rgpd                        | rgpd          | `#rgpd` (modal RGPD/cookies consent)                    | Automático |

---

## 📄 AGREGAR PÁGINAS REUTILIZABLES (NUEVO - v3.3)

**Ubicación:** `E:\lib\008-Pages\` (webs + saas)

**Sistema:** Páginas profesionales que se adaptan automáticamente al proyecto (colores, textos, componentes)

**Cómo usar:**

```
"Agrega Legal"
"Agrega Contacto"
"Agrega Pricing"
etc.
```

**Flujo:**

1. **Tú solicitas:** "Agrega Contacto"
2. **Claude pregunta:** "¿Tipo?" → Menú interactivo
3. **Tú eliges:** Presupuesto / Soporte / Ventas / General
4. **Claude adapta:** Colores, textos, componentes, estructura
5. **Resultado:** Página integrada en proyecto

**Páginas disponibles:**

| WEBS        | SAAS                |
| ----------- | ------------------- |
| Legal       | Pricing             |
| Privacy     | Features            |
| Terms       | Documentation       |
| Contact     | Contact             |
| About       | Legal/Privacy/Terms |
| Help        | Help                |
| Blog        | 404                 |
| 404         | Maintenance         |
| Maintenance |                     |

**Documentación:** `E:\lib\008-Pages\README.md`

---

## 🚀 INSTRUCCIONES LOCALES (7)

### **1. Crear Nuevo Proyecto**

**Ubicación:** `docs/setup/QUICK-START-NEW-PROJECT.md` | `docs/setup/CREAR-NUEVO-PROYECTO.md`

**Opción A: Automático (30 segundos) ⚡**

```powershell
. E:\scripts\create-project.ps1
```

**Parámetros:**

- `Nombre` (ej: io-nuevo) — Nombre único del proyecto
- `Tipo` (interno | tools | clientes) — Categoría del proyecto
- `Descripcion` — Descripción breve

**Qué hace automáticamente:**
✅ Crea carpeta en `E:\git\app\[TIPO]\[NOMBRE]`
✅ Crea `CLAUDE.md` completo con instrucciones
✅ Crea `package.json` con dependencias (Next.js 15, TypeScript, Tailwind v4)
✅ Crea config files (.gitignore, tsconfig.json, .eslintrc.json, prettier.config.js)
✅ Estructura `src/` y `docs/` con subcarpetas
✅ `git init` + primer commit
✅ Agrega puertos a `E:\master.env`
✅ Agrega proyecto a `pnpm-workspace.yaml`

**Resultado:** Proyecto completo listo en 30 segundos ✅

**Opción B: Manual (si prefieres más control)**
Sigue: `docs/setup/CREAR-NUEVO-PROYECTO.md` (7 pasos detallados)

---

### **2. Iniciar Servidores (PROTOCOLO CRÍTICO)**

**Ubicación:** `docs/protocoles/LEER-MASTER-ENV.md` | `docs/protocoles/INICIO-SERVIDORES.md`

**Protocolo obligatorio CADA VEZ que inicies servidores:**

```
1. LEER E:\master.env (PRIMERO - OBLIGATORIO)
2. EXTRAER puertos: [PROYECTO]_FRONTEND_PORT, [PROYECTO]_BACKEND_PORT
3. EJECUTAR: . E:\scripts\verify-ports.ps1
4. VERIFICAR puertos disponibles
5. REUTILIZAR procesos existentes (NO reiniciar)
6. INICIAR solo los faltantes
7. USAR puerto EXACTO de master.env (NO automático)
```

**Por qué:** Evitar conflictos de puertos y procesos zombies

**Documentación:** `docs/protocoles/LEER-MASTER-ENV.md` (LECTURA OBLIGATORIA)

---

### **3. Verificar Puertos**

**Ubicación:** `docs/servidores/VERIFY-PORTS.ps1`

**Script automático:**

```powershell
. E:\scripts\verify-ports.ps1
```

**Qué muestra:**

- Puertos en uso actualmente
- Procesos asociados
- Puertos disponibles según master.env

**Manual (si no eres admin):**

```powershell
netstat -ano | findstr :[PUERTO]
```

---

### **4. Guardar Archivos Generados**

**Ubicación:** `docs/protocoles/ALMACENAMIENTO-ARCHIVOS-GENERADOS.md`

**Regla global:** TODOS los archivos generados van en `docs/[tipo]/`

| Tipo            | Carpeta              | Ejemplo                                 |
| --------------- | -------------------- | --------------------------------------- |
| Instrucciones   | `docs/instructions/` | `INSTRUCCION-SETUP.md`                  |
| Migraciones SQL | `docs/database/`     | `MIGRATION-2026-06-11-CREATE-USERS.sql` |
| Esquemas        | `docs/database/`     | `SCHEMA.md`                             |
| Auditorías      | `docs/analysis/`     | `AUDIT-CLIENTE-2026-06-11.md`           |
| Reportes        | `docs/analysis/`     | `REPORT-MONTHLY.md`                     |
| OpenAPI specs   | `docs/api/`          | `openapi.json`                          |
| Diagramas       | `docs/architecture/` | `DIAGRAMA-FLOW.md`                      |
| Docker          | `docs/deployment/`   | `docker-compose.yml`                    |
| Deploy guides   | `docs/deployment/`   | `DEPLOYMENT-HETZNER.md`                 |
| Otros           | `docs/generated/`    | `[archivo].md`                          |

**Ejemplo de solicitud:**

```
Guarda esto en docs/instructions/
```

---

### **5. Archivos de Configuración**

**Ubicación:** `docs/setup/ARCHIVOS-CONFIGURACION.md`

**10 archivos OBLIGATORIOS después de crear proyecto:**

```
.gitignore              # Ignorar: node_modules, .env.local, dist, .next, etc
.env.example            # Template de variables (SIN valores reales)
.env.local              # Desarrollo local (NO versionado - lo creas en tu máquina)
next.config.js          # Si es Next.js
tailwind.config.js      # Si usa Tailwind
.eslintrc.json          # Reglas de linting
prettier.config.js      # Formato de código
tsconfig.json           # TypeScript config
README.md               # Documentación básica del proyecto
package.json            # Dependencias (ya creado por script)
```

**Validación post-creación:**

```bash
pnpm install            # ✅ Sin errores de dependencias
pnpm type-check         # ✅ Sin errores TypeScript
pnpm lint               # ✅ Sin warnings ESLint
pnpm dev                # ✅ Servidor inicia en http://localhost:[PUERTO]
```

---

### **6. Estructura de Carpeta /docs/**

**Ubicación:** `docs/setup/CARPETA-DOCS-ESTRUCTURA.md`

**Estructura recomendada (11 subcarpetas):**

```
docs/
├── README.md                    # Índice de documentación
├── instructions/                # Instrucciones de uso
├── database/                    # Esquemas BD, migraciones SQL
├── analysis/                    # Auditorías, reportes técnicos
├── api/                         # OpenAPI specs, Swagger
├── architecture/                # Diagramas de arquitectura
├── deployment/                  # Docker, deploy guides, Kubernetes
├── development/                 # Guías de desarrollo
├── changelog/                   # Historial de cambios
├── operations/                  # Procesos operacionales
├── security/                    # Documentación de seguridad
└── resources/                   # Recursos externos
```

**Qué va en /docs/:**
✅ Instrucciones de uso
✅ Esquemas de BD (para ejecutar manualmente)
✅ Guías de configuración
✅ Procesos operacionales
✅ Decisiones de arquitectura

**Qué NO va en /docs/:**
✗ Código fuente (va en src/)
✗ Archivos de config (van en raíz: .env, tsconfig.json)
✗ Tests (van en tests/)
✗ node_modules (ignorado en .gitignore)

---

### **7. Control de Versión: #git-daily-prompt**

**Ubicación:** `E:\CLAUDE.md` | **Protocolo Git**

**Keywords:** `#git-daily-prompt`, `¿Quieres hacer git hoy?`, `Hazme un commit si es necesario`

**Comportamiento:**

1. **Cada día:** Claude pregunta automáticamente "¿Quieres hacer git hoy?"
2. **Si dices SÍ:**
   - Valida: `pnpm build && tsc --noEmit && pnpm lint`
   - Pide contexto: `[CLAUDE.md] Sección: X | Cambio: Y | Rationale: Z`
   - Crea commit local (SIN empujar a remoto)
3. **Si dices NO:**
   - No hace nada, pregunta mañana
4. **RESTRICCIONES garantizadas:**
   - ❌ NUNCA elimina historial
   - ❌ NUNCA reescribe commits
   - ❌ NUNCA empuja sin permiso
   - ✅ SIEMPRE preserva versiones

**Ejemplo de solicitud:**

```
#git-daily-prompt
¿Quieres hacer git hoy?
Hazme un commit si es necesario
```

---

## 🎨 MODOS DE DESARROLLO (8)

### **8. #refactor — Limpiar y Mejorar Código**

**Detecta palabras clave:** "refactoriza", "limpia código", "mejora código", "refactor"

**Impacto:** ⭐⭐⭐⭐⭐ Máximo

**Qué hace:**

- Analiza complejidad ciclomática
- Detecta variables no utilizadas
- Mejora nombres de funciones
- Simplifica lógica innecesaria
- Reporta métricas: líneas ahorradas, complejidad reducida, duplicación eliminada

**Resultado:** Código refactorizado + reporte de mejoras (antes/después)

**Ejemplo de solicitud:**

```
Refactoriza este código para mejorar legibilidad
Limpia esto y simplifica la lógica
Mejora la calidad del código aquí
```

---

### **9. #performance — Auditar Core Web Vitals**

**Detecta palabras clave:** "audita performance", "Core Web Vitals", "LCP", "velocidad", "optimiza"

**Impacto:** ⭐⭐⭐⭐⭐ Máximo

**Qué hace:**

- Analiza LCP (Largest Contentful Paint) < 2.5s
- Mide CLS (Cumulative Layout Shift) < 0.1
- Verifica INP (Interaction to Next Paint) < 100ms
- Mide TTFB (Time to First Byte) < 600ms
- Genera plan de acción prioritizado

**Resultado:** Reporte CWV completo + estrategia de optimización

**Ejemplo de solicitud:**

```
Audita performance de este sitio
Revisa Core Web Vitals
Mejora la velocidad de carga
```

---

### **10. #tests — Generar Tests Unitarios**

**Detecta palabras clave:** "genera tests", "test coverage", "unit tests", "e2e", "cubre con tests"

**Impacto:** ⭐⭐⭐⭐⭐ Máximo

**Qué hace:**

- Crea suite de tests (.test.ts, .spec.ts)
- Genera mocks de funciones/APIs
- Crea fixtures de datos
- Reporta coverage %
- Soporta Jest, Vitest, Playwright

**Resultado:** Suite completa de tests + coverage report + fixtures

**Ejemplo de solicitud:**

```
Genera tests unitarios para esta función
Cubre con tests e2e
Crea test suite con 100% coverage
```

---

### **11. #contenido — Escribir Artículos SEO**

**Detecta palabras clave:** "escribe artículo", "blog post", "contenido SEO", "redacta"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Escribe artículo 500-2000 palabras
- Optimiza para palabras clave
- Incluye estructura H2/H3
- Genera metadata JSON (title, description, keywords)
- Sugiere imágenes relevantes

**Resultado:** Artículo markdown + metadata JSON + sugerencias visuales

**Ejemplo de solicitud:**

```
Escribe artículo sobre TypeScript para principiantes
Blog post: "Nextjs 15 novedades"
Redacta contenido SEO para servicios
```

---

### **12. #duplicacion — Detectar Código Duplicado**

**Detecta palabras clave:** "código duplicado", "DRY", "deduplicar", "repetido"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Busca patrones duplicados (funciones, componentes, hooks)
- Calcula DRY score (0-10, donde 10 = perfecto)
- Sugiere refactorización
- Identifica componentes que pueden reutilizarse
- Reporta líneas duplicadas vs líneas únicas

**Resultado:** Análisis duplicación + DRY score + sugerencias refactoring

**Ejemplo de solicitud:**

```
Detecta código duplicado
Aplica principio DRY
Identifica componentes repetidos
```

---

### **13. #config — Crear Archivos de Configuración**

**Detecta palabras clave:** "crea config", "eslint", "prettier", ".env", "tsconfig", "nextconfig"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Genera .eslintrc.json con reglas modernas
- Crea prettier.config.js para formato
- Genera tsconfig.json (strict mode)
- Crea .env.example como template
- Opcionalmente: next.config.js, tailwind.config.js

**Resultado:** Archivos de config listos para copiar-pegar

**Ejemplo de solicitud:**

```
Crea configuración: .eslintrc, tsconfig, prettier
Genera .env.example
Configura TypeScript strict
```

---

### **14. #logs — Agregar Logs Estratégicos**

**Detecta palabras clave:** "agrega logs", "debugging", "logger", "console", "monitoreo"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Agrega logs en puntos críticos
- Niveles: DEBUG, INFO, WARN, ERROR
- Crea utility de logger reutilizable
- Formatea logs para producción
- Soporta integración con servicios (Sentry, LogRocket)

**Resultado:** Código con logs estratégicos + logger utility

**Ejemplo de solicitud:**

```
Agrega logs estratégicos a este código
Crea logger utility
Agrega monitoreo de errores
```

---

### **15. #email — Diseñar Templates Email**

**Detecta palabras clave:** "diseña email", "template email", "newsletter", "HTML email"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Genera HTML email responsivo
- CSS inline (compatible con clientes email)
- Variables dinámicas: {{name}}, {{url}}, {{date}}
- Soporta dark mode automático
- Incluye fallbacks para imágenes

**Resultado:** HTML email + CSS inline + variables dinámicas

**Ejemplo de solicitud:**

```
Diseña template email de bienvenida
Newsletter responsiva
Email de confirmación con variables dinámicas
```

---

## 🔧 MODOS DE MANTENIMIENTO (6)

### **16. #seguridad — Auditar OWASP Top 10**

**Detecta palabras clave:** "audita seguridad", "OWASP", "vulnerabilidades", "seguridad"

**Impacto:** ⭐⭐⭐⭐⭐ CRÍTICO

**Qué hace:**

- Revisa OWASP Top 10 (2024)
- Detecta SQL injection risks
- Verifica autenticación/autorización
- Analiza gestión de secretos
- Reporta vulnerabilidades por criticidad

**Resultado:** Reporte seguridad OWASP + fixes prioritarios + plan remediation

**Ejemplo de solicitud:**

```
Audita seguridad de este código
Revisa OWASP Top 10
Detecta vulnerabilidades
```

---

### **17. #analisis — Analizar Tech Stack**

**Detecta palabras clave:** "analiza stack", "tech stack", "dependencias", "versiones", "updates"

**Impacto:** ⭐⭐⭐⭐⭐ CRÍTICO

**Qué hace:**

- Audita package.json para updates
- Detecta vulnerabilidades conocidas
- Sugiere upgrade path (minor/major)
- Analiza licencias de dependencias
- Propone timeline de actualización

**Resultado:** Tech stack report + upgrade plan + vulnerabilidades + timeline

**Ejemplo de solicitud:**

```
Analiza el tech stack
Revisa dependencias y updates
Detecta vulnerabilidades en npm packages
```

---

### **18. #validacion — Crear Zod Schemas**

**Detecta palabras clave:** "valida datos", "zod schema", "validacion", "tipos"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Genera Zod schemas para datos
- Crea tipos TypeScript derivados
- Incluye validación personalizada
- Soporta arrays, objetos anidados
- Genera utils para validación en formularios

**Resultado:** Zod schemas (.ts) + TS types + utils validación

**Ejemplo de solicitud:**

```
Crea Zod schema para validación
Genera tipos TypeScript
Valida formulario con Zod
```

---

### **19. #accessibility — Auditar WCAG 2.1**

**Detecta palabras clave:** "audita accesibilidad", "WCAG", "a11y", "accesible", "aria"

**Impacto:** ⭐⭐⭐⭐⭐ CRÍTICO

**Qué hace:**

- Revisa WCAG 2.1 (nivel AA)
- Detecta missing alt text
- Verifica contrastes de color
- Audita navegación por teclado
- Reporta riesgos legales

**Resultado:** WCAG audit report + issues encontrados + fixes recomendados + legal risk

**Ejemplo de solicitud:**

```
Audita accesibilidad WCAG
Revisa a11y del sitio
Mejora contraste de colores
```

---

### **20. #migracion — Crear Migrations SQL**

**Detecta palabras clave:** "crea migracion", "BD", "schema", "Supabase", "migration"

**Impacto:** ⭐⭐⭐⭐⭐ CRÍTICO

**Qué hace:**

- Genera .sql migration file
- Incluye rollback script automático
- Crea instrucciones de ejecución
- Valida data integrity
- Soporta Supabase, PostgreSQL, MySQL

**Resultado:** .sql migration + rollback script + instrucciones + data integrity check

**Ejemplo de solicitud:**

```
Crea migration para agregar tabla usuarios
Genera rollback script
Migration: agregar columna email
```

---

### **21. #limpieza — Limpiar Proyecto**

**Ubicación:** `docs/modos/MODO-LIMPIEZA.md`

**Detecta palabras clave:** "limpia proyecto", "borra archivos", "elimina cache", "limpieza"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Analiza archivos innecesarios
- Borra cache: .next/, .turbo/, .cache/
- Limpia logs viejos
- Identifica archivos huérfanos
- Reporta espacio liberado

**Parámetros:**

- `--tipo`: logs, cache, build, ide, backup, duplicados, huerfanos, all
- `--profundidad`: superficial, normal, completa
- `--seco`: true (simulación) / false (real)

**Resultado:** Análisis de archivos innecesarios + borrado selectivo + espacio liberado

**Ejemplo de solicitud:**

```
#limpieza --tipo all --seco true
Limpia proyecto
Borra archivos temporales
```

---

## 📊 MODOS DE AUDITORÍAS (6)

### **22. #competencia — Analizar Competencia**

**Detecta palabras clave:** "analiza competencia", "compara SEO", "rivales", "competidores"

**Impacto:** ⭐⭐⭐⭐⭐ Cliente (ROI +15-30% traffic)

**Qué hace:**

- Análisis competitivo SEO técnico
- Compara velocidad vs competidores
- Analiza stack tecnológico rival
- Identifica features únicas
- Genera estrategia mercado

**Resultado:** Análisis competitivo completo + estrategia + plan acción

**Ejemplo de solicitud:**

```
Analiza competencia SEO
Compara mi sitio vs competidores
Estrategia: qué nos diferencia
```

---

### **23. #auditoria — Auditar Cliente SEO**

**Ubicación:** `E:\CLAUDE.md` (línea 64-87)

**Detecta palabras clave:** "audita cliente", "análisis SEO", "auditoría técnica"

**Impacto:** ⭐⭐⭐⭐⭐ Cliente (Profesional)

**Parámetros:**

- `cliente` (requerido) — Nombre del cliente
- `archivo` (requerido) — Archivo Excel con datos
- `criterios` — tech-seo, on-page, links, performance, readability, completa

**Qué hace:**

- Lee Excel con URLs/datos
- Analiza cada fila automáticamente
- Genera 23 columnas de análisis
- Personaliza mejoras según config del cliente
- Exporta Excel con pestaña "Original" + "Mejoras"

**Resultado:** Excel con 74 columnas análisis SEO + 23 columnas mejoras personalizadas

**Ejemplo de solicitud:**

```
#auditoria --cliente="ESMUNAS" --criterios="completa"
#auditoria --cliente="XANELUM" --archivo="SEO/Analisis.xlsx"
Audita cliente ESMUNAS
```

---

### **24. #imagenes — Optimizar Imágenes**

**Detecta palabras clave:** "optimiza imágenes", "comprime", "webp", "alt text"

**Impacto:** ⭐⭐⭐⭐ Alto (ROI -75% tamaño)

**Qué hace:**

- Analiza tamaño actual vs comprimido
- Sugiere conversión a WebP
- Verifica alt text en todas
- Calcula ahorro de bandwidth
- Genera script de conversión

**Resultado:** Análisis imágenes + recomendaciones + script conversión WebP

**Ejemplo de solicitud:**

```
Optimiza imágenes
Comprime a WebP
Revisa alt text
```

---

### **25. #sitemaps — Generar Sitemap**

**Detecta palabras clave:** "genera sitemap", "robots.txt", "canonical", "SEO técnico"

**Impacto:** ⭐⭐⭐⭐ Alto (Indexación)

**Qué hace:**

- Genera sitemap.xml (XML standard)
- Crea robots.txt completo
- Agrega canonical HTML tags
- Genera instrucciones Google Search Console
- Soporta multi-idioma

**Resultado:** sitemap.xml + robots.txt + canonical tags + instrucciones GSC

**Ejemplo de solicitud:**

```
Genera sitemap.xml
Crea robots.txt
Agrega canonical tags
```

---

### **26. #schema — Agregar JSON-LD**

**Detecta palabras clave:** "agrega schema", "JSON-LD", "structured data", "rich snippet"

**Impacto:** ⭐⭐⭐⭐ Alto (ROI +15-25% CTR)

**Qué hace:**

- Genera JSON-LD validado
- Soporta tipos: Article, Product, Organization, Event, etc
- Valida contra schema.org
- Incluye código implementación
- Genera ejemplos

**Resultado:** JSON-LD validado + código implementación + ejemplos

**Ejemplo de solicitud:**

```
Agrega schema JSON-LD
Structured data para artículo
Rich snippet para producto
```

---

### **27. #api — Documentar API**

**Detecta palabras clave:** "documenta API", "OpenAPI", "Swagger", "API docs", "endpoints"

**Impacto:** ⭐⭐⭐⭐ Alto (Documentación profesional)

**Qué hace:**

- Genera spec.yaml (OpenAPI 3.0)
- Crea HTML docs interactivos (ReDoc/Swagger UI)
- Genera ejemplos curl
- Exporta Postman collection
- Documenta autenticación y errores

**Resultado:** spec.yaml (OpenAPI) + HTML docs + ejemplos curl + Postman collection

**Ejemplo de solicitud:**

```
Documenta API con OpenAPI
Genera Swagger UI
Postman collection para endpoints
```

---

## 🔗 MODOS ADICIONALES (4)

### **28. #instrucciones — Generar Documentación**

**Ubicación:** `E:\CLAUDE.md` (línea 90-103)

**Detecta palabras clave:** "documentación", "README", "instrucciones", "genera documentación"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Escanea estructura del proyecto
- Genera `INSTRUCCIONES-[carpeta].md`
- Documenta comandos disponibles
- Crea ejemplos prácticos
- Genera arquitectura de archivos (tree)

**Resultado:** `INSTRUCCIONES-[nombre].md` con estructura completa + ejemplos

**Ejemplo de solicitud:**

```
#instrucciones
Genera documentación del proyecto
Crea README automatizado
```

---

### **29. #componente — Crear Componente React**

**Ubicación:** `E:\CLAUDE.md` (línea 159-169)

**Detecta palabras clave:** "crea componente", "React component", "Button", "Card"

**Impacto:** ⭐⭐⭐⭐⭐ Máximo

**Qué hace:**

- Crea componente TypeScript strict
- Usa Tailwind CSS v4
- Props agnóstico (sin textos fijos)
- Lazy Loading si es pesado
- Registra en E:\git\lib\001-Componentes\

**Resultado:** Componente listo para usar + tipos + ejemplos

**Ejemplo de solicitud:**

```
#componente Button
Crea componente Card responsivo
React component para modal
```

---

### **30. #symlink — Crear Symlink a Librería**

**Ubicación:** `E:\CLAUDE.md` (línea 171-219)

**Detecta palabras clave:** "symlink", "enlace", "librería", "link a librería"

**Impacto:** ⭐⭐⭐⭐ Alto

**Qué hace:**

- Crea symlink a librería en E:\lib\
- Soporta rutas relativas
- Valida que existan rutas
- Reemplaza symlink si ya existe
- Sin prompts interactivos

**Parámetros:**

- `LibraryPath` — Ruta a librería (ej: E:\lib\01-Componentes\Button)
- `LinkName` (opcional) — Nombre del symlink
- `ProjectPath` (opcional) — Ruta del proyecto

**Resultado:** Symlink creado exitosamente

**Ejemplo de solicitud:**

```
#symlink E:\lib\01-Componentes\Button
#symlink 02-SEO-Optimizaciones\Semantico
Enlaza componentes de librería
```

---

### **31. #semantico — Motor SEO Inteligente**

**Ubicación:** `E:\CLAUDE.md` (línea 221-299) + `E:\lib\02-SEO-Optimizaciones\Semantico\README.md`

**Detecta palabras clave:** "metadatos", "titles", "descriptions", "SEO", "optimiza contenido"

**Impacto:** ⭐⭐⭐⭐⭐ Cliente (ROI +15-25% traffic)

**Parámetros:**

- `cliente` (requerido) — Nombre del cliente
- `categoria` (opcional) — Categoría específica o "all"
- `--output` (opcional) — Ruta custom
- `--separate-output` (opcional) — Carpetas por categoría

**Qué hace:**

- Lee config-palabras-clave.xlsx
- Lee urls-a-optimizar.xlsx
- Genera propuestas A/B para: titles, descriptions, H1, H2, H3
- Scoring 0-100 para cada propuesta
- Genera JSON-LD schema automático
- Exporta: seo-config-[CATEGORIA].json + propuestas Excel

**Resultado:** Propuestas SEO A/B + scoring + schema JSON-LD + config inyectable

**Ejemplo de solicitud:**

```
#semantico cliente="ESMUNAS"
#semantico cliente="ESMUNAS" categoria="all"
#semantico cliente="XANELUM" --separate-output
Optimiza metadatos SEO
```

---

## 🔄 MODOS DEL SISTEMA (1)

### **32. #reiniciar — Reinicio Automático de Servidores**

**Ubicación:** `E:\lib\007 DOCUMENTACION\MODO-REINICIAR.md`

**Detecta palabras clave:** "reinicia", "reload", "restart", "ver cambios", "reinicio servidor"

**Impacto:** ⭐⭐⭐⭐⭐ Máximo (elimina pasos manuales)

**Parámetros:**

- `--puerto` (opcional) — Puerto específico (default: 4006, auto-detectado)
- `--proyecto` (opcional) — Nombre del proyecto
- `--esperar` (opcional) — Tiempo máximo espera (default: 10s)
- `--custom-url` (opcional) — URL personalizada (default: http://127.0.0.1:4006)
- `--force-kill` (flag) — Mata proceso si no responde
- `--no-browser` (flag) — No abre navegador

**Qué hace:**

- Detecta proyecto y puerto automáticamente (desde master.env)
- Detiene servidor actual (graceful SIGTERM)
- Inicia servidor nuevo
- Espera a que esté online
- Abre navegador automáticamente
- Valida que los cambios sean visibles

**Cuándo se ejecuta automáticamente:**

```
✅ Después de refactoring
✅ Después de agregar componente
✅ Después de cambios CSS/Tailwind
✅ Después de cambios en estructura
✅ Cuando pides "reinicia para ver cambios"

❌ NO en cambios de docs/
❌ NO en cambios de configuración sin lógica
```

**Resultado:** Servidor reiniciado + navegador abierto con cambios visibles

**Ejemplo de solicitud:**

```
Reinicia el servidor
#reiniciar
Reinicia para ver cambios en http://127.0.0.1:4006/optimizador
#reiniciar --puerto=3002 --esperar=30s
#reiniciar --force-kill --custom-url=http://localhost:4006/dashboard
```

**Documentación completa:** `E:\lib\007 DOCUMENTACION\MODO-REINICIAR.md`

---

## 💻 FUNCIONES POWERSHELL (14)

### **Cargar funciones:**

```powershell
. $PROFILE
```

Esto carga todas las funciones `io-*` disponibles en la terminal PowerShell.

**Alias disponibles:**

```
reiniciar     → Reinicia servidor
reload        → Alias de reiniciar
restart       → Alias de reiniciar
paleta        → Extrae colores de sitio web
```

---

### **32. io-audit — Auditar Cliente SEO**

```powershell
io-audit -Cliente ESMUNAS -Archivo datos.xlsx -Criterios "completa"
```

**Qué hace:** Ejecuta auditoría SEO rápidamente desde terminal

**Parámetros:** -Cliente, -Archivo, -Criterios

---

### **33. io-sem — Metadatos SEO**

```powershell
io-sem -Cliente ESMUNAS -Categoria "all"
```

**Qué hace:** Genera metadatos SEO rápidamente

**Parámetros:** -Cliente, -Categoria

---

### **34. io-docs — Generar Documentación**

```powershell
io-docs
```

**Qué hace:** Genera README y documentación del proyecto

---

### **35. io-comp — Crear Componente**

```powershell
io-comp -Nombre "Button" -Props "label,onClick"
```

**Qué hace:** Crea componente React rápidamente

**Parámetros:** -Nombre, -Props

---

### **36. io-dev — Iniciar Servidores**

```powershell
io-dev -All
io-dev -Proyecto "io-semantico"
```

**Qué hace:** Inicia servidores development automáticamente

**Parámetros:** -All, -Proyecto

---

### **37. io-setup — Docker + .env Setup**

```powershell
io-setup --puerto=3005
```

**Qué hace:** Configura Docker y .env automáticamente

**Parámetros:** --puerto

---

### **38. io-org — Organizar Documentación**

```powershell
io-org
```

**Qué hace:** Organiza y estructura documentación

---

### **39. io-mail — Limpiar Gmail**

```powershell
io-mail
```

**Qué hace:** Limpia y organiza Gmail automáticamente

---

### **40. io-outreach — Email Prospección**

```powershell
io-outreach
```

**Qué hace:** Genera emails de prospección personalizados

---

### **41. io-sched — Scheduler Tareas**

```powershell
io-sched
```

**Qué hace:** Programa tareas automáticas

---

### **42. io-status — Estado del Proyecto**

```powershell
io-status
```

**Qué hace:** Muestra estado completo del proyecto

---

### **43. io-ayuda — Help de Skills**

```powershell
io-ayuda
```

**Qué hace:** Muestra ayuda de todas las funciones disponibles

---

### **44. io-reiniciar — Reiniciar Servidor (PowerShell)**

```powershell
io-reiniciar -Puerto 4006 -Proyecto "optimizador"
reiniciar                    # Alias corto
reload                       # Alias corto
restart                      # Alias corto
```

**Parámetros:**

- `-Puerto` — Puerto del servidor (default: 4006)
- `-Proyecto` — Nombre del proyecto (default: optimizador)
- `-Esperar` — Segundos máximo espera (default: 10)
- `-AbrirNavegador` — Abrir navegador (default: $true)
- `-URL` — URL personalizada
- `-ForceKill` — Mata proceso forzadamente

**Qué hace:** Reinicia servidor automáticamente, espera a que esté online y abre navegador

---

## 📋 TABLA RÁPIDA: DÓNDE ENCONTRAR CADA COSA

| Necesito...               | Ubicación                                              |
| ------------------------- | ------------------------------------------------------ |
| Crear proyecto rápido     | `docs/setup/QUICK-START-NEW-PROJECT.md`                |
| Crear proyecto detallado  | `docs/setup/CREAR-NUEVO-PROYECTO.md`                   |
| Archivos de config        | `docs/setup/ARCHIVOS-CONFIGURACION.md`                 |
| Estructura /docs/         | `docs/setup/CARPETA-DOCS-ESTRUCTURA.md`                |
| Leer master.env (CRÍTICO) | `docs/protocoles/LEER-MASTER-ENV.md`                   |
| Iniciar servidores        | `docs/protocoles/INICIO-SERVIDORES.md`                 |
| Guardar archivos          | `docs/protocoles/ALMACENAMIENTO-ARCHIVOS-GENERADOS.md` |
| Lista de puertos          | `docs/servidores/PUERTOS-MASTER-ENV.md`                |
| Verificar puertos         | `docs/servidores/VERIFY-PORTS.ps1`                     |
| Limpiar proyecto          | `docs/modos/MODO-LIMPIEZA.md`                          |
| Reiniciar servidor        | `E:\lib\007 DOCUMENTACION\MODO-REINICIAR.md`           |
| Extraer paleta colores    | `E:\lib\007 DOCUMENTACION\MODO-PALETA.md`              |
| Todos los modos           | `E:\CLAUDE.md` (línea 450-624)                         |
| Funciones PowerShell      | `E:\scripts\`                                          |

---

## 🎯 FLUJO RÁPIDO: PRIMEROS PASOS

### **Si eres nuevo:**

1. Lee `docs/setup/QUICK-START-NEW-PROJECT.md`
2. Ejecuta: `. E:\scripts\create-project.ps1`
3. Lee: `docs/protocoles/LEER-MASTER-ENV.md`
4. Inicia servidores con: `pnpm dev`

### **Si necesitas auditar cliente:**

1. Lee: `E:\CLAUDE.md` (línea 64-87)
2. Ejecuta: `#auditoria --cliente="NOMBRE" --criterios="completa"`
3. Revisa resultado en Excel

### **Si necesitas optimizar SEO:**

1. Lee: `E:\CLAUDE.md` (línea 221-299)
2. Ejecuta: `#semantico cliente="NOMBRE" categoria="all"`
3. Implementa propuestas A/B

### **Si necesitas código limpio:**

1. Usa: `#refactor` (refactoring)
2. Usa: `#performance` (Core Web Vitals)
3. Usa: `#tests` (generar tests)
4. Usa: `#seguridad` (auditar OWASP)

---

## ✅ CHECKLIST: DESPUÉS DE CREAR PROYECTO

- [ ] Crear proyecto: `. E:\scripts\create-project.ps1`
- [ ] Copiar .env: `cp .env.example .env.local`
- [ ] Instalar deps: `pnpm install`
- [ ] Validar tipos: `pnpm type-check`
- [ ] Lint: `pnpm lint`
- [ ] Iniciar servidor: `pnpm dev`
- [ ] Verificar en: `http://localhost:[PUERTO]`
- [ ] Leer CLAUDE.md del proyecto
- [ ] Revisar docs/ estructura
- [ ] Verificar git: `git status`

---

## 📞 SOPORTE Y REFERENCIAS

**Centro de documentación:** `E:\git\app\docs\`

**Master Constitutional:** `E:\CLAUDE.md` (versión 5.5)

**Monorepo Orquestación:** `E:\git\CLAUDE.md` (versión 2.0)

**Librería centralizada:** `E:\lib\007 DOCUMENTACION\` (symlink a COMANDOS-MODO-PROYECTOS.md)

---

**Documento:** COMANDOS-MODO-PROYECTOS.md
**Versión:** 3.1 | **Fecha:** 2026-06-11
**Status:** ✅ CENTRALIZADO Y COMPLETO
**Total:** 44 Instrucciones/Modos documentados (+ 2 nuevos modos en diseño)

---

## 🆕 PROTOCOLO DE PUERTOS v2.0 (NUEVO - 2026-06-12)

**Status:** ✅ IMPLEMENTADO | **Impacto:** Crítico para evitar conflictos

### Cambios Principales:

1. **create-project.ps1** → Ya NO pide puertos manualmente
   - Llama automáticamente: Get-PuertoDisponible -Tipo "frontend|backend"
   - Asigna sin conflictos
   - Resultado: Proyecto listo en 30 segundos

2. **verify-ports.ps1** → Funciones mejoradas
   - Get-PuertosAsignados → Lee master.env
   - Get-PuertoDisponible → Encuentra siguientes libres
   - Asignar-PuertosAProyecto → Agrega a master.env
   - Verificar-Puertos → Verifica estado (original)

3. **assign-ports.ps1** (NUEVO) → Asignar en cualquier momento
   - . E:\scripts\assign-ports.ps1 -Proyecto "x" → Asigna
   - . E:\scripts\assign-ports.ps1 -Verificar → Ver disponibles
   - . E:\scripts\assign-ports.ps1 -Listar → Listar todos

### Documentación Completa:

- **Referencia rápida:** E:\scripts\PUERTO-PROTOCOL.md
- **Scripts:** E:\scripts\verify-ports.ps1, ssign-ports.ps1
- **Sección de este documento:** Punto 3 (arriba)

### Garantías:

✅ **NUNCA reutiliza** puertos asignados en master.env
✅ Respeta **rangos de seguridad** (3000-3999 frontend, etc)
✅ Verifica puertos en **master.env primero, luego sistema**
✅ Sistema **automático y determinístico**

**Última actualización:** 2026-06-11

---

## 📚 NUEVOS MODOS AGREGADOS (Sesión 2026-06-11)

| Modo           | Ubicación                                  | Comando                           |
| -------------- | ------------------------------------------ | --------------------------------- |
| **#paleta**    | E:\lib\007 DOCUMENTACION\MODO-PALETA.md    | Extrae colores de sitios web      |
| **#reiniciar** | E:\lib\007 DOCUMENTACION\MODO-REINICIAR.md | Reinicia servidor automáticamente |

---

**🎯 Este es el centro único de referencia para todos los comandos, instrucciones y modos de IORANA DIGITAL.**
