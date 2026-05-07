# Setup Informe Gratuito — SEO Agent 2026

Guía completa para configurar el sistema de captación de leads con n8n, Google Sheets y emails.

---

## 1. PASOS PARA CONFIGURAR EL WEBHOOK EN N8N

### 1.1 Importar el workflow

1. **Abre tu instancia de n8n** (ej: https://tu-instancia.n8n.cloud)
2. **Haz clic en "Workflows"** en el menú lateral
3. **Clic en "Import from file"** o **"+"** → **Import**
4. **Selecciona el archivo** `n8n-workflow.json` desde la raíz del proyecto
5. **Haz clic en "Import"**

El workflow se importará con todos los nodos pero **desactivado**. Los nombres de los nodos deben coincidir.

### 1.2 Configurar Variables de Entorno en n8n

En n8n, ve a **Settings** → **Environment Variables** y crea estas variables:

| Variable | Valor | Obligatorio |
|----------|-------|-----------|
| `PSI_API_KEY` | Tu clave de Google PageSpeed Insights | ✓ Sí |
| `ANTHROPIC_API_KEY` | Tu clave de Anthropic Claude API | ✓ Sí |
| `SHEETS_ID` | ID de tu Google Sheet para registros | ✓ Sí |
| `SENDGRID_API_KEY` | (si usas SendGrid) | Sí si usas email |
| `TWILIO_SID` | SID de Twilio (opcional) | No |
| `TWILIO_TOKEN` | Token de Twilio (opcional) | No |
| `TWILIO_FROM` | Número Twilio (opcional) | No |

### 1.3 Reemplazar nodos de Email

El workflow incluye nodos **SendGrid** que requieren configuración especial:

#### Opción A: Usar SendGrid (recomendado)

1. **Instala SendGrid** (npm i @sendgrid/mail)
2. **Ve a SendGrid.com** y crea una cuenta gratuita
3. **Genera una API Key** en Settings → API Keys
4. **En n8n:**
   - Abre el nodo **"Email to Consultant"**
   - En **Authentication**, selecciona **"SendGrid"**
   - Pega tu SendGrid API Key
   - Repite para **"Email to Client"**

#### Opción B: Usar Gmail (más simple)

Si prefieres usar Gmail:

1. **En n8n, reemplaza los nodos SendGrid con "Gmail":**
   - Abre el nodo "Email to Consultant"
   - Elimínalo (Nodo → Delete)
   - Añade uno nuevo: **Search for node → "Gmail" → "Gmail: Send Email"**
   - Autentica con tu cuenta Gmail (OAuth)
   - Configura los campos: To, Subject, HTML message
   - Repite para "Email to Client"

2. **Configurar Gmail para n8n:**
   - Abre tu Google Account
   - Ve a **Security** → **App passwords**
   - Genera una contraseña para "n8n"
   - Usa esa contraseña en n8n

### 1.4 Configurar el nodo de Google Sheets

1. **En el nodo "Google Sheets Register":**
   - **Authentication:** Selecciona tu Google Account
   - **Sheet ID:** {{$env.SHEETS_ID}} (la Google Sheet debe existir)
   - **Columns:** Deja como están (Fecha, Nombre, Email, etc.)

2. **Crear el Google Sheet:**
   - Ve a https://sheets.google.com
   - **Nuevo Sheet** → Nómbralo "SEO Leads"
   - **Copia su ID** de la URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Pega el ID en la variable `SHEETS_ID` de n8n

### 1.5 Activar el Webhook

1. **En el nodo "Webhook Trigger":**
   - Verifica que el **Path** es `/seo-lead`
   - Haz clic en **"Copy webhook URL"**
   - Guardará una URL como: `https://tu-instancia-n8n.com/webhook/seo-lead`

2. **En tu .env de la app:**
   ```env
   VITE_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/seo-lead
   ```

3. **Activa el workflow:**
   - Haz clic en el botón **"Activate"** en la parte superior del editor

### 1.6 Probar el Webhook

```bash
curl -X POST https://tu-instancia-n8n.com/webhook/seo-lead \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Client",
    "email": "test@example.com",
    "telefono": "+34600000000",
    "url": "https://example.com",
    "sector": "Ecommerce",
    "mensaje": "Test message",
    "modo": "auto"
  }'
```

Deberías recibir una respuesta `{status: "ok"}` inmediatamente.

---

## 2. CONFIGURAR GOOGLE SHEETS API

### 2.1 Activar Google Sheets API

1. **Ve a Google Cloud Console** → https://console.cloud.google.com
2. **Selecciona o crea un proyecto** (ej: "SEO Agent 2026")
3. **Panel lateral → APIs y servicios**
4. **Click en "Habilitar APIs y servicios"** (botón azul)
5. **Busca "Google Sheets API"**
6. **Haz clic en ella → HABILITAR**

### 2.2 Crear Credenciales de Servicio (para n8n)

1. **Panel lateral → Credenciales**
2. **Clic en "Crear credenciales"** → **Cuenta de servicio**
3. **Rellena el formulario:**
   - Nombre: "n8n-seo"
   - Descripción: "n8n SEO Agent integration"
   - Haz clic en "Crear"
4. **En el siguiente paso:**
   - Clic en **"Crear clave"** → **JSON**
   - Se descargará un archivo `.json`
   - **Guárdalo en un lugar seguro**

5. **En n8n:**
   - Abre el nodo "Google Sheets Register"
   - En **Authentication**, selecciona **Service Account (JSON)**
   - **Pega el contenido del JSON descargado**

### 2.3 Crear la Google Sheet

1. **Ve a https://sheets.google.com**
2. **Nuevo sheet** → Nómbralo "SEO Leads"
3. **Primera fila (Headers):**
   ```
   Fecha | Nombre | Email | Teléfono | URL | Sector | Modo | Score | Perf. Móvil | LCP | SEO Score | Diagnóstico
   ```
4. **Copia el ID** de la URL: `sheets.google.com/spreadsheets/d/{SHEET_ID}/edit`
5. **Guárdalo como variable en n8n:** `SHEETS_ID=tu-sheet-id`

### 2.4 Compartir el Sheet con la Cuenta de Servicio

1. **Copia el email de la cuenta de servicio** del JSON descargado (ej: `n8n-seo@project.iam.gserviceaccount.com`)
2. **En tu Google Sheet:**
   - Haz clic en **"Compartir"**
   - Pega el email de la cuenta de servicio
   - Dale **Editor**
   - Haz clic en "Compartir"

---

## 3. CONFIGURACIÓN SMTP PARA GMAIL

Si decides usar SMTP en lugar de SendGrid o Gmail OAuth:

### 3.1 Habilitar contraseña de aplicación en Gmail

1. **Ve a myaccount.google.com**
2. **Panel lateral → Seguridad**
3. **Verifica que la verificación en 2 pasos está activa**
   - Si no, hazlo primero
4. **Vuelve a Seguridad → Contraseñas de aplicación**
5. **Selecciona:**
   - App: **Mail**
   - Dispositivo: **Windows PC** (o tu dispositivo)
6. **Google generará una contraseña de 16 caracteres**
7. **Cópiala** (es diferente a tu contraseña de Gmail)

### 3.2 Configurar en n8n

En un nodo de email SMTP:

```
SMTP_HOST: smtp.gmail.com
SMTP_PORT: 587
SMTP_USER: honatuya@gmail.com
SMTP_PASS: tu-contraseña-de-aplicación-de-16-caracteres
SMTP_TLS: true
```

### 3.3 Prueba de conexión

```bash
# Usando telnet (solo para verificar conectividad)
telnet smtp.gmail.com 587
```

---

## 4. SMS GRATUITO EN ESPAÑA — BREVO (EX SENDINBLUE) ✓ RECOMENDADO

### Opción Ganadora: Brevo SMS

**¿Por qué Brevo?**
- ✓ **Gratis ilimitado** para el primer mes
- ✓ **Después:** 50 SMS/mes gratis permanentemente
- ✓ **Perfecto para** startups y agencias pequeñas
- ✓ **También incluye:** Email ilimitado + datos de contactos
- ✓ **Compatible con n8n** (integración nativa)
- ✓ **Números españoles** (no internacionales)

### Setup de Brevo en n8n

1. **Ve a https://www.brevo.com** (acepta España)
2. **Regístrate gratis** (requiere email verificado)
3. **Dashboard → SMS → API** o **Automations**
4. **Genera una API Key** (bajo Settings → SMTP & API)
5. **En n8n:**
   - Reemplaza el nodo de Twilio con "Brevo" (búscalo)
   - O usa **HTTP Request** con:
     ```
     URL: https://api.brevo.com/v3/smtp/email
     Headers: api-key: {{$env.BREVO_API_KEY}}
     Body: método POST con estructura de SMS
     ```
6. **En n8n Variables:**
   ```
   BREVO_API_KEY=tu-api-key-de-brevo
   ```

### SMS con Brevo en n8n (código HTTP)

Si no hay nodo nativo, usa HTTP Request:

```json
{
  "method": "POST",
  "url": "https://api.brevo.com/v3/sendsms",
  "headers": {
    "api-key": "{{$env.BREVO_API_KEY}}",
    "content-type": "application/json"
  },
  "body": {
    "sender": "SEOAgent",
    "recipient": "+34603145158",
    "content": "SEO Lead [{{$node['webhook'].json.modo}}]: {{$node['webhook'].json.nombre}} | Score: {{$node['process_data'].json.score}}/20 | {{$node['webhook'].json.email}}"
  }
}
```

---

## OTRAS OPCIONES (para comparar)

### Opción 2: Vonage (Nexmo)

- **Costo:** 10 SMS/mes gratis
- **Setup:** vonage.com → API Key
- **Ventaja:** Buena documentación
- **Desventaja:** Límite muy bajo

### Opción 3: AWS SNS

- **Costo:** 100 SMS/mes durante año 1
- **Setup:** Requiere tarjeta de crédito
- **Ventaja:** Escalable para producción
- **Desventaja:** Necesita configuración compleja

### Opción 4: WhatsApp (alternativa a SMS)

Si prefieres WhatsApp en lugar de SMS:

- **Brevo + WhatsApp** (mismo proveedor)
- **Meta WhatsApp Business API** (requiere aprobación)
- **Ventaja:** Mayor tasa de lectura y respuesta

---

## COMPARATIVA RÁPIDA

| Proveedor | SMS/mes gratis | Email | Complejidad | Recomendación |
|-----------|---|---|---|---|
| **Brevo** | 50 (ilimitado mes 1) | Sí | Fácil | ✓ **MEJOR** |
| Vonage | 10 | No | Media | Básico |
| AWS SNS | 100 (año 1) | No | Difícil | Escalable |
| Twilio | No | No | Media | Pago |

**Conclusión:** Usa **Brevo** para SMS + Email gratuito combinado.

---

## 5. CONFIGURACIÓN DE VARIABLES .env EN LA APP

En la raíz del proyecto, crea un archivo `.env` (basado en `.env.example`):

```env
# Webhook n8n
VITE_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/seo-lead

# Google PageSpeed Insights API
VITE_PSI_API_KEY=AIzaSy...

# (Opcional) Si descargas las variables de n8n a la app
# PSI_API_KEY_N8N=AIzaSy...
```

---

## 6. PROBAR EL SISTEMA COMPLETO

### 6.1 Desde la app (panel "Informe Gratuito")

1. **Abre la app:** http://localhost:5173
2. **Ve a la pestaña "Informe Gratuito"**
3. **Sección "Solicitud Manual":**
   - Rellena los datos de un prospecto ficticio
   - Haz clic en **"Generar y enviar informe"**
   - Verifica que el PDF se genera
   - Comprueba que recibes un email en honatuya@gmail.com

### 6.2 Desde el formulario embebido

1. **Abre tu navegador** en: http://localhost:5173/#/lead-form
2. **Rellena el formulario**
3. **Haz clic en "Solicitar informe gratuito"**
4. **Verifica email**

### 6.3 Verificar registros en Google Sheets

1. **Abre tu Google Sheet "SEO Leads"**
2. **Deberías ver una fila nueva** con los datos del lead
3. **Score, Performance, LCP, etc. deben estar llenos**

---

## 7. ESTRUCTURA DEL WEBHOOK PAYLOAD

Cuando la app (o formulario) envía datos a n8n, el payload tiene esta estructura:

```json
{
  "nombre": "Cliente Test",
  "email": "cliente@example.com",
  "telefono": "+34600000000",
  "url": "https://example.com",
  "sector": "Ecommerce",
  "mensaje": "Me preocupa la velocidad",
  "modo": "auto",
  "notas_internas": "(solo si es modo manual)",
  "prioridad": "Normal",
  "enviar_cliente": true,
  "enviar_consultor": true
}
```

---

## 8. TROUBLESHOOTING

| Problema | Solución |
|----------|----------|
| **Webhook no responde** | Verifica que n8n está activo y el workflow está "Activated" |
| **No llega email al cliente** | Verifica SendGrid/Gmail authentication y que email está en el payload |
| **Google Sheets no se actualiza** | Comprueba que la cuenta de servicio tiene acceso al Sheet |
| **PSI falla** | Verifica que tu Google API Key tiene PageSpeed Insights API habilitada |
| **Claude falla** | Revisa tu ANTHROPIC_API_KEY y que no has agotado el límite |
| **PDF no genera** | Verifica que jsPDF está instalado: `npm ls jspdf` |

---

## 9. FICHEROS CLAVE DEL PROYECTO

```
E:\git\io-seo\
├── src\
│   ├── components\
│   │   ├── LeadForm.jsx              ← Formulario embebible
│   │   └── FreeReportPanel.jsx       ← Panel principal (solicitud + historial)
│   ├── pages\
│   │   └── LeadFormPage.jsx          ← Página standalone para /lead-form
│   └── utils\
│       ├── leadAnalysis.js           ← Análisis técnico (robots.txt, schema, etc.)
│       └── pdfGenerator.js           ← Generación de PDF con jsPDF
├── n8n-workflow.json                 ← Workflow para importar en n8n
├── .env.example                      ← Variables de entorno (copiar a .env)
├── embed-snippet.html                ← Código HTML para embeber formulario
└── SETUP_INFORME_GRATUITO.md        ← Este archivo
```

---

## 10. PRÓXIMOS PASOS RECOMENDADOS

1. ✓ Copiar `.env.example` a `.env`
2. ✓ Instalar dependencias: `npm install`
3. ✓ Configurar variables en `.env`
4. ✓ Importar workflow en n8n
5. ✓ Configurar nodos (Email, Sheets, Claude, PSI)
6. ✓ Activar workflow en n8n
7. ✓ Probar desde la app
8. ✓ Embeber formulario en tu web (si aplica)

---

**Última actualización:** 24 de abril de 2026
**Versión:** SEO Agent 2026 v1.0
**Soporte:** honatuya@gmail.com
