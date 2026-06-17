# 🏗️ ESGARDEN PILOT DATA - GUÍA DE IMPORTACIÓN

**Fecha:** 2026-06-12  
**Cliente:** ESGARDEN (Barbacoas y Parrillas)  
**Data:** 1 Cliente + 18 Keywords + 69 URLs

---

## 📊 RESUMEN DE DATOS

| Elemento         | Cantidad              | Detalles                          |
| ---------------- | --------------------- | --------------------------------- |
| **Clientes**     | 1                     | ESGARDEN                          |
| **Keywords**     | 18                    | Distribuidas en 5 niveles (L1-L5) |
| **URLs**         | 69                    | Clasificadas por tipología        |
| **Asignaciones** | Preparadas para crear | Pending                           |

---

## 🎯 ESTRUCTURA DE KEYWORDS (18 Total)

### Level 1: Core/Brand (2)

- `barbacoas` (Vol: 8.9k, Diff: 45)
- `esgarden barbacoas` (Vol: 320, Diff: 15)

### Level 2: Segmentación (2)

- `barbacoas gas` (Vol: 1.2k, Diff: 55)
- `parrillas carbón` (Vol: 890, Diff: 60)

### Level 3: Educacional (4)

- `cómo usar barbacoa` (Vol: 650, Diff: 35)
- `limpieza barbacoa` (Vol: 420, Diff: 30)
- `mantenimiento parrilla` (Vol: 380, Diff: 28)
- `recipes barbacoa` (Vol: 1.1k, Diff: 40)

### Level 4: Comparativo (3)

- `barbacoa gas vs carbón` (Vol: 560, Diff: 42)
- `mejores barbacoas` (Vol: 1.8k, Diff: 65)
- `barbacoa portatil` (Vol: 420, Diff: 50)

### Level 5: Long-tail (5)

- `barbacoa acero inoxidable` (Vol: 280, Diff: 48)
- `parrilla infrarrojo` (Vol: 150, Diff: 55)
- `fundas barbacoa impermeable` (Vol: 190, Diff: 38)
- `accesorios barbacoa premium` (Vol: 220, Diff: 45)
- `ropa protección barbacoa` (Vol: 110, Diff: 40)

---

## 📍 ESTRUCTURA DE URLs (69 Total)

### Por Tipología:

- **home** (1): Homepage principal
- **categoria** (14): Categorías y subcategorías
- **producto** (30): Páginas de productos
- **blog** (15): Posts del blog
- **landing** (7): Landing pages de promociones
- **estatico** (2): Páginas de soporte (contacto, FAQ)

### Ejemplos:

#### Productos (30 URLs)

```
- https://esgarden.com/productos/weber-master-touch/ (Barbacoa)
- https://esgarden.com/productos/kamado-joe/ (Ahumador)
- https://esgarden.com/productos/kit-limpieza/ (Accesorios)
...
```

#### Blog (15 URLs)

```
- https://esgarden.com/blog/como-elegir-barbacoa/
- https://esgarden.com/blog/recetas-barbacoa/
- https://esgarden.com/blog/gas-vs-carbon/
...
```

#### Categorías (14 URLs)

```
- https://esgarden.com/barbacoas/
- https://esgarden.com/barbacoas/gas/
- https://esgarden.com/parrillas/
...
```

---

## 📥 INSTRUCCIONES DE IMPORTACIÓN

### **Opción 1: Importar desde Supabase Console (Recomendado)**

1. **Abre Supabase:** https://app.supabase.com
2. **SQL Editor → New Query**
3. **Copia COMPLETO el contenido de:**
   ```
   E:\git\app\tools\io-semantico\docs\ESGARDEN_import_data.sql
   ```
4. **Pega en el editor de SQL**
5. **Click en RUN (▶️)**
6. **Espera confirmación:** Deberías ver:
   ```
   clientes | keywords | urls
   ---------|----------|-----
      1    |    18    |  69
   ```

---

