# Guía Brevo — SMS Gratuito para España

## ¿Por qué Brevo es la mejor opción?

| Aspecto | Brevo | Vonage | Twilio | AWS SNS |
|--------|-------|--------|--------|---------|
| **SMS/mes gratis** | 50 + ilimitado (mes 1) | 10 | $0 | 100 (año 1) |
| **Email incluido** | ✓ Ilimitado | ✗ No | ✗ No | ✗ No |
| **Números ES** | ✓ Sí | ✗ Internacionales | Sí (de pago) | ✓ Sí |
| **Setup** | 5 min | 5 min | 15 min | 30 min |
| **Complejidad n8n** | Fácil | Media | Media | Difícil |
| **Costo después gratis** | $9.99/mes (opt) | Pago directamente | Pago | Pago por uso |

**Recomendación:** Brevo es perfecto para startups, agencias pequeñas y consultores.

---

## Setup Rápido (5 minutos)

### Paso 1: Crear cuenta en Brevo

1. Ve a **https://www.brevo.com**
2. Haz clic en **"Sign up"** (Registrarse)
3. Rellena el formulario:
   - Email
   - Contraseña
   - Nombre empresa (puede ser tu nombre)
   - País: **España**
4. Haz clic en **"Create account"**
5. **Verifica tu email** (recibirás un link)

### Paso 2: Obtener API Key

1. Una vez en el dashboard, ve a **Settings** (⚙️)
2. **SMTP & API** en el panel lateral
3. Busca la sección **"API Keys"** o **"REST API"**
4. Haz clic en **"Generate API Key"** o **"Create new key"**
5. **Copia la API Key** (comienza con `xsmtpapi-...` o `Xge...`)
6. **Guárdala en un lugar seguro** (no la publiques)

### Paso 3: Configurar en n8n

En tu workflow de n8n:

**Opción A: Usar nodo nativo de Brevo (si existe)**
1. En el workflow, busca y añade nodo: **"Brevo"** o **"Sendinblue"**
2. En Authentication, selecciona **"Create new credential"**
3. Pega tu API Key
4. Configura:
   - **To:** `+34603145158` (número del consultor)
   - **Message:** `SEO Lead [{{modo}}]: {{nombre}} | Score: {{score}}/20`

**Opción B: Usar HTTP Request (más flexible)**

Reemplaza el nodo de Twilio/SMS con este HTTP Request:

```
Method: POST
URL: https://api.brevo.com/v3/sendsms

Headers:
  api-key: {{$env.BREVO_API_KEY}}
  content-type: application/json

Body:
{
  "sender": "SEOAgent",
  "recipient": "+34603145158",
  "content": "SEO Lead [{{$node['webhook'].json.modo}}]: {{$node['webhook'].json.nombre}} | {{$node['webhook'].json.url}} | Score: {{$node['process_data'].json.score}}/20"
}
```

### Paso 4: Guardar API Key en n8n

En **n8n Settings → Environment Variables**, añade:

```
BREVO_API_KEY=xsmtpapi-xxxxxxxxxxxxx
```

Luego en el HTTP Request, reemplaza la clave literal con:
```
api-key: {{$env.BREVO_API_KEY}}
```

---

## Usar Email + SMS desde Brevo (Mejor aún)

**Ventaja:** Brevo también envía emails, así que puedes consolidar TODO en un proveedor.

### Para reemplazar SendGrid con Brevo Email

En el nodo **"Email to Consultant"** o **"Email to Client"**:

1. Si es nodo SendGrid, reemplázalo con HTTP Request:

```
Method: POST
URL: https://api.brevo.com/v3/smtp/email

Headers:
  api-key: {{$env.BREVO_API_KEY}}
  content-type: application/json

Body:
{
  "sender": {
    "name": "SEO Agent 2026",
    "email": "honatuya@gmail.com"
  },
  "to": [
    {
      "email": "{{$node['webhook'].json.email}}"
    }
  ],
  "subject": "Tu informe SEO gratuito",
  "htmlContent": "<h2>Hola {{$node['webhook'].json.nombre}}</h2><p>Tu puntuación: {{$node['process_data'].json.score}}/20</p>"
}
```

