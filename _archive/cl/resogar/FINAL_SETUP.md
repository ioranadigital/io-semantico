# ✅ SETUP FINAL — 3 Pasos

## 1️⃣ Obtener Google Maps API Key (2 min)

👉 Lee: `GET_GOOGLE_MAPS_KEY.md`

Resultado: `AIzaSy_tuapikeyrealaqui`

## 2️⃣ Pegar API Key en `.env.local`

Archivo: `E:/git/cl/resogar/.env.local`

Busca esta línea:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI
```

Reemplazar con tu key:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy_tuapikeyrealaqui
```

Guardar archivo ✅

## 3️⃣ Iniciar servidor

```bash
cd E:/git/cl/resogar
npm run dev
```

Ir a: http://localhost:3000

---

## ✨ Verificar Todo

### Home (http://localhost:3000)
- [ ] 3 apartamentos cargan
- [ ] Sección "Ubicación de los Apartamentos" muestra mapa
- [ ] Mapa tiene 3 marcadores amarillos
- [ ] Clickear marcador → muestra info popup

### Página de Apartamento 
- [ ] Clickear "Ver Detalles" en cualquier apartamento
- [ ] URL: `http://localhost:3000/apartamentos/[id]`
- [ ] Carga descripción, amenidades, ubicación
- [ ] Botón "Reservar Ahora" abre modal

### Navegación
- [ ] Home → Apartamentos → Detalles → Home ✓
- [ ] Breadcrumb funciona
- [ ] Todos los enlaces funcionan

---

## 🎉 Si TODO funciona

¡Proyecto MVP completado! ✅

Próximas fases:
- [ ] Integración Stripe/PayPal
- [ ] Emails con n8n
- [ ] Autenticación admin
- [ ] Deploy a Vercel

---

## 💡 Troubleshooting

**Mapa no carga:**
- Verifica que API Key está en `.env.local`
- Reinicia `npm run dev`
- Abre DevTools (F12) → Console → ¿hay errores?

**Apartamentos no cargan:**
- Ejecutó el SQL en Supabase? 
- Verificó con `node verify-setup.js`?

**Página de detalle da 404:**
- ¿Supabase tiene datos?
- ¿.env.local tiene credenciales?

---

Avísame cuando esté todo listo 🚀
