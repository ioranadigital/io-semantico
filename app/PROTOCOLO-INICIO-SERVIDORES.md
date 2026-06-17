# 🚀 PROTOCOLO: Inicio Seguro de Servidores (Master.env Aware)

**Status:** ✅ OBLIGATORIO | Versión: 1.0 | Fecha: 2026-06-10

---

## ⚠️ PROBLEMA IDENTIFICADO

Cada vez que se reinicia un proyecto:

- ❌ NO leo master.env
- ❌ Asigno puertos que ya están en uso
- ❌ Inicia procesos duplicados
- ❌ Causa conflictos de puerto

**Resultado:** Servidores no funcionan correctamente.

---

## ✅ SOLUCIÓN: PROTOCOLO OBLIGATORIO

**ANTES de iniciar CUALQUIER servidor, SIEMPRE:**

### **Paso 1: LEER master.env**

```
1. Abro: E:\master.env
2. Extraigo TODOS los puertos definidos
3. Leo: [PROYECTO]_BACKEND_PORT, [PROYECTO]_FRONTEND_PORT
4. Almaceno en memoria (NO crear puertos nuevos)
```

**Puertos en master.env (2026-06-10):**

```
- 3000   = Main app (PORT)
- 3002   = io-semantico frontend
- 3003   = io-neruda frontend
- 3004   = io-prospector frontend
- 4000   = io-semantico backend
- 4005   = io-neruda backend
- 4006   = io-prospector backend
- 5000   = io-semantico python
- 6379   = Redis
```

### **Paso 2: VERIFICAR PUERTOS EN USO**

```
Para CADA puerto en master.env:
  1. Ejecutar: netstat -ano | findstr :[puerto]
  2. Si puerto OCUPADO:
     a. Traer el PID del proceso
     b. Verificar si es el proceso correcto
     c. Si SÍ → Usar proceso existente (NO reiniciar)
     d. Si NO → Matar proceso y reiniciar
  3. Si puerto LIBRE:
     a. Iniciar servidor en ese puerto
```

### **Paso 3: INICIAR SERVIDOR CORRECTAMENTE**

```
Para proyecto [NOMBRE]:
  1. Leer: [NOMBRE]_BACKEND_PORT de master.env
  2. Leer: [NOMBRE]_FRONTEND_PORT de master.env
  3. Ejecutar: pnpm dev --port [NUMERO_EXACTO]
  4. NO usar puerto automático (evita conflictos)
  5. Reportar: ✅ Servidor iniciado en puerto [NUMERO] (de master.env)
```

### **Paso 4: REGISTRAR ESTADO**

```
Crear/Actualizar: E:\git\[PROYECTO]\.server-status.json
{
  "nombre": "[PROYECTO]",
  "estado": "running" | "stopped",
  "puerto_frontend": 3004,
  "puerto_backend": 4006,
  "pid": 12345,
  "iniciado": "2026-06-10T15:30:00Z",
  "maestro_env_checked": true
}
```

---

## 📋 PSEUDOCÓDIGO CORRECTO

```bash
# FUNCIÓN: IniciarServidor(proyecto)

FUNCTION IniciarServidor(proyecto)

  // PASO 1: Leer master.env
  SET masterEnv = LEER("E:\master.env")
  SET puerto_frontend = EXTRAER(masterEnv, f"{proyecto.upper()}_FRONTEND_PORT")
  SET puerto_backend = EXTRAER(masterEnv, f"{proyecto.upper()}_BACKEND_PORT")

  IF puerto_frontend ES NULO THEN
    ERROR("Puerto no definido en master.env para {proyecto}")
    RETURN
  END IF

  // PASO 2: Verificar puertos en uso
  SET puerto_front_usado = VERIFICAR_PUERTO(puerto_frontend)
  SET puerto_back_usado = VERIFICAR_PUERTO(puerto_backend)

  IF puerto_front_usado THEN
    SET pid = OBTENER_PID(puerto_frontend)
    IF VERIFICAR_PROCESO(pid) ES CORRECTO THEN
      REPORTAR(f"Puerto {puerto_frontend} ya en uso (OK)")
      SKIP
    ELSE
      MATAR_PROCESO(pid)
    END IF
  END IF

  // PASO 3: Iniciar servidor
  EJECUTAR(f"pnpm dev --port {puerto_frontend}")
  EJECUTAR(f"pnpm dev --port {puerto_backend}")

  // PASO 4: Registrar estado
  GUARDAR(".server-status.json", {
    estado: "running",
    puerto_frontend: puerto_frontend,
    puerto_backend: puerto_backend,
    iniciado: TIMESTAMP()
  })

  REPORTAR(f"✅ {proyecto} iniciado en puertos {puerto_frontend}/{puerto_backend}")

END FUNCTION
```

---

## 🔧 FLUJO CORRECTO DE INICIO

### **Cuando usuario dice: "Inicia los servidores"**

