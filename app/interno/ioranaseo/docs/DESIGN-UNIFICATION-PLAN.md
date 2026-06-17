# Plan de Unificación de Diseño - IoranaSEO

**Fecha:** 2026-06-14  
**Status:** 🔴 No Iniciado  
**Objetivo:** Hacer 100% consistente el diseño de todas las páginas basándose en home3

---

## ANÁLISIS RÁPIDO DE PÁGINAS

### Páginas Principales (en defaultLayout)

| Página         | Hero Type   | Status           | Prioridad     | Acciones                   |
| -------------- | ----------- | ---------------- | ------------- | -------------------------- |
| `/about`       | BreadCumb   | ❌ Inconsistente | 🔴 Alta       | Revisar About1, About4     |
| `/pricing`     | BreadCumb   | ❌ Inconsistente | 🔴 Alta       | Revisar Pricing3, Pricing4 |
| `/contact`     | BreadCumb   | ❌ Inconsistente | 🔴 Alta       | Revisar ContactInfo7       |
| `/service`     | BreadCumb   | ❌ Inconsistente | 🔴 Alta       | Revisar Services5          |
| `/blog`        | BreadCumb   | ❌ Inconsistente | 🟡 Media      | Revisar Blog components    |
| `/blog-left`   | BreadCumb   | ❌ Inconsistente | 🟡 Media      | Revisar Blog con sidebar   |
| `/blog-right`  | BreadCumb   | ❌ Inconsistente | 🟡 Media      | Revisar Blog con sidebar   |
| `/case`        | BreadCumb   | ❌ Inconsistente | 🟡 Media      | Revisar Case components    |
| `/faq`         | BreadCumb   | ❌ Inconsistente | 🟡 Media      | Revisar FAQ styling        |
| `/testimonial` | BreadCumb   | ❌ Inconsistente | 🟡 Media      | Revisar Testimonial cards  |
| `/planes`      | HeroBanner2 | ❌ Nueva         | 🟠 Media-Alta | Ajustar a home3 style      |

### Variantes y Detalles

- `/service2` - Variante alternativa de servicios
- `/blog/blog-details` - Detalle de artículo
- `/service/service-details` - Detalle de servicio
- `/case/case-details*` - Variantes de detalles de casos

### Páginas de Referencia (home pages)

| Página   | Status             | Uso                     |
| -------- | ------------------ | ----------------------- |
| `/home3` | ✅ Source of Truth | Modelo a seguir         |
| `/home2` | Alternativa        | Usar solo si compatible |
| `/home4` | Alternativa        | Usar solo si compatible |
| `/home5` | Alternativa        | Usar solo si compatible |

---

## ELEMENTOS A UNIFICAR

### 1. Colores Primarios (CRÍTICO)

```css
/* DEBE usar en TODAS las páginas */
--color-primary-gradient: linear-gradient(90deg, #fb3f52 0%, #fa7d3c 100%);
--color-secondary: #4d32a5;
--color-secondary-hover: #5f46ae;
--color-blue-gradient: linear-gradient(90deg, #3b32f6 0%, #49a6ff 100%);
--color-purple-gradient: linear-gradient(90deg, #5700fc 2.31%, #9553fd 100%);
--text-primary: #0b0314;
--text-secondary: #3c3543;
--text-light: #5d6369;
--bg-light: #f5f5fd;
--bg-white: #ffffff;
--accent-orange: #fa7d3c;
--accent-blue: #3b32f6;
--accent-purple: #4d32a5;
```

### 2. Tipografía (CRÍTICO)

```css
/* DEBE ser consistente */
/* H1: 56-72px, fw-600/700 */
/* H2: 36-48px, fw-600 */
/* H3: 24-32px, fw-600 */
/* Body: 16-18px, fw-400 */
/* Subtitle: 14-16px, fw-600, color naranja */
```

### 3. Botones (CRÍTICO)

```css
/* DEBE reemplazar TODOS con .theme-btn* */
.theme-btn1  /* Gradient rojo-naranja (primario) */
.theme-btn2  /* Púrpura (secundario) */
.theme-btn3  /* Gradient púrpura (alternativo) */
.theme-btn4  /* Blanco (claro) */
```

### 4. Fondos de Secciones (IMPORTANTE)

```css
/* Secciones pares (incluso): bg-light (#F5F5FD) */
/* Secciones impares: bg-white (#FFFFFF) */
```

### 5. Espaciado (IMPORTANTE)

```css
/* Padding vertical entre secciones: 60-100px */
/* Padding interno de cards: 30-40px */
/* Gap entre items: 20-30px */
```

---

## FASES DE IMPLEMENTACIÓN

### FASE 1: Páginas Principales (6 páginas) ✅ COMPLETADA

**Meta:** Unificar estructura principal de home3 | **Status:** HECHO

#### 1.1 `/about` (Prioridad 🔴 ALTA) ✅

- [x] Cambiar About1 de `.heading1` → `.heading3`
- [x] Cambiar About4 de `.heading1` → `.heading3`
- [x] Cambiar botones de `.theme-btn1` → `.theme-btn2`
- [x] Actualizar iconos de span1.svg → main-span3.svg
- **Componentes afectados:** About1, About4
- **Status:** ✅ COMPLETADA

#### 1.2 `/pricing` (Prioridad 🔴 ALTA) ✅

- [x] Cambiar Pricing4 de `.heading1` → `.heading3`
- [x] Cambiar SectionTitle → SectionTitle2
- **Componentes afectados:** Pricing3 (ya ok), Pricing4
- **Status:** ✅ COMPLETADA

#### 1.3 `/contact` (Prioridad 🔴 ALTA) ✅

