-- ============================================================
-- ESGARDEN PILOT DATA - 69 URLs + 18 Keywords
-- ============================================================
-- Insert cliente ESGARDEN
INSERT INTO io_sem_clientes (nombre, url, descripcion)
VALUES (
  'ESGARDEN',
  'https://esgarden.com',
  'Tienda online especializada en barbacoas, parrillas y accesorios de exterior'
)
ON CONFLICT (nombre) DO NOTHING;

-- Get cliente ID (for reference in subsequent inserts)
-- SELECT id FROM io_sem_clientes WHERE nombre = 'ESGARDEN' LIMIT 1;

-- ============================================================
-- INSERT KEYWORDS (18 total)
-- ============================================================

-- Level 1: Core/Brand (2)
INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'barbacoas', 'level1', 'informacional', 8900, 45
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'esgarden barbacoas', 'level1', 'navegacional', 320, 15
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

-- Level 2: Segmentación (2)
INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'barbacoas gas', 'level2', 'transaccional', 1200, 55
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'parrillas carbón', 'level2', 'transaccional', 890, 60
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

-- Level 3: Educacional/How-to (4)
INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'cómo usar barbacoa', 'level3', 'informacional', 650, 35
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'limpieza barbacoa', 'level3', 'informacional', 420, 30
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'mantenimiento parrilla', 'level3', 'informacional', 380, 28
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'recipes barbacoa', 'level3', 'informacional', 1100, 40
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

-- Level 4: Comparativo/Commercial (3)
INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'barbacoa gas vs carbón', 'level4', 'informacional', 560, 42
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'mejores barbacoas', 'level4', 'informacional', 1800, 65
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'barbacoa portatil', 'level4', 'transaccional', 420, 50
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

-- Level 5: Long-tail (5)
INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'barbacoa acero inoxidable', 'level5', 'transaccional', 280, 48
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'parrilla infrarrojo', 'level5', 'transaccional', 150, 55
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'fundas barbacoa impermeable', 'level5', 'transaccional', 190, 38
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'accesorios barbacoa premium', 'level5', 'transaccional', 220, 45
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

INSERT INTO io_sem_palabras_clave (cliente_id, palabra_clave, nivel, intension, volumen_busqueda, dificultad)
SELECT id, 'ropa protección barbacoa', 'level5', 'transaccional', 110, 40
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
ON CONFLICT DO NOTHING;

-- ============================================================
-- INSERT URLs (69 total)
-- ============================================================

-- HOME (1 URL)
INSERT INTO io_sem_urls_rastreadas (cliente_id, url, h1, meta_title, meta_description, tipologia)
SELECT id, 'https://esgarden.com/', 'Barbacoas y Parrillas de Calidad | ESGARDEN', 'Tienda Online de Barbacoas - ESGARDEN', 'Descubre nuestras barbacoas y parrillas. Envío gratis a toda España.', 'home'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN';

-- CATEGORÍAS PRINCIPALES (6 URLs)
INSERT INTO io_sem_urls_rastreadas (cliente_id, url, h1, meta_title, meta_description, tipologia)
SELECT id, 'https://esgarden.com/barbacoas/', 'Barbacoas | Comprar Online', 'Barbacoas - ESGARDEN', 'Amplio catálogo de barbacoas de gas, carbón y electricidad.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/parrillas/', 'Parrillas Profesionales', 'Parrillas - ESGARDEN', 'Parrillas de acero inoxidable para toda ocasión.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/accesorios/', 'Accesorios Barbacoa', 'Accesorios - ESGARDEN', 'Fundas, cubiertas y accesorios para barbacoas.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/', 'Blog de Barbacoas', 'Blog - ESGARDEN', 'Consejos y guías sobre barbacoas y parrillas.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/ofertas/', 'Ofertas Especiales', 'Ofertas - ESGARDEN', 'Descuentos en barbacoas y parrillas seleccionadas.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/nosotros/', 'Sobre ESGARDEN', 'Nosotros - ESGARDEN', 'Conoce la historia y valores de ESGARDEN.', 'estatico';

