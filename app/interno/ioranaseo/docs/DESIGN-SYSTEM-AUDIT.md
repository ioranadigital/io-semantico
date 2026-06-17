# Auditoría Visual - Sistema de Diseño IoranaSEO

**Fecha:** 2026-06-14  
**Status:** 🔴 Incompleto - Unificación en Progreso  
**Página de Referencia:** `/home3` (Home Page)

---

## 1. PALETA DE COLORES

### Colores Primarios (Gradients)

- **Gradient Rojo-Naranja:** `linear-gradient(90deg, #FB3F52 0%, #FA7D3C 100%)`
  - Inicio: #FB3F52 (Rojo vibrante)
  - Fin: #FA7D3C (Naranja cálido)
  - Uso: Botones principales (`.theme-btn1`), fondos destacados

- **Gradient Azul:** `linear-gradient(90deg, #3B32F6 0%, #49A6FF 100%)`
  - Inicio: #3B32F6 (Azul profundo)
  - Fin: #49A6FF (Azul cielo)
  - Uso: Hover effects en botones, acentos secundarios

- **Gradient Púrpura:** `linear-gradient(90deg, #5700FC 2.31%, #9553FD 100%)`
  - Inicio: #5700FC (Púrpura vibrante)
  - Fin: #9553FD (Púrpura claro)
  - Uso: Botones alternativos (`.theme-btn3`)

### Colores Sólidos

- **Púrpura Oscuro:** #4D32A5 (Botones secundarios `.theme-btn2`)
- **Púrpura Oscuro Hover:** #5F46AE (Hover state)
- **Blanco:** #FFFFFF (Fondo, texto sobre colores oscuros)
- **Blanco Roto:** #FFF0EC (Fondos ligeros)
- **Gris Claro:** #F5F5FD (Fondos de secciones, fondo por defecto)
- **Negro/Muy Oscuro:** #0B0314 (Texto principal)
- **Gris Oscuro:** #3C3543 (Texto secundario)
- **Gris Neutral:** #5D6369 (Párrafos, texto suave)

### Colores de Acento

- **Naranja Primario:** #FA7D3C
- **Azul Primario:** #3B32F6
- **Púrpura Primario:** #4D32A5

---

## 2. TIPOGRAFÍA

### Estructura de Tamaños

| Clase                   | Tamaño  | Uso                        |
| ----------------------- | ------- | -------------------------- |
| `.f-fs-12`              | 12px    | Labels, pequeños textos    |
| `.f-fs-14`              | 14px    | Subtítulos pequeños        |
| `.f-fs-16`              | 16px    | Texto del cuerpo           |
| `.f-fs-18`              | 18px    | Párrafos, texto normal     |
| `.f-fs-20` a `.f-fs-32` | 20-32px | Subtítulos, encabezados    |
| `.f-fs-36` a `.f-fs-48` | 36-48px | Títulos de sección         |
| `.f-fs-56` a `.f-fs-96` | 56-96px | Títulos principales (Hero) |

### Font Weights (Clases)

- **`.fw-4`** → 400 (Regular)
- **`.fw-5`** → 500 (Medium)
- **`.fw-6`** → 600 (SemiBold)
- **`.fw-7`** → 700 (Bold)
- **`.fw-8`** → 800 (ExtraBold)
- **`.fw-9`** → 900 (Black)

### Tipografía de Referencia (home3)

- **Títulos Principales:** 56-72px, fw-600 a fw-700, color #0B0314
- **Subtítulos:** 18-24px, fw-600, color #FA7D3C (naranja) o #0B0314
- **Texto del Cuerpo:** 18px, fw-400, color #3C3543 o #5D6369
- **Botones:** 18px, fw-600, altura de línea 18px

### Line Height (Leading)

- Texto del cuerpo: `26px` (18px font)
- Títulos: Varía según tamaño, típicamente 1.2-1.4x del tamaño

---

## 3. COMPONENTES CLAVE

### 3.1 BOTONES

**Botón Primario (`.theme-btn1`)**

```css
Gradient: #FB3F52 → #FA7D3C
Padding: 12px 12px 12px 18px
Font-size: 18px, fw-600
Hover: Fondo cambia a azul (#3B32F6 → #49A6FF)
Icon: Círculo blanco 32x32px, rotado -45deg
```

**Botón Secundario (`.theme-btn2`)**

```css
Fondo: #4D32A5 (Púrpura)
Padding: 12px 12px 12px 18px
Font-size: 18px, fw-600
Hover: Fondo cambia al gradiente rojo-naranja
Icon: Círculo blanco, color #4D32A5
```

**Botón Alternativo (`.theme-btn3`)**

