# 🔍 ANÁLISIS DE DEPENDENCIAS: iorana-next → iorana

**Fecha:** 2026-06-12  
**Status:** ANTES DE RENOMBRAR  
**Impacto:** ALTO - 15+ archivos/configuraciones

---

## 📊 RESUMEN EJECUTIVO

| Área                  | Riesgo     | Archivos Afectados | Impacto                                   |
| --------------------- | ---------- | ------------------ | ----------------------------------------- |
| **package.json**      | 🔴 CRÍTICO | 1                  | El nombre del proyecto cambia globalmente |
| **pnpm workspace**    | 🔴 CRÍTICO | 1                  | Monorepo podría desconectarse             |
| **Alias @iorana/lib** | 🟢 SEGURO  | 1                  | Las dependencias internas funcionan igual |
| **CLAUDE.md**         | 🟡 ALTO    | 2+                 | Referencias en documentación maestro      |
| **Deployment**        | 🟡 ALTO    | 5+                 | Docker, nginx, CI/CD scripts              |
| **Documentación**     | 🟢 BAJO    | 50+                | Referencias en docs (no críticas)         |

**CONCLUSIÓN:** Renombrable pero requiere actualizar **20+ referencias**

---

## 🔴 DEPENDENCIAS CRÍTICAS QUE SE ROMPEN

### 1. **package.json (E:\git\app\interno\iorana-next\package.json:línea 2)**

```json
"name": "iorana-next",  // ← AQUÍ DEBE CAMBIAR A "iorana"
```

**Acción:** Cambiar a `"name": "iorana"`

---

### 2. **pnpm-workspace.yaml (E:\git\pnpm-workspace.yaml)**

Contiene probable:

```yaml
packages:
  - "lib"
  - "iorana-next" # ← CAMBIAR A: 'iorana'
```

**Acción:** Cambiar `iorana-next` a `iorana`

---

### 3. **Renombrar Carpeta Física**

`E:\git\app\interno\iorana-next` → `E:\git\app\interno\iorana`

---

## 🟡 ARCHIVOS A ACTUALIZAR

### **CRÍTICOS (no funcionará sin estos):**

1. `E:\git\app\interno\iorana-next\package.json` (línea 2)
2. `E:\git\pnpm-workspace.yaml` (referencia del package)
3. `E:\git\CLAUDE.md` (referencias de orquestación)
4. `E:\deployment\docker-compose.yml` (servicio "iorana-next")
5. `E:\deployment\nginx.conf` (virtual hosts)
6. `E:\master.env` (IORANA*NEXT*\* variables)

### **ALTO RIESGO (scripts de deployment):**

7. `E:\deployment\.github\workflows\*.yml` (si existen)
8. `E:\deployment\Deploy.ps1`
9. `E:\deployment\traefik\routing.yml` (si existe)

### **BAJO RIESGO (documentación):**

10. `E:\CLAUDE.md` (maestro)
11. `E:\lib\005-Skills\*.md` (referencias)
12. `E:\lib\007 DOCUMENTACION\*.md` (ejemplos)

---

## ✅ PLAN DE ACCIÓN

### **PASO 1: Respaldar (OBLIGATORIO)**

```
cp -r E:\git\app\interno\iorana-next E:\git\app\interno\iorana-next-backup-20260612
```

### **PASO 2: Actualizar 6 Archivos Críticos**

- [ ] package.json: cambiar "name"
- [ ] pnpm-workspace.yaml: cambiar "iorana-next" a "iorana"
- [ ] CLAUDE.md maestro: actualizar referencia
- [ ] docker-compose.yml: cambiar servicio
- [ ] nginx.conf: cambiar dominio
- [ ] master.env: cambiar variables IORANA*NEXT*_ a IORANA\__

### **PASO 3: Renombrar Carpeta**

```
mv E:\git\app\interno\iorana-next E:\git\app\interno\iorana
```

### **PASO 4: Validar**

```bash
cd E:\git\app\interno\iorana
pnpm install        # Debe funcionar sin errores
tsc --noEmit        # TypeScript validation
pnpm run build      # Build completo

cd E:\git\
pnpm install        # Monorepo validation
pnpm run build      # Build topológico
```

### **PASO 5: Commit**

```bash
git add -A
git commit -m "refactor: rename iorana-next → iorana

- Renamed project directory
- Updated package.json name
- Updated pnpm-workspace.yaml
- Updated deployment configs
- Updated master.env variables

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## 🚨 RIESGOS SI NO SE ACTUALIZA TODO

| No actualizar            | Síntoma                            | Severidad  |
| ------------------------ | ---------------------------------- | ---------- |
| **package.json**         | `pnpm install` falla               | 🔴 CRÍTICO |
| **pnpm-workspace.yaml**  | Workspace no reconoce el proyecto  | 🔴 CRÍTICO |
| **docker-compose.yml**   | Contenedor no inicia               | 🔴 CRÍTICO |
| **master.env variables** | Puertos no asignados correctamente | 🟡 ALTO    |
| **nginx.conf**           | Routing falla                      | 🟡 ALTO    |
| **Documentación**        | Desactualizada (no afecta función) | 🟢 BAJO    |

---

## ✅ CHECKLIST ANTES DE PROCEDER

- [ ] ¿Leíste E:\git\pnpm-workspace.yaml completamente?
- [ ] ¿Verificaste E:\master.env?
- [ ] ¿Revisaste E:\deployment\docker-compose.yml?
- [ ] ¿Hiciste backup de iorana-next?
- [ ] ¿Confirmó el usuario que quiere renombrar?

---

**Status:** ✅ LISTO PARA EJECUTAR UNA VEZ CONFIRMADO