-- SUBCATEGORÍAS (8 URLs)
INSERT INTO io_sem_urls_rastreadas (cliente_id, url, h1, meta_title, meta_description, tipologia)
SELECT id, 'https://esgarden.com/barbacoas/gas/', 'Barbacoas de Gas', 'Barbacoas de Gas - ESGARDEN', 'Barbacoas a gas de las mejores marcas.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/barbacoas/carbon/', 'Barbacoas de Carbón', 'Barbacoas de Carbón - ESGARDEN', 'Barbacoas de carbón clásicas y modernas.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/barbacoas/portatiles/', 'Barbacoas Portátiles', 'Barbacoas Portátiles - ESGARDEN', 'Barbacoas compactas para cualquier lugar.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/parrillas/acero-inoxidable/', 'Parrillas Acero Inoxidable', 'Parrillas Acero - ESGARDEN', 'Parrillas profesionales de acero inoxidable.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/parrillas/infrarrojo/', 'Parrillas Infrarrojo', 'Parrillas Infrarrojo - ESGARDEN', 'Parrillas con tecnología de infrarrojo.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/accesorios/fundas/', 'Fundas para Barbacoas', 'Fundas - ESGARDEN', 'Fundas impermeables y protectoras.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/accesorios/limpieza/', 'Productos Limpieza', 'Limpieza - ESGARDEN', 'Kits y productos para limpiar barbacoas.', 'categoria'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/accesorios/herramientas/', 'Herramientas Barbacoa', 'Herramientas - ESGARDEN', 'Herramientas profesionales para barbacoas.', 'categoria';

