# Brevo Quick Start — SMS Gratuito España

## TL;DR (2 minutos)

1. **Registrate:** https://www.brevo.com
2. **Settings → SMTP & API → Generate API Key** (copia la clave)
3. **En n8n:** Reemplaza nodo Twilio con HTTP Request a Brevo
4. **Variables n8n:** `BREVO_API_KEY=tu-clave`
5. **Listo** — 50 SMS/mes gratis + email ilimitado

---

## HTTP Request para n8n (copiar y pegar)

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
  "content": "SEO: {{$node['webhook'].json.nombre}} | {{$node['webhook'].json.url}} | Score: {{$node['process_data'].json.score}}/20"
}
```

---

## Ventajas Brevo para España

✓ **50 SMS/mes gratis** (ilimitado primer mes)  
✓ **Email ilimitado incluido**  
✓ **Números españoles**  
✓ **Sin tarjeta de crédito** requerida  
✓ **Fácil en n8n**  

---

## Número Receptor

Usa el formato: `+34XXXXXXXXX`
- Ej: `+34603145158` (tu número)
- NO: 603145158
- NO: 0034603145158

---

## Verificación

Desde panel Brevo:
1. **SMS → Compose**
2. Recipient: Tu número
3. Message: "Test"
4. Send
5. ✓ Recibirás SMS en segundos

---

## Documentación Completa

Ver: `BREVO_SETUP.md` (guía paso a paso detallada)

---

**Recomendación:** Usa Brevo. Es gratis, simple y perfecto para España.
