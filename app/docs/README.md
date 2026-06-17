# 📚 Documentación - E:\git\app\docs\

**Centro centralizado de instrucciones, protocolos y guías para crear y mantener proyectos.**

**Versión:** 1.0 | Fecha: 2026-06-11 | Status: ✅ Operacional

---

## 📋 Índice de Documentación

### 🚀 **SETUP - Crear Nuevo Proyecto** (`/setup/`)

Instrucciones para crear proyectos nuevos desde cero.

| Documento                                                           | Descripción                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ⚡ [QUICK-START-NEW-PROJECT.md](./setup/QUICK-START-NEW-PROJECT.md) | **EMPEZAR AQUÍ:** Crear proyecto en 30 segundos con script automático |
| [CREAR-NUEVO-PROYECTO.md](./setup/CREAR-NUEVO-PROYECTO.md)          | Guía completa: manual + script automático + variables + deps + git    |
| [ARCHIVOS-CONFIGURACION.md](./setup/ARCHIVOS-CONFIGURACION.md)      | 10 archivos de config (.gitignore, .env.example, tsconfig.json, etc)  |
| [CARPETA-DOCS-ESTRUCTURA.md](./setup/CARPETA-DOCS-ESTRUCTURA.md)    | Cómo estructurar /docs/ operacional (instrucciones, BD, deployment)   |

---

### 📖 **PROTOCOLOS - Comportamientos Globales** (`/protocoles/`)

Reglas y protocolos que aplican a TODOS los proyectos.

| Documento                                                                                 | Descripción                                                               |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [ALMACENAMIENTO-ARCHIVOS-GENERADOS.md](./protocoles/ALMACENAMIENTO-ARCHIVOS-GENERADOS.md) | Dónde guardar archivos generados: docs/instructions/, docs/database/, etc |
| [LEER-MASTER-ENV.md](./protocoles/LEER-MASTER-ENV.md)                                     | OBLIGATORIO: Leer E:\master.env al iniciar servidores, verificar puertos  |
| [INICIO-SERVIDORES.md](./protocoles/INICIO-SERVIDORES.md)                                 | Protocolo detallado para iniciar servidores sin duplicar puertos          |

---

### 🔧 **MODOS - Funcionalidades Especiales** (`/modos/`)

Modos automáticos que Claude Code reconoce por palabras clave.

| Documento                                    | Descripción                                        |
| -------------------------------------------- | -------------------------------------------------- |
| [MODO-LIMPIEZA.md](./modos/MODO-LIMPIEZA.md) | #limpieza: Detectar y borrar archivos innecesarios |

---

### 🖥️ **SERVIDORES - Gestión de Puertos** (`/servidores/`)

Información sobre puertos y cómo iniciar servidores correctamente.

| Documento                                                   | Descripción                                               |
| ----------------------------------------------------------- | --------------------------------------------------------- |
| [PUERTOS-MASTER-ENV.md](./servidores/PUERTOS-MASTER-ENV.md) | Referencia de puertos definidos en E:\master.env          |
| [VERIFY-PORTS.ps1](./servidores/VERIFY-PORTS.ps1)           | Script PowerShell para verificar qué puertos están en uso |

---

### 💾 **ARCHIVOS GENERADOS - Dónde Guardar** (`/archivo-generado/`)

Protocolo para guardar archivos que genera Claude Code (no código).

| Documento                                                     | Descripción                                        |
| ------------------------------------------------------------- | -------------------------------------------------- |
| [PROTOCOLO-GLOBAL.md](./archivo-generado/PROTOCOLO-GLOBAL.md) | Regla: todos los archivos generados → docs/[tipo]/ |

---

### 👨‍💻 **DESARROLLO - Guías de Desarrollo** (`/desarrollo/`)

Instrucciones para desarrolladores.

| Documento         | Descripción                               |
| ----------------- | ----------------------------------------- |
| (En construcción) | Guías sobre cómo trabajar con la codebase |

---

### 💾 **ARCHIVO GENERADO - Protocolo de Almacenamiento** (`/archivo-generado/`)

Protocolo global para guardar archivos generados.