-- PRODUCTOS (30 URLs)
INSERT INTO io_sem_urls_rastreadas (cliente_id, url, h1, meta_title, meta_description, tipologia)
SELECT id, 'https://esgarden.com/productos/weber-master-touch/', 'Barbacoa Weber Master Touch', 'Weber Master Touch - ESGARDEN', 'Barbacoa gas Weber Master Touch. Compra online.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/landmann-kg/', 'Barbacoa Landmann KG68', 'Landmann KG - ESGARDEN', 'Barbacoa Landmann KG68 de gas. La mejor opción.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/kamado-joe/', 'Kamado Joe XL', 'Kamado Joe - ESGARDEN', 'Kamado Joe XL. Parrilla de cerámica premium.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/evicook/', 'Barbacoa Evicook Premium', 'Evicook Premium - ESGARDEN', 'Barbacoa Evicook Premium. Acero inoxidable.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/outdoorchef/', 'Parrilla Outdoorchef Grill', 'Outdoorchef - ESGARDEN', 'Parrilla Outdoorchef Grill 570. Comprar online.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/grill-pro/', 'Barbacoa Grill Pro Inox', 'Grill Pro - ESGARDEN', 'Barbacoa Grill Pro con estructura inoxidable.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/blooma-prestige/', 'Blooma Prestige BBQ', 'Blooma Prestige - ESGARDEN', 'Barbacoa Blooma Prestige. Relación calidad-precio.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/aeg-gasgrill/', 'AEG Gasgrill ProfiChef', 'AEG ProfiChef - ESGARDEN', 'Barbacoa AEG ProfiChef. Lujo en tu jardín.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/bbq-24/', 'BBQ-24 Deluxe Smoker', 'BBQ-24 Smoker - ESGARDEN', 'BBQ-24 Smoker. Ahumador profesional.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/funda-impermeable/', 'Funda Barbacoa Impermeable', 'Funda Impermeable - ESGARDEN', 'Funda protectora impermeable para barbacoas.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/kit-limpieza/', 'Kit Limpieza Barbacoa', 'Kit Limpieza - ESGARDEN', 'Kit completo de limpieza para barbacoas.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/termometro-digital/', 'Termómetro Digital WiFi', 'Termómetro WiFi - ESGARDEN', 'Termómetro inteligente con control WiFi.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/pinzas-acero/', 'Pinzas Acero Inoxidable', 'Pinzas Acero - ESGARDEN', 'Pinzas profesionales de acero inoxidable.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/brocha-limpieza/', 'Brocha Limpieza Rejilla', 'Brocha - ESGARDEN', 'Brocha profesional para limpiar rejillas.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/gas-propano/', 'Botella Gas Propano 10kg', 'Gas Propano - ESGARDEN', 'Botella de gas propano para barbacoas.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/carbon-vegetal/', 'Carbón Vegetal Premium', 'Carbón - ESGARDEN', 'Carbón vegetal de alta calidad.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/ahumador-portatil/', 'Ahumador Portátil', 'Ahumador - ESGARDEN', 'Ahumador compacto y portátil.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/rejilla-grill/', 'Rejilla Cast Iron', 'Rejilla Cast Iron - ESGARDEN', 'Rejilla de hierro fundido para mayor durabilidad.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/piedra-pizza/', 'Piedra Pizza Barbacoa', 'Piedra Pizza - ESGARDEN', 'Piedra refractaria para pizza en barbacoa.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/camaras-humo/', 'Cámaras Humo', 'Cámaras Humo - ESGARDEN', 'Cámaras de humo para ahumadores.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/tabla-corte/', 'Tabla Corte Madera', 'Tabla Madera - ESGARDEN', 'Tabla de corte de madera de roble.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/porta-botellas/', 'Porta Botellas BBQ', 'Porta Botellas - ESGARDEN', 'Organizador de botellas para barbacoa.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/estanteria-lateral/', 'Estantería Lateral', 'Estantería - ESGARDEN', 'Estantería de acero inoxidable para barbacoa.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/brazadera-soporte/', 'Brazadera Soporte Botella', 'Brazadera - ESGARDEN', 'Brazadera universal para botellas de gas.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/rotisserie/', 'Sistema Rotisserie', 'Rotisserie - ESGARDEN', 'Kit rotisserie para pollos enteros.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/rejilla-plancha/', 'Rejilla Plancha Cast', 'Plancha Cast - ESGARDEN', 'Plancha de hierro fundido para verduras.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/luz-led/', 'Iluminación LED Barbacoa', 'LED Barbacoa - ESGARDEN', 'Luces LED para barbacoas nocturnas.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/cubierta-trabajo/', 'Cubierta Trabajo Inox', 'Cubierta Trabajo - ESGARDEN', 'Cubierta de trabajo de acero inoxidable.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/barometro-analogico/', 'Barómetro Analógico', 'Barómetro - ESGARDEN', 'Barómetro profesional para control temperatura.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/productos/camaras-acero/', 'Cámaras de Humo Acero', 'Cámaras Acero - ESGARDEN', 'Cámaras de humo premium de acero.', 'producto'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN';