- [x] Cambiar ContactInfo7 de `.heading1` → `.heading3`
- [x] Cambiar botón de `.theme-btn1` → `.theme-btn2`
- [x] Actualizar ícono de span1.svg → main-span3.svg
- **Componentes afectados:** ContactInfo7
- **Status:** ✅ COMPLETADA

#### 1.4 `/service` (Prioridad 🔴 ALTA) ✅

- [x] Cambiar Services5 de `.heading1` → `.heading3`
- **Componentes afectados:** Services5
- **Status:** ✅ COMPLETADA

#### 1.5 `/planes` (Prioridad 🟠 MEDIA-ALTA - NUEVA) ✅

- [x] Cambiar HeroBanner2 → HeroBanner3
- [x] Cambiar Pricing1 → Pricing3
- [x] Cambiar Testimonial1 → Testimonial3
- [x] Cambiar ContactInfo1 → ContactIno3
- **Componentes:** HeroBanner3, Pricing3, Testimonial3, ContactIno3
- **Status:** ✅ COMPLETADA

#### 1.6 `/testimonial` (Prioridad 🟠 MEDIA-ALTA) ✅

- [x] Cambiar Testimonial6 de `.heading1` → `.heading3`
- [x] Cambiar SectionTitle → SectionTitle2
- **Componentes afectados:** Testimonial5 (ok), Testimonial6
- **Status:** ✅ COMPLETADA

### FASE 2: Páginas Secundarias (variantes)

**Meta:** Mantener consistencia en páginas alternativas

#### 2.1 Blog Variantes (3 páginas)

- [ ] `/blog` - Unificar estilos
- [ ] `/blog-left` - Sidebar consistency
- [ ] `/blog-right` - Sidebar consistency
- **Componentes:** Blog1, Blog2
- **Estimado:** 30 min total

#### 2.2 Case Variantes (4 páginas)

- [ ] `/case` - Grid de casos
- [ ] `/case/case-details` - Detalle izquierda
- [ ] `/case/case-details-right` - Detalle derecha
- [ ] `/case/case-details-center` - Detalle centro
- **Componentes:** CaseStudy1, CaseStudy2
- **Estimado:** 40 min total

#### 2.3 Service Variantes (2 páginas)

- [ ] `/service` (ya en Fase 1)
- [ ] `/service2` - Variante alternativa
- [ ] `/service/service-details` - Detalle
- **Componentes:** Service1, Service2, Service3
- **Estimado:** 25 min total

#### 2.4 Blog Details (1 página)

- [ ] `/blog/blog-details` - Artículo completo
- **Componentes:** BlogDetails
- **Estimado:** 15 min

#### 2.5 FAQ (1 página)

- [ ] `/faq` - Unificar estilos FAQ
- **Componentes:** Faq1
- **Estimado:** 20 min

### FASE 3: Validación & Testing (TODO)

- [ ] Contraste WCAG AA en todas las páginas
- [ ] Responsive check mobile/tablet/desktop
- [ ] Prueba visual en navegador
- [ ] Side-by-side comparación con home3
- [ ] Performance check
- **Estimado:** 45 min

---

## CHECKLIST POR COMPONENTE

### About Components

- [ ] About1 - Revisar heading1 estilos
- [ ] About2 - Si existe
- [ ] About3 - Revisar heading3 estilos
- [ ] About4 - Revisar estilos

### Service Components

- [ ] Service1 - Revisar cards
- [ ] Service2 - Revisar cards
- [ ] Service3 - Revisar cards
- [ ] Services5 - Revisar cards

### Pricing Components

- [ ] Pricing1 - Revisar cards
- [ ] Pricing2 - Revisar cards
- [ ] Pricing3 - Revisar cards
- [ ] Pricing4 - Revisar cards
- [ ] Pricing5 - Revisar cards

### Other Components

- [ ] BreadCumb - Validar estilos
- [ ] Testimonial1, Testimonial2, Testimonial3 - Revisar cards
- [ ] ContactInfo1-7 - Revisar colores
- [ ] Blog1, Blog2 - Revisar cards
- [ ] CaseStudy1, CaseStudy2 - Revisar cards
- [ ] Faq1 - Revisar estilos
- [ ] Team1, Team2 - Revisar cards
- [ ] Work1-5 - Revisar estilos
- [ ] Skill - Revisar barras

---

## CRITERIOS DE ÉXITO

✅ Todas las páginas usan los mismos colores primarios  
✅ Tipografía consistente (h1/h2/h3/body)  
✅ Botones unificados (`.theme-btn*`)  
✅ Fondos alternados (blanco ↔ gris)  
✅ Espaciado consistente  
✅ Contraste WCAG AA cumplido  
✅ Responsive design funciona  
✅ Sin regressions en funcionalidad

---

## TIEMPO ESTIMADO TOTAL

- **Fase 1:** 145-160 min (2h 25min - 2h 40min)
- **Fase 2:** 130-145 min (2h 10min - 2h 25min)
- **Fase 3:** 45 min
- **TOTAL:** ~5-5.5 horas

**Recomendación:** Ejecutar en 2 sesiones:

1. Fase 1 (páginas principales) - Impacto máximo
2. Fase 2 + 3 (variantes + validación) - Completar unificación

---

## NOTAS IMPORTANTES

1. **No modificar lógica de negocio** - Solo estilos
2. **No cambiar URLs ni rutas** - Solo CSS/className
3. **Mantener intacto el contenido** - Solo uniforme estilos
4. **Preservar responsividad** - Mobile/tablet funciona igual
5. **Probar en navegador real** - No solo en código

---

**Próximo paso:** Ejecutar Fase 1 comenzando por `/about`