### **Opción 2: Importar desde CLI (Avanzado)**

```bash
cd E:\git\app\tools\io-semantico

# Si usas supabase local
supabase start
supabase db push

# Si usas proyecto remoto (con credenciales)
supabase db reset --linked
```

---

## ✅ VALIDACIONES POST-IMPORTACIÓN

### 1. Verificar Datos Insertados

```sql
-- Contar registros por tipo
SELECT 'io_sem_clientes' as tabla, COUNT(*) as registros
FROM io_sem_clientes
UNION ALL
SELECT 'io_sem_palabras_clave', COUNT(*)
FROM io_sem_palabras_clave
WHERE cliente_id = (SELECT id FROM io_sem_clientes WHERE nombre = 'ESGARDEN')
UNION ALL
SELECT 'io_sem_urls_rastreadas', COUNT(*)
FROM io_sem_urls_rastreadas
WHERE cliente_id = (SELECT id FROM io_sem_clientes WHERE nombre = 'ESGARDEN');
```

**Esperado:**

```
tabla                  | registros
-----------------------|----------
io_sem_clientes        |    1
io_sem_palabras_clave  |   18
io_sem_urls_rastreadas |   69
```

### 2. Verificar URLs por Tipología

```sql
SELECT tipologia, COUNT(*) as cantidad
FROM io_sem_urls_rastreadas
WHERE cliente_id = (SELECT id FROM io_sem_clientes WHERE nombre = 'ESGARDEN')
GROUP BY tipologia
ORDER BY cantidad DESC;
```

**Esperado:**

```
tipologia | cantidad
----------|----------
producto  |   30
blog      |   15
categoria |   14
landing   |    7
estatico  |    2
home      |    1
```

### 3. Verificar Keywords por Nivel

```sql
SELECT nivel, COUNT(*) as cantidad
FROM io_sem_palabras_clave
WHERE cliente_id = (SELECT id FROM io_sem_clientes WHERE nombre = 'ESGARDEN')
GROUP BY nivel
ORDER BY nivel;
```

**Esperado:**

```
nivel   | cantidad
--------|----------
level1  |    2
level2  |    2
level3  |    4
level4  |    3
level5  |    5
```

---

## 🔗 PRÓXIMOS PASOS

Una vez importado:

### 1. Crear Asignaciones de Keywords a URLs

```sql
-- Asignar keywords a URLs (ej: 3-6 keywords por URL)
-- Usar tabla: io_sem_asignaciones_kw_url
```

### 2. Test Frontend

```
http://localhost:3000/optimizador
- Seleccionar ESGARDEN
- Deberían cargar 69 URLs
- Click en URL → ver keywords asignadas
```

### 3. Test Backend

```bash
curl -X POST http://localhost:3000/api/optimizaciones/generar \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": "ID_ESGARDEN",
    "url_id": "URL_BARBACOA"
  }'
```

### 4. Generar Optimizaciones

- Usar endpoint para generar metadatas mejoradas
- Guardar en tabla `io_sem_optimizaciones`

---

## 📋 CHECKLIST

- [ ] Schema creado en Supabase (5 tablas)
- [ ] Datos de ESGARDEN importados (1+18+69)
- [ ] Validaciones ejecutadas (conteos correctos)
- [ ] Frontend carga URLs sin error
- [ ] Backend genera optimizaciones
- [ ] Asignaciones de keywords creadas
- [ ] DB limpia y sin registros huérfanos

---

## 🚀 ARCHIVOS INCLUIDOS

```
docs/
├── ESGARDEN_import_data.sql          ← Script de importación SQL
├── ESGARDEN_IMPORT_GUIDE.md          ← Esta guía
├── ESGARDEN_keywords_mapping.json    ← Keywords en formato JSON
└── ESGARDEN_urls_structure.json      ← URLs en formato JSON
```

---

**Status:** ✅ Datos preparados y listos para importación  
**Próximo:** Ejecutar script SQL en Supabase console
