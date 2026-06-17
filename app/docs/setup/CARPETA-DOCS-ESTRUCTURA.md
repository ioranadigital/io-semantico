# 📚 INSTRUCCIÓN: Estructura Completa de Carpeta /docs/

**Status:** ✅ OBLIGATORIA | Versión: 1.0 | Fecha: 2026-06-11

---

## 📌 DEFINICIÓN

La carpeta `/docs/` es para **documentación operacional y de referencia** que NO es código de la herramienta.

**Ejemplos de qué va en `/docs/`:**

- ✅ Instrucciones de uso del proyecto
- ✅ Esquemas de bases de datos (para ejecutar manualmente)
- ✅ Guías de configuración
- ✅ Procesos operacionales
- ✅ Decisiones de arquitectura
- ✅ Historias de cambios
- ✅ Guías de deployment
- ✅ Reportes y análisis

**Ejemplos de qué NO va en `/docs/`:**

- ❌ Código fuente (va en `/src/`)
- ❌ Archivos de configuración (van en raíz: `tsconfig.json`, `.eslintrc.json`)
- ❌ Tests (van en `/src/` o `/tests/`)
- ❌ Node_modules (ignorados)

---

## 🗂️ ESTRUCTURA COMPLETA DE /docs/

```
docs/
├── README.md                          (Índice principal)
├── QUICK-START.md                     (Guía rápida de inicio)
│
├── setup/                             (Instalación y configuración)
│   ├── INSTALLATION.md                (Pasos de instalación)
│   ├── ENVIRONMENT-SETUP.md           (Variables de entorno)
│   ├── DATABASE-SETUP.md              (Setup de BD)
│   └── DEPENDENCIES.md                (Dependencias requeridas)
│
├── usage/                             (Cómo usar)
│   ├── USER-GUIDE.md                  (Guía de usuario)
│   ├── API-ENDPOINTS.md               (Endpoints disponibles)
│   ├── COMMANDS.md                    (Comandos disponibles)
│   └── EXAMPLES.md                    (Ejemplos de uso)
│
├── architecture/                      (Arquitectura y diseño)
│   ├── ARCHITECTURE.md                (Visión general)
│   ├── COMPONENTS.md                  (Componentes principales)
│   ├── DATA-FLOW.md                   (Flujo de datos)
│   └── DIAGRAMS.md                    (Diagramas ASCII/Mermaid)
│
├── database/                          (Información de BD)
│   ├── SCHEMA.md                      (Esquema de BD)
│   ├── MIGRATIONS.sql                 (Migraciones ejecutables)
│   ├── TABLES.md                      (Descripción de tablas)
│   └── QUERIES.sql                    (Queries útiles)
│
├── deployment/                        (Deployment e infraestructura)
│   ├── DEPLOYMENT.md                  (Guía de deployment)
│   ├── DOCKER.md                      (Instrucciones Docker)
│   ├── ENVIRONMENT-PRODUCTION.md      (Config producción)
│   ├── CI-CD.md                       (Pipelines de CI/CD)
│   └── TROUBLESHOOTING.md             (Problemas comunes)
│
├── development/                       (Desarrollo y testing)
│   ├── CONTRIBUTING.md                (Cómo contribuir)
│   ├── DEVELOPMENT.md                 (Guía de desarrollo)
│   ├── TESTING.md                     (Estrategia de tests)
│   ├── CODE-STANDARDS.md              (Estándares de código)
│   └── DEBUGGING.md                   (Guía de debugging)
│
├── changelog/                         (Historial de cambios)
│   ├── CHANGELOG.md                   (Cambios por versión)
│   ├── RELEASES.md                    (Notas de release)
│   └── MIGRATION-GUIDE.md             (Guía de actualizaciones)
│
├── operations/                        (Operaciones y mantenimiento)
│   ├── OPERATIONS-GUIDE.md            (Guía operacional)
│   ├── MONITORING.md                  (Monitoreo y alertas)
│   ├── BACKUP-RECOVERY.md             (Backups y recuperación)
│   ├── MAINTENANCE.md                 (Tareas de mantenimiento)
│   └── RUNBOOKS.md                    (Runbooks de operación)
│
├── security/                          (Seguridad)
│   ├── SECURITY-POLICY.md             (Política de seguridad)
│   ├── AUTHENTICATION.md              (Autenticación)
│   ├── AUTHORIZATION.md               (Autorización)
│   └── DATA-PROTECTION.md             (Protección de datos)
│
├── troubleshooting/                   (Solución de problemas)
│   ├── FAQ.md                         (Preguntas frecuentes)
│   ├── COMMON-ISSUES.md               (Problemas comunes)
│   └── ERROR-CODES.md                 (Códigos de error)
│
└── resources/                         (Recursos adicionales)
    ├── GLOSSARY.md                    (Glosario de términos)
    ├── REFERENCES.md                  (Enlaces y referencias)
    ├── TEMPLATES.md                   (Templates reutilizables)
    └── CHECKLISTS.md                  (Checklists operacionales)
```