| Documento                                                     | Descripción                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [PROTOCOLO-GLOBAL.md](./archivo-generado/PROTOCOLO-GLOBAL.md) | Cómo y dónde guardar archivos generados (instrucciones, SQL, análisis) |

---

### 🔧 **MODOS - Funcionalidades Especiales** (`/modos/`)

Modos automáticos que Claude Code reconoce.

| Documento                                    | Descripción                                                           |
| -------------------------------------------- | --------------------------------------------------------------------- |
| [MODO-LIMPIEZA.md](./modos/MODO-LIMPIEZA.md) | #limpieza: Limpiar proyecto de archivos innecesarios inteligentemente |

---

## 🎯 Cómo Usar Esta Documentación

### **Para crear un NUEVO PROYECTO:**

1. Lee: `/setup/CREAR-NUEVO-PROYECTO.md`
2. Luego: `/setup/ARCHIVOS-CONFIGURACION.md`
3. Finalmente: `/setup/CARPETA-DOCS-ESTRUCTURA.md`

### **Para INICIAR SERVIDORES:**

1. Lee: `/protocoles/LEER-MASTER-ENV.md`
2. Referencia: `/servidores/PUERTOS-MASTER-ENV.md`
3. Ejecuta: `/servidores/VERIFY-PORTS.ps1`

### **PROTOCOLOS QUE SIEMPRE SE APLICAN:**

- 📖 `/protocoles/ALMACENAMIENTO-ARCHIVOS-GENERADOS.md` - Dónde guardar archivos
- 📖 `/protocoles/LEER-MASTER-ENV.md` - Leer master.env SIEMPRE
- 📖 `/protocoles/INICIO-SERVIDORES.md` - Cómo iniciar sin conflictos

---

## 📊 Estructura de Carpetas

```
E:\git\app\docs\
├── README.md (este archivo)
├── setup/
│   ├── CREAR-NUEVO-PROYECTO.md
│   ├── ARCHIVOS-CONFIGURACION.md
│   └── CARPETA-DOCS-ESTRUCTURA.md
├── protocoles/
│   ├── ALMACENAMIENTO-ARCHIVOS-GENERADOS.md
│   ├── LEER-MASTER-ENV.md
│   └── INICIO-SERVIDORES.md
├── modos/
│   └── MODO-LIMPIEZA.md
├── servidores/
│   ├── PUERTOS-MASTER-ENV.md
│   └── VERIFY-PORTS.ps1
├── archivo-generado/
│   └── PROTOCOLO-GLOBAL.md
└── desarrollo/
    └── (futuras guías de desarrollo)
```

---

## 🔄 Cómo Agregar Nuevas Instrucciones

1. **Determina la categoría:** setup, protocoles, modos, servidores, archivo-generado, desarrollo
2. **Crea el archivo:** `E:\git\app\docs\[categoria]\NOMBRE.md`
3. **Actualiza este README:** Agrega fila a la tabla correspondiente
4. **Actualiza CLAUDE.md:** Agrega referencia en todos los 19 CLAUDE.md

---

## ✅ Status de Documentación

| Área               | Status             | Documentos        |
| ------------------ | ------------------ | ----------------- |
| Setup              | ✅ Completo        | 3 instrucciones   |
| Protocolos         | ✅ Completo        | 3 protocolos      |
| Modos              | ✅ Completo        | 1 modo            |
| Servidores         | ✅ Completo        | 3 archivos        |
| Archivos Generados | ✅ Completo        | 1 protocolo       |
| Desarrollo         | ⏳ En construcción | 0 guías           |
| **TOTAL**          | **✅ OPERACIONAL** | **11 documentos** |

---

## 📌 Notas Importantes

- **Todas las instrucciones están aquí**: No hay instrucciones sueltas en E:\git\app\
- **Ubicación única**: E:\git\app\docs\ es la fuente única de verdad
- **Actualización**: Cuando agregues instrucción nueva:
  1. Créala en la carpeta apropiada
  2. Actualiza este README.md
  3. Actualiza referencias en CLAUDE.md (19 proyectos)
- **Versionado**: Todo está versionado en git

---

**Documentación centralizada, organizada y versionada.**

**Última actualización:** 2026-06-11