```
1. Claude Lee: E:\master.env
   ↓
2. Extrae puertos:
   - io-semantico: 3002/4000/5000
   - io-neruda: 3003/4005
   - io-prospector: 3004/4006
   ↓
3. Verifica cada puerto:
   ✓ 3002 LIBRE → Iniciará io-semantico frontend
   ✓ 3003 OCUPADO (PID 5432) → Ya está corriendo (OK)
   ✓ 3004 LIBRE → Iniciará io-prospector frontend
   ✓ 4000 OCUPADO (PID 3456) → Ya está corriendo (OK)
   ✓ 4005 LIBRE → Iniciará io-neruda backend
   ✓ 4006 LIBRE → Iniciará io-prospector backend
   ✓ 5000 OCUPADO (PID 8901) → KILLER (no es Python correcto)
   ↓
4. Inicia solo los faltantes
   ↓
5. Reporta:
   ✅ io-semantico: 3002 (ya corriendo), 4000 (ya corriendo), 5000 (reiniciado)
   ✅ io-neruda: 3003 (ya corriendo), 4005 (iniciado)
   ✅ io-prospector: 3004 (iniciado), 4006 (iniciado)

   RESUMEN: 3 servidores ya corriendo, 4 iniciados nuevos
```

---

## ❌ ERRORES A EVITAR

```
MALO:
- Asumir puerto 3000 está libre
- Iniciar sin leer master.env
- Reiniciar servidor si ya está corriendo
- Asignar puerto automático (3001, 3005, etc)
- No verificar procesos existentes

CORRECTO:
✅ SIEMPRE leer master.env PRIMERO
✅ SIEMPRE verificar puerto antes de iniciar
✅ SIEMPRE reutilizar proceso si existe
✅ SIEMPRE usar puerto exacto de master.env
✅ SIEMPRE registrar estado en .server-status.json
```

---

## 📁 REGISTRO DE ESTADO

Crear en CADA proyecto:

**E:\git\[PROYECTO]\.server-status.json**

```json
{
  "nombre": "io-semantico",
  "estado": "running",
  "puertos": {
    "frontend": 3002,
    "backend": 4000,
    "python": 5000
  },
  "procesos": {
    "frontend_pid": 12345,
    "backend_pid": 12346,
    "python_pid": 12347
  },
  "iniciado": "2026-06-10T15:30:00Z",
  "maestro_env_consultado": "2026-06-10T15:30:00Z",
  "última_verificación": "2026-06-10T15:35:00Z"
}
```

---

## 🚨 PROTOCOLO: MATAR PROCESOS OBSOLETOS

Si un proceso está usando puerto pero es obsoleto:

```bash
# Obtener PID
netstat -ano | findstr :3002
# Output: TCP    0.0.0.0:3002    0.0.0.0:0    LISTENING    5432

# Matar proceso
taskkill /PID 5432 /F

# Iniciar correcto
pnpm dev --port 3002
```

---

## ✅ CHECKLIST: ANTES DE INICIAR SERVIDOR

- [ ] ¿Leí E:\master.env?
- [ ] ¿Extraje los puertos correctos?
- [ ] ¿Verifiqué qué puertos están en uso?
- [ ] ¿Verifiqué qué procesos están corriendo?
- [ ] ¿Voy a reutilizar proceso existente SI es correcto?
- [ ] ¿Voy a matar proceso SI es incorrecto?
- [ ] ¿Voy a iniciar servidor en puerto EXACTO de master.env?
- [ ] ¿Voy a registrar estado en .server-status.json?
- [ ] ¿Voy a reportar puertos y PIDs iniciados?

**Si respondiste "NO" a cualquiera → DETENTE Y CORRIGE**

---

## 🎯 RESULTADO ESPERADO

Cuando ejecutes "Inicia los servidores":

```
✅ Leyendo master.env...
✅ Puertos encontrados:
   - io-semantico: 3002 (frontend), 4000 (backend), 5000 (python)
   - io-neruda: 3003 (frontend), 4005 (backend)
   - io-prospector: 3004 (frontend), 4006 (backend)

✅ Verificando puertos...
   - 3002: LIBRE → Iniciando
   - 3003: OCUPADO (PID 5432) ✓ Correcto → Reutilizando
   - 3004: LIBRE → Iniciando
   - 4000: OCUPADO (PID 5433) ✓ Correcto → Reutilizando
   - 4005: LIBRE → Iniciando
   - 4006: LIBRE → Iniciando
   - 5000: OCUPADO (PID 5434) ✗ INCORRECTO → Matando

✅ RESULTADO:
   - Servidores corriendo: 2 (io-neruda, io-semantico)
   - Servidores iniciados: 2 nuevos (io-prospector, io-neruda-backend)
   - Puertos correctos: Todos
   - SIN DUPLICACIÓN de puertos
   - SIN CONFLICTOS

🎉 Todos los servidores listos en puertos correctos
```

---

**Documento:** PROTOCOLO-INICIO-SERVIDORES.md
**Status:** ✅ OBLIGATORIO
**Aplicación:** Todos los proyectos
**Versión:** 1.0