---

## 📄 CONTENIDO RECOMENDADO POR CARPETA

### **docs/README.md** (ÍNDICE PRINCIPAL)

```markdown
# [PROYECTO] - Documentación

Bienvenido a la documentación de [PROYECTO].

## Inicio Rápido

- [Guía Rápida](./QUICK-START.md) - Empieza en 5 minutos
- [Instalación](./setup/INSTALLATION.md) - Setup completo

## Documentación

- [Arquitectura](./architecture/ARCHITECTURE.md)
- [Guía de Usuario](./usage/USER-GUIDE.md)
- [Desarrollo](./development/DEVELOPMENT.md)
- [Deployment](./deployment/DEPLOYMENT.md)

## Bases de Datos

- [Esquema](./database/SCHEMA.md)
- [Migraciones](./database/MIGRATIONS.sql)

## Operaciones

- [Guía Operacional](./operations/OPERATIONS-GUIDE.md)
- [Troubleshooting](./troubleshooting/COMMON-ISSUES.md)

## Historial

- [Changelog](./changelog/CHANGELOG.md)
- [Guía de Migraciones](./changelog/MIGRATION-GUIDE.md)

---

Última actualización: 2026-06-11
```

---

### **docs/setup/ENVIRONMENT-SETUP.md**

````markdown
# Configuración de Variables de Entorno

## .env.local (Desarrollo)

Crear archivo `.env.local` con:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=eyJxxx...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# API
NEXT_PUBLIC_API_URL=http://localhost:4000
API_URL=http://localhost:4000

# Redis
REDIS_URL=redis://localhost:6379

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Debug
LOG_LEVEL=debug
NODE_ENV=development
```
````

## .env.production (Producción)

Configurar en servidor de deployment:

- Vercel Environment Variables
- Hetzner .env file
- Docker secrets

---

````

---

### **docs/database/SCHEMA.md**

```markdown
# Esquema de Base de Datos

## Tablas principales

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role ENUM('admin', 'user', 'guest'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
````

### projects

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

````

---

### **docs/deployment/DEPLOYMENT.md**

```markdown
# Guía de Deployment

## Pre-deployment checklist
- [ ] Tests pasan (npm test)
- [ ] Code review aprobado
- [ ] Database migrations verificadas
- [ ] Secrets configurados en prod
- [ ] Monitoring activado

## Deploy a Vercel
```bash
git push origin main
# Vercel auto-deploya
````

## Deploy a Hetzner

```bash
ssh root@89.167.103.147
cd /app
git pull
pnpm install
pnpm build
systemctl restart app
```

---

```

---

## ✅ CHECKLIST: CREAR /docs/ EN NUEVO PROYECTO

- [ ] Crear carpeta `docs/` en raíz del proyecto
- [ ] Crear `docs/README.md` (índice)
- [ ] Crear `docs/QUICK-START.md` (inicio rápido)
- [ ] Crear carpetas:
  - [ ] docs/setup/
  - [ ] docs/usage/
  - [ ] docs/architecture/
  - [ ] docs/database/
  - [ ] docs/deployment/
  - [ ] docs/development/
  - [ ] docs/changelog/
  - [ ] docs/operations/
  - [ ] docs/security/
  - [ ] docs/troubleshooting/
  - [ ] docs/resources/
- [ ] Crear archivos mínimos en cada carpeta
- [ ] Actualizar README.md raíz para linkear a docs/

---

## 📝 REGLA IMPORTANTE

**Toda documentación debe estar en `/docs/`**

No crear:
- ❌ GUIA.md en raíz
- ❌ README-SETUP.md en raíz
- ❌ DATABASE.md en raíz

Crear en:
- ✅ docs/QUICK-START.md
- ✅ docs/setup/INSTALLATION.md
- ✅ docs/database/SCHEMA.md

---

## 🔄 CÓMO MANTENERLO ACTUALIZADO

Cada vez que hagas cambio importante:

1. ✅ Actualiza docs/changelog/CHANGELOG.md
2. ✅ Si cambio de BD: Actualiza docs/database/SCHEMA.md
3. ✅ Si cambio de API: Actualiza docs/usage/API-ENDPOINTS.md
4. ✅ Si cambio de deployment: Actualiza docs/deployment/DEPLOYMENT.md
5. ✅ Si cambio de arquitectura: Actualiza docs/architecture/ARCHITECTURE.md

**La documentación es parte del desarrollo, no algo "después"**

---

## 🎯 CONVENCIÓN

- **Nombres**: UPPERCASE-WITH-HYPHENS.md
- **Orden**: Índices primero (README.md), luego carpetas lógicas
- **Links internos**: `[Link](./path/to/file.md)`
- **Actualización**: Después de cada cambio importante
- **Revisión**: Parte del pull request review

---

**Documento:** INSTRUCCION-CARPETA-DOCS-COMPLETA.md
**Status:** ✅ OBLIGATORIA
**Criticidad:** 🟡 MEDIA
**Versión:** 1.0

```