---

## Límites Brevo (Gratis)

| Recurso | Límite Gratis | Depois |
|---------|---|---|
| **SMS/mes** | 50 + ilimitado (mes 1) | Desde $9.99/mes |
| **Emails/mes** | Ilimitado | Ilimitado |
| **Contactos almacenados** | Hasta 20,000 | Más según plan |
| **Automatizaciones** | 1 | Según plan |
| **API calls/hora** | 150 requests | Más según plan |

**Para un consultor:** El plan gratuito es más que suficiente.

---

## Prueba de Envío de SMS

Desde el panel de Brevo (sin n8n):

1. **Dashboard → SMS**
2. **"Send a message"** o **"Compose"**
3. Rellena:
   - **Recipient:** Tu número (+34 + 9 dígitos)
   - **Message:** Test message
4. Click **"Send"**
5. Recibirás el SMS en segundos

---

## Casos de Uso en tu App

### Notificación al consultor (SMS)
```
"Nuevo lead: Cliente ABC | www.example.com | Score: 15/20"
```

### Email al cliente (Brevo Email)
```
Subject: Tu informe SEO gratuito
Body: Puntuación, diagnóstico, recomendaciones, CTA
```

### Email al consultor (Brevo Email)
```
Subject: [SEO Agent] Nuevo análisis — Cliente ABC
Body: Datos completos, notas internas, prioridad
```

---

## Integraciones Avanzadas

### Automatizaciones en Brevo

Brevo permite crear workflows automáticos:

1. **Dashboard → Automation**
2. **Create automation**
3. **Trigger:** API call recibida
4. **Actions:** 
   - Enviar email
   - Enviar SMS
   - Guardar en contactos
   - Añadir a lista

**Útil para:** Seguimiento automático, recordatorios, retrasos inteligentes.

### Webhooks desde Brevo a n8n

Si necesitas reaccionar a eventos de Brevo:

1. **Settings → Webhooks**
2. **Add webhook**
3. URL: tu webhook de n8n
4. Events: "Email delivered", "SMS sent", etc.

---

## Troubleshooting Brevo

| Problema | Solución |
|----------|----------|
| **API Key inválida** | Copia de nuevo desde Settings → SMTP & API |
| **SMS no se envía** | Verifica número con +34 (formato internacional) |
| **Email rechazado** | Confirma dominio en Brevo (Settings → Senders) |
| **Límite de 50/mes agotado** | Espera al próximo mes o actualiza plan |
| **"Recipient not in correct format"** | Formato debe ser: `+34XXXXXXXXX` (sin espacios) |

---

## Comparativa: Brevo vs Alternativas

### ❌ ¿Cuándo NO usar Brevo?

- Necesitas **millones de SMS/mes** → usa Twilio con plan
- Quieres **llamadas de voz** → usa Vonage Voice API
- Necesitas **WhatsApp business API** → usa Meta/Twilio

### ✅ Cuándo SÍ usar Brevo

- Eres **startup/freelancer** → Brevo (mejor relación precio-funcionalidad)
- Quieres **todo en uno** (Email + SMS) → Brevo
- Necesitas **números españoles** → Brevo
- Buscas **máxima simplicidad** → Brevo

---

## Documentación Oficial

- **Web:** https://www.brevo.com
- **Docs API SMS:** https://developers.brevo.com/docs/send-transactional-sms
- **Docs Email:** https://developers.brevo.com/docs/send-transactional-emails
- **Soporte:** support@brevo.com (respuesta en 24h)

---

## Resumen Final

```
1. Regístrate en https://www.brevo.com
2. Genera API Key en Settings → SMTP & API
3. En n8n, reemplaza Twilio con HTTP Request a Brevo
4. Añade BREVO_API_KEY a n8n Variables de entorno
5. Prueba enviando SMS desde dashboard
6. Activa el workflow
7. ¡Listo! Recibirás notificaciones y tu cliente emails
```

**Costo total:** $0 (gratis para siempre con 50 SMS/mes)

---

**Última actualización:** 24 de abril de 2026
**Versión:** 1.0
