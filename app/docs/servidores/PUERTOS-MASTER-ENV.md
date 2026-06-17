# 🖥️ REFERENCIA: Puertos Definidos en master.env

**Status:** ✅ REFERENCIA | Versión: 1.0 | Fecha: 2026-06-11

---

## 📋 TABLA DE PUERTOS

Todos los puertos están definidos centralmente en: `E:\master.env`

| Puerto   | Servicio            | Proyecto      | Tipo        | Status    |
| -------- | ------------------- | ------------- | ----------- | --------- |
| **3000** | Main App            | [Global]      | Frontend    | ✅ Activo |
| **3002** | Semantic Frontend   | io-semantico  | Frontend    | ✅ Activo |
| **3003** | Neruda Frontend     | io-neruda     | Frontend    | ✅ Activo |
| **3004** | Prospector Frontend | io-prospector | Frontend    | ✅ Activo |
| **4000** | Semantic Backend    | io-semantico  | Backend API | ✅ Activo |
| **4005** | Neruda Backend      | io-neruda     | Backend API | ✅ Activo |
| **4006** | Prospector Backend  | io-prospector | Backend API | ✅ Activo |
| **5000** | Semantic Python     | io-semantico  | Python      | ✅ Activo |
| **6379** | Redis               | [Global]      | Cache       | ✅ Activo |

---

## 🔍 MAPEO: PROYECTO → PUERTOS

### **io-semantico**

```
io-semantico_FRONTEND_PORT = 3002
io-semantico_BACKEND_PORT = 4000
io-semantico_PYTHON_PORT = 5000
```

### **io-neruda**

```
io-neruda_FRONTEND_PORT = 3003
io-neruda_BACKEND_PORT = 4005
```

### **io-prospector**

```
io-prospector_FRONTEND_PORT = 3004
io-prospector_BACKEND_PORT = 4006
```

### **Global Services**

```
PORT = 3000 (Main app)
REDIS_PORT = 6379
```

---

## 📍 ESTRUCTURA EN master.env

```env
# --- PUERTOS PRINCIPALES
PORT=3000
REDIS_PORT=6379

# --- IO-SEMANTICO
IO_SEMANTICO_FRONTEND_PORT=3002
IO_SEMANTICO_BACKEND_PORT=4000
IO_SEMANTICO_PYTHON_PORT=5000
IO_SEMANTICO_ENV=development

# --- IO-NERUDA
IO_NERUDA_FRONTEND_PORT=3003
IO_NERUDA_BACKEND_PORT=4005
IO_NERUDA_ENV=development

# --- IO-PROSPECTOR
IO_PROSPECTOR_FRONTEND_PORT=3004
IO_PROSPECTOR_BACKEND_PORT=4006
IO_PROSPECTOR_ENV=development
```

---

## ⚠️ REGLA CRÍTICA

**NUNCA CAMBIES ESTOS PUERTOS SIN:**

1. ✅ Actualizar E:\master.env
2. ✅ Verificar que el nuevo puerto esté LIBRE
3. ✅ Actualizar .env.local de cada proyecto
4. ✅ Matar procesos antiguos en puerto viejo
5. ✅ Reiniciar servidor en puerto nuevo
6. ✅ Documentar el cambio (fecha, razón)

---

## 🔄 CÓMO VERIFICAR PUERTOS EN USO

### **PowerShell - Ver puertos ocupados**

```powershell
netstat -ano | findstr :3002
```

### **Ejecutar verify-ports.ps1**

```powershell
. E:\scripts\verify-ports.ps1
```

**Resultado:**

```
🔴 Puerto 3002: OCUPADO (PID: 5432)
🟢 Puerto 3003: LIBRE
🔴 Puerto 3004: OCUPADO (PID: 5433)
...etc
```

---

## 🚀 CÓMO INICIAR CON PUERTO CORRECTO

**NO HAGAS:**

```bash
pnpm dev              # Usa puerto automático (MALO)
pnpm dev --port 3001  # Usa puerto incorrecto (MALO)
```

**HAZ:**

```bash
# Leer master.env
# Extraer: IO_SEMANTICO_FRONTEND_PORT=3002

# Iniciar con puerto EXACTO
pnpm dev --port 3002  # ✅ CORRECTO
```

---

## 🛑 CONFLICTOS DE PUERTO: CÓMO RESOLVER

### **Escenario 1: Puerto ocupado por proceso correcto**

```
Problema: Puerto 3002 ya está en uso
Proceso: Next.js server (correcto)

Solución: Reutilizar puerto, no reiniciar
Acción: SKIP - ya está corriendo correctamente
```

### **Escenario 2: Puerto ocupado por proceso incorrecto**

```
Problema: Puerto 3002 en uso por proceso viejo/incorrecto
Proceso: Old Node.js instance

Solución: Matar proceso y reiniciar correcto
Acciones:
  1. taskkill /PID 5432 /F
  2. pnpm dev --port 3002
```

### **Escenario 3: Puerto libre**

```
Problema: Puerto 3002 está libre (servidor no corriendo)

Solución: Iniciar servidor
Acción: pnpm dev --port 3002
```

---

## 📊 ESTADO ACTUAL (2026-06-11)

Última verificación de puertos:

| Puerto | Servicio              | Estado       | Nota                 |
| ------ | --------------------- | ------------ | -------------------- |
| 3000   | Main                  | ✅ Activo    | Esperando activación |
| 3002   | io-semantic (front)   | ⏸️ Parado    | Listo para iniciar   |
| 3003   | io-neruda (front)     | ✅ Corriendo | PID: [unknown]       |
| 3004   | io-prospector (front) | ⏸️ Parado    | Listo para iniciar   |
| 4000   | io-semantic (back)    | ✅ Corriendo | PID: [unknown]       |
| 4005   | io-neruda (back)      | ⏸️ Parado    | Listo para iniciar   |
| 4006   | io-prospector (back)  | ⏸️ Parado    | Listo para iniciar   |
| 5000   | io-semantic (python)  | ⏸️ Parado    | Listo para iniciar   |
| 6379   | Redis                 | ✅ Activo    | En uso               |

---

## 🎯 ACCIONES RÁPIDAS

### **Ver todos los puertos en uso**

```powershell
netstat -ano | findstr LISTENING
```

### **Ver proceso específico**

```powershell
# Puerto 3002
netstat -ano | findstr :3002

# Obtener info del PID
Get-Process -Id [PID]
```

### **Matar proceso por PID**

```powershell
taskkill /PID [PID] /F
```

### **Ver puertos en uso vs. disponibles**

```powershell
. E:\scripts\verify-ports.ps1
```

---

## 📌 NOTAS IMPORTANTES

- ✅ Los puertos están centralizados en E:\master.env
- ✅ SIEMPRE leer master.env antes de iniciar servidores
- ✅ SIEMPRE verificar puerto disponible antes de iniciar
- ✅ NUNCA cambiar puertos sin actualizar master.env
- ✅ NUNCA asumir puerto automático (3001, 3005, etc)

---

**Documento:** PUERTOS-MASTER-ENV.md
**Status:** ✅ REFERENCIA
**Criticidad:** 🟡 MEDIA
**Última actualización:** 2026-06-11