```css
Gradient: #5700FC → #9553FD (Púrpura)
Padding: 12px 12px 12px 18px
Font-size: 18px, fw-600
Hover: Fondo invierte al gradiente
Icon: Círculo blanco, color #9553FD
```

**Botón Claro (`.theme-btn4`)**

```css
Fondo: #FFFFFF
Texto: #0B0927
Padding: 12px 12px 12px 18px
Font-size: 18px, fw-600
Hover: Fondo cambia al gradiente púrpura
Icon: Gradiente púrpura fondo
```

**Características Comunes:**

- Border-radius: 0px (Sin bordes redondeados)
- Transición: 0.4s (Todos los efectos hover)
- Posición relativa para efecto overlay del hover

---

## 4. SECCIONES Y DISEÑO

### Fondos Alternados

- **Secciones Pares:** Fondo gris claro (#F5F5FD)
- **Secciones Impares:** Fondo blanco (#FFFFFF)

### Estructura de Cards/Tarjetas

- **Fondo:** Blanco o gris claro según contexto
- **Padding:** 30-40px (valores típicos)
- **Sombra:** Ligera (box-shadow típicamente soft)
- **Border-radius:** 0px o 8px (varía por componente)

### Headers de Sección

- **Subtítulo:** 14-16px, fw-600, color naranja (#FA7D3C)
- **Título:** 36-48px, fw-600 a fw-700, color #0B0314
- **Descripción:** 16-18px, fw-400, color #3C3543 o #5D6369
- **Alineación:** Centro (típicamente en home3)

---

## 5. ESPACIADO Y LAYOUT

### Padding/Margin Comunes

- **Vertical (secciones):** 60px-100px entre secciones
- **Horizontal (contenedor):** 15px-30px padding (responsivo)
- **Card spacing:** 30-40px interno
- **Gap entre items:** 20-30px

### Container

- **Ancho máximo:** Uso de clase `.container` de Bootstrap
- **Responsive:** Reduce en mobile/tablet

---

## 6. ANIMACIONES

- **Fade-in transitions:** 0.4s ease-in-out
- **Hover effects:** 0.4s en todos los botones
- **Floating animations:** animate1-6 clases (2-4s, alternate)

---

## 7. PÁGINAS SECUNDARIAS PARA UNIFICAR

### Estado Actual (Análisis Rápido)

- ❌ `/about` - Probablemente inconsistente
- ❌ `/pricing` - Puede tener colores/tipografía diferente
- ❌ `/contact` - Estructura y colores divergentes
- ❌ `/service` - Puede usar variantes antiguas
- ❌ `/blog` - Tipografía y cards inconsistentes
- ❌ `/case` - Estilos duplicados o antiguos
- ❌ `/faq` - Colores de acento posiblemente diferentes
- ❌ `/testimonial` - Cards sin unificar
- ❌ `/planes` - Nueva página, necesita aplicar sistema completo

---

## 8. CHECKLIST DE UNIFICACIÓN

### Fase 1: Configuración Global ✅

- [ ] Crear archivo de variables CSS (o Tailwind config)
- [ ] Centralizar colores en `:root`
- [ ] Validar que main.css importa todas las variables

### Fase 2: Páginas Secundarias 🔄

- [ ] `/about` - Unificar botones, cards, tipografía
- [ ] `/pricing` - Ajustar paleta de colores, cards
- [ ] `/contact` - Sincronizar colores y tipografía
- [ ] `/service` → `/service2` - Unificar componentes
- [ ] `/blog` (todas variantes) - Tipografía y cards
- [ ] `/case` (todas variantes) - Colores y estructura
- [ ] `/faq` - Colores de acento
- [ ] `/testimonial` - Cards y tipografía
- [ ] `/planes` - Aplicar sistema completo (nueva)

### Fase 3: Validación 📋

- [ ] Verificar contraste WCAG AA (mínimo 4.5:1 para texto)
- [ ] Revisar responsive en mobile/tablet
- [ ] Prueba visual en navegador
- [ ] Comparar side-by-side con home3

---

## 9. NOTAS TÉCNICAS

### Implementación Recomendada

1. Las variables de color ya existen en CSS custom properties (--var)
2. Main.css es el source of truth
3. Los componentes React heredan estilos vía className
4. No hay Tailwind config (usando CSS puro)

### Prioridad Alta

- Unificar `.theme-btn*` usage en todas las páginas
- Asegurar `.f-fs-*` y `.fw-*` consistency
- Colores de fondo alternado en secciones
- Headers de sección con mismo patrón

---

**Actualización:** 2026-06-14  
**Próximo paso:** Auditar `/about` y aplicar unificación