-- BLOG POSTS (15 URLs)
INSERT INTO io_sem_urls_rastreadas (cliente_id, url, h1, meta_title, meta_description, tipologia)
SELECT id, 'https://esgarden.com/blog/como-elegir-barbacoa/', 'Cómo Elegir la Barbacoa Perfecta', 'Guía Completa: Cómo Elegir Barbacoa', 'Descubre cómo elegir la barbacoa ideal para tu jardín.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/mantenimiento-barbacoa/', 'Mantenimiento de Barbacoa', 'Guía Mantenimiento Barbacoa', 'Tips para mantener tu barbacoa en perfecto estado.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/recetas-barbacoa/', 'Recetas Deliciosas BBQ', '10 Recetas de Barbacoa', 'Deliciosas recetas para asar en tu barbacoa.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/limpieza-profunda/', 'Limpieza Profunda de Barbacoa', 'Limpieza Profunda Paso a Paso', 'Guía completa de limpieza profunda.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/gas-vs-carbon/', 'Gas vs Carbón: Comparativa', 'Gas vs Carbón en Barbacoas', 'Comparativa: barbacoa de gas vs carbón.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/ahumador-basico/', 'Ahumado Básico para Principiantes', 'Introducción al Ahumado', 'Aprende los fundamentos del ahumado.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/maderas-ahumado/', 'Maderas Ahumado: Guía Completa', 'Tipos de Madera para Ahumar', 'Descubre qué madera usar para ahumar.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/temperatura-barbacoa/', 'Control de Temperatura', 'Cómo Controlar Temperatura BBQ', 'Técnicas para controlar temperatura perfecta.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/asado-perfecto/', 'Secretos del Asado Perfecto', 'Cómo Asar Perfecto', 'Trucos para conseguir un asado perfecto.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/marinados-barbacoa/', 'Marinados y Adobos BBQ', 'Mejores Marinados BBQ', 'Recetas de marinados y adobos.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/vinagretas-bbq/', 'Vinagretas BBQ Caseras', 'Recetas Vinagretas BBQ', 'Deliciosas vinagretas para barbacoa.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/ropa-proteccion/', 'Ropa de Protección BBQ', 'Equipo de Protección BBQ', 'Ropa y equipo de seguridad para asados.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/almacenamiento-barbacoa/', 'Almacenamiento Seguro Barbacoa', 'Cómo Guardar Barbacoa', 'Consejos para almacenar tu barbacoa.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/accesorios-imprescindibles/', 'Accesorios Imprescindibles BBQ', 'Accesorios Esenciales Barbacoa', 'Los accesorios que no pueden faltar.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/blog/invierno-barbacoa/', 'Barbacoa en Invierno', 'Asados en Invierno', 'Cómo asar en época de frío.', 'blog'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN';

-- LANDING PAGES (7 URLs)
INSERT INTO io_sem_urls_rastreadas (cliente_id, url, h1, meta_title, meta_description, tipologia)
SELECT id, 'https://esgarden.com/promo-verano/', 'Promoción Verano 2024', 'Promo Verano - ESGARDEN', 'Descuentos especiales en barbacoas para verano.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/suscripcion-newsletter/', 'Newsletter Exclusiva BBQ', 'Newsletter - ESGARDEN', 'Recibe ofertas y tips semanales.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/garantia-extendida/', 'Garantía Extendida', 'Garantía - ESGARDEN', 'Protege tu inversión con garantía extendida.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/instalacion-profesional/', 'Instalación Profesional', 'Instalación - ESGARDEN', 'Servicio de instalación experto.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/programas-lealtad/', 'Programa de Lealtad', 'Lealtad - ESGARDEN', 'Acumula puntos en cada compra.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/financiacion-disponible/', 'Financiación sin Intereses', 'Financiación - ESGARDEN', 'Compra ahora, paga después.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/cambios-devoluciones/', 'Política Cambios y Devoluciones', 'Devoluciones - ESGARDEN', 'Proceso simple de cambios y devoluciones.', 'landing'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN';

-- UTILITY (2 URLs)
INSERT INTO io_sem_urls_rastreadas (cliente_id, url, h1, meta_title, meta_description, tipologia)
SELECT id, 'https://esgarden.com/contacto/', 'Contacta con ESGARDEN', 'Contacto - ESGARDEN', 'Resuelve tus dudas. Contacto directo.', 'estatico'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN'
UNION ALL
SELECT id, 'https://esgarden.com/preguntas-frecuentes/', 'Preguntas Frecuentes', 'FAQ - ESGARDEN', 'Respuestas a las preguntas más comunes.', 'estatico'
FROM io_sem_clientes WHERE nombre = 'ESGARDEN';

-- ============================================================
-- Confirmación
-- ============================================================
SELECT
  (SELECT COUNT(*) FROM io_sem_clientes WHERE nombre = 'ESGARDEN') as clientes,
  (SELECT COUNT(*) FROM io_sem_palabras_clave WHERE cliente_id = (SELECT id FROM io_sem_clientes WHERE nombre = 'ESGARDEN')) as keywords,
  (SELECT COUNT(*) FROM io_sem_urls_rastreadas WHERE cliente_id = (SELECT id FROM io_sem_clientes WHERE nombre = 'ESGARDEN')) as urls
;
