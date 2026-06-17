# ⚡ INSTRUCCIÓN OBLIGATORIA: Leer Master.env al iniciar servidores

**Status:** ✅ CRÍTICA | Versión: 1.0 | Fecha: 2026-06-10

---

## 📌 INSTRUCCIÓN GLOBAL

**Cada vez que voy a iniciar servidores o procesos:**

```
1. ANTES de hacer nada → LEER E:\master.env
2. EXTRAER puertos definidos para CADA servicio
3. VERIFICAR qué puertos están en uso
4. REUTILIZAR procesos existentes (NO reiniciar)
5. INICIAR solo los que faltan
6. REPORTAR puertos exactos usados
```

---

## 🔍 PALABRAS CLAVE QUE ACTIVAN ESTO

Si el usuario dice CUALQUIERA de estas frases:

- "Inicia los servidores"
- "Arranca el servidor"
- "Levanta los servicios"
- "Comienza los procesos"
- "Activa los backends"
- "#devstart"
- "Necesito los servidores corriendo"
- "¿Están los servidores arriba?"

**ACCIÓN AUTOMÁTICA:** Leer master.env PRIMERO

---

## 📋 FLUJO EXACTO

```
Usuario: "Inicia los servidores"

┌─────────────────────────────────────────┐
│ PASO 1: LEER E:\master.env              │
│ (OBLIGATORIO - NO SALTAR)               │
│                                         │
│ Extraer:                                │
│ - IO_SEMANTICO_FRONTEND_PORT = 3002    │
│ - IO_SEMANTICO_BACKEND_PORT = 4000     │
│ - IO_NERUDA_FRONTEND_PORT = 3003       │
│ - IO_NERUDA_BACKEND_PORT = 4005        │
│ - IO_PROSPECTOR_FRONTEND_PORT = 3004   │
│ - IO_PROSPECTOR_BACKEND_PORT = 4006    │
│ - IO_SEMANTICO_PYTHON_PORT = 5000      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ PASO 2: VERIFICAR PUERTOS EN USO        │
│ (ejecutar: verify-ports.ps1)            │
│                                         │
│ Para CADA puerto:                       │
│ - netstat -ano | findstr :[PUERTO]      │
│ - ¿En uso? SÍ/NO                        │
│ - Si SÍ → ¿Proceso correcto? SÍ/NO      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ PASO 3: INICIAR SERVIDORES NECESARIOS   │
│                                         │
│ - No reiniciar si ya está corriendo     │
│ - Iniciar SOLO los faltantes            │
│ - Usar puerto EXACTO de master.env      │
│ - NO usar puerto automático             │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ PASO 4: REPORTAR ESTADO                 │
│                                         │
│ ✅ Puerto 3002 (io-semantico): CORRIENDO
│ ✅ Puerto 3003 (io-neruda): CORRIENDO
│ ✅ Puerto 3004 (io-prospector): INICIADO
│ ...etc...                               │
└─────────────────────────────────────────┘
```

---

## ⚠️ VALIDACIÓN PRE-INICIO

ANTES de iniciar servidor, SIEMPRE verifico:

```
[ ] ¿Leí master.env? (E:\master.env)
[ ] ¿Extraje puerto correcto? (Busqué [PROYECTO]_*_PORT)
[ ] ¿Verifiqué si puerto está en uso? (netstat -ano)
[ ] ¿El proceso en ese puerto es correcto? (¿Es el servidor que espero?)
[ ] ¿Voy a reutilizar si ya existe? (NO reiniciar)
[ ] ¿Voy a usar puerto EXACTO de master.env? (NO automático)

SI FALTA CUALQUIERA → DETENER y VERIFICAR
```

---

## 🛑 PREVENCIÓN DE DUPLICACIÓN

**Por qué ocurre la duplicación:**

1. No leo master.env
2. Asumo puerto automático (3001, 3005, etc)
3. Vuelvo a iniciar servidor que ya corre
4. Se crean procesos duplicados en puertos que sí existen

**Cómo prevenirlo:**

1. Leer master.env SIEMPRE (primero)
2. Verificar puerto antes de iniciar
3. Reutilizar proceso si ya está corriendo
4. Usar puerto EXACTO de master.env

---

## 📌 INTEGRACIÓN EN CLAUDE.md

Esta instrucción debe estar en TODOS los CLAUDE.md:

```markdown
---

## INSTRUCCIÓN CRÍTICA: Master.env para servidores

CADA VEZ que inicie servidores:
1. LEER: E:\master.env
2. EXTRAER puertos ([PROYECTO]_*_PORT)
3. VERIFICAR con: . E:\scripts\verify-ports.ps1
4. REUTILIZAR procesos existentes
5. INICIAR solo los faltantes
6. USAR puerto EXACTO de master.env

Protocolo completo: E:\git\app\PROTOCOLO-INICIO-SERVIDORES.md

---
```

---

## 🚀 COMANDO RÁPIDO DE VERIFICACIÓN

Si dudas sobre puertos, ejecuta:

```powershell
# En PowerShell:
. E:\scripts\verify-ports.ps1

# Resultado: Muestra qué puertos están libres/ocupados
```

---

## 📋 MAPEO: Proyectos → Puertos

```
io-semantico
├── Frontend: 3002 (master.env)
├── Backend: 4000 (master.env)
└── Python: 5000 (master.env)

io-neruda
├── Frontend: 3003 (master.env)
└── Backend: 4005 (master.env)

io-prospector
├── Frontend: 3004 (master.env)
└── Backend: 4006 (master.env)

otros
├── Main: 3000 (master.env)
└── Redis: 6379 (master.env)
```

**NUNCA CAMBIAR ESTOS PUERTOS SIN ACTUALIZAR MASTER.ENV**

---

## ❌ ERRORES COMUNES A EVITAR

```
MALO:
❌ "Voy a iniciar en puerto 3001"
   → Usar 3002 (de master.env)

❌ "Asumiré que puerto 3000 está libre"
   → Verificar primero con netstat

❌ "Reinicio el servidor aunque ya está corriendo"
   → Reutilizar proceso existente

❌ "No leo master.env, uso puerto automático"
   → LEER SIEMPRE master.env primero

CORRECTO:
✅ Leer master.env
✅ Extraer puerto exacto
✅ Verificar si está en uso
✅ Reutilizar o iniciar según corresponda
✅ Reportar puerto exacto usado
```

---

## 🎯 CHECKLIST FINAL

Antes de reportar "Servidores iniciados":

- [ ] ¿Leí E:\master.env?
- [ ] ¿Extraje TODOS los puertos?
- [ ] ¿Verifiqué con verify-ports.ps1?
- [ ] ¿Maté procesos duplicados/incorrectos?
- [ ] ¿Reuticé procesos correctos que ya corren?
- [ ] ¿Inicié solo los faltantes?
- [ ] ¿Reporté puertos EXACTOS de master.env?
- [ ] ¿NO hay duplicación de puertos?

**Si respondiste "NO" a cualquiera: NO REPORTAR COMO "LISTO"**

---

**Documento:** INSTRUCCION-LEER-MASTER-ENV.md
**Status:** ✅ OBLIGATORIA
**Criticidad:** 🔴 ALTA
**Aplicación:** Todos los proyectos
**Versión:** 1.0
