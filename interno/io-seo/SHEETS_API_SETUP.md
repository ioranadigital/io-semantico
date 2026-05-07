# Google Sheets API Setup para SEO Agent 2026

## ¿Qué he implementado?

✓ **Modo dual Manual/Google Sheets** en ConfigPanel  
✓ **Importación automática** desde Google Sheets públicos (sin OAuth)  
✓ **Generador de plantilla Excel** descargable (2 hojas reales: KPIs + Keywords)  
✓ **Mapeo de datos** automático (KPIs + Keywords)  
✓ **Persistencia en localStorage** (URL última hoja, modo, config)

---

## Qué activar en Google Cloud Console

### 1. Ve a Google Cloud Console
```
https://console.cloud.google.com
```

### 2. Crea o selecciona un proyecto
- Si es tu primer proyecto, crea uno nuevo
- Si ya tienes uno con "PageSpeed Insights API" activa, úsalo (es la misma API key)

### 3. Activa Google Sheets API
- Panel izquierdo → **APIs y servicios**
- Click en **+ HABILITAR APIS Y SERVICIOS**
- Busca **"Google Sheets API"**
- Click en ella y presiona **HABILITAR**

### 4. Genera la API Key (si no la tienes)
- Panel izquierdo → **Credenciales**
- Click en **+ CREAR CREDENCIALES**
- Selecciona **Clave de API**
- Se generará tu clave (ejemplo: `AIzaSy...`)

### 5. USA LA MISMA API KEY que ya tienes
Si ya usas PageSpeed Insights API con `psi-key`, esa misma key funcionará con Sheets.
**No necesitas generar una nueva.**

---

## Cómo usar desde la app

### Modo Manual (como siempre)
1. Selecciona "Manual" en la sección GSC
2. Rellena los campos como hacías antes
3. Los datos se guardan en localStorage automáticamente

### Modo Google Sheets
1. **Prepara tu spreadsheet en Google Sheets:**
   - Descarga el archivo Excel desde el botón "Descargar plantilla Excel (2 hojas)"
   - Tienes dos hojas ya creadas: **"KPIs"** y **"Keywords"**
   - Rellena los datos en Excel
   - Sube el archivo a Google Sheets (nuevo) o copia manualmente en un sheet existente

2. **Desde la app:**
   - Selecciona "Google Sheets" en GSC
   - Pega la URL de tu spreadsheet
   - Presiona **"Importar datos"**
   - Los datos se cargan automáticamente en los campos

3. **Compartir el sheet:**
   - El sheet DEBE estar compartido con "Cualquiera con el enlace puede ver"
   - Click derecho en el sheet → Compartir → "Cualquiera con el enlace"

---

## Estructura esperada del Google Sheet

(La plantilla Excel descargable ya tiene esta estructura lista)

### Hoja 1: "KPIs" (dos columnas)
```
Campo                          | Valor
Clicks (28 días)              | 1250
Impresiones                   | 42000
CTR medio (%)                 | 3.2
Posición media                | 18.4
Keywords Top 3                | 12
Keywords Top 10               | 47
Keywords Top 100              | 320
Clicks período anterior        | 980
```

### Hoja 2: "Keywords" (tabla de keywords)
```
Keyword                        | Clicks | Posición | Impresiones | CTR
seguros de coche               | 245    | 4.2      | 2000        | 12.3
seguro hogar barato            | 180    | 6.8      | 1800        | 10
...
```

---

## Persistencia en localStorage

Automáticamente se guardan:
- **URL del último spreadsheet usado** → No hay que pegar cada vez
- **Modo seleccionado** (Manual/Sheets)
- **Config completa** → Al recargar, se restauran todos los datos

---

## Troubleshooting

### Error: "Error Sheets API: 404"
- La URL del sheet no es válida
- El Sheet ID no se extrajo correctamente
- Ejemplo correcto: `https://docs.google.com/spreadsheets/d/1ABC-xyz.../edit#gid=0`

### Error: "Error Sheets API: 403"
- La API Key no tiene permiso para acceder a Sheets
- Verifica que **Google Sheets API** está habilitada en Google Cloud
- Si la key es nueva, espera 1-2 minutos a que se propague

### Error: "Error Sheets API: 401"
- La API Key es inválida o ha expirado
- Verifica que la copias completa desde Google Cloud Console

### No se importan los Keywords
- Verifica que la hoja se llama exactamente **"Keywords"** (mayúscula)
- Las columnas deben ser: Keyword, Clicks, Posición, Impresiones, CTR

---

## API Usada

La app usa la **Google Sheets API v4** en modo público:
```javascript
https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{RANGE}?key={API_KEY}
```

**Ventajas:**
- Sin OAuth ni flujos de autenticación complejos
- El usuario solo pega la URL del sheet
- Solo requiere API Key (que ya tienes)
- Funciona con sheets públicos o compartidos

---

## Limitaciones a saber

- No se puede **escribir** en el sheet (solo lectura)
- El sheet debe estar **compartido con "Cualquiera con el enlace"**
- Google Sheets API tiene un límite de 300 requests por minuto por usuario
- Las dos hojas deben llamarse exactamente **"KPIs"** y **"Keywords"**

---

Listo para usar. ¡Prueba importando datos desde Sheets! 🚀
