/**
 * DETECCIÓN AUTOMÁTICA DE TIPOLOGÍA Y NIVEL WEB
 *
 * Sistema heurístico que clasifica URLs en:
 * - tipologia: home, categoría, producto, blog, landing, estático, listado, perfil
 * - nivel: 1 (home) | 2 (categoría) | 3 (detalle/producto/artículo)
 *
 * La precisión aumenta al analizar:
 * 1. Estructura URL (path segments)
 * 2. Patrones comunes de CMS/ecommerce
 * 3. Contenido HTML (selectores DOM específicos)
 */

interface TypologyResult {
  tipologia: string;
  nivel: number;
  confidence: number;
  rules_applied: string[];
}

/**
 * Detecta tipología y nivel web combinando análisis de URL y HTML
 */
export function detectarTipologiaYWebLevel(
  urlStr: string,
  htmlContent: string,
): TypologyResult {
  try {
    const url = new URL(urlStr);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const hostname = url.hostname;

    const rulesApplied: string[] = [];
    let tipologia = "estatico";
    let nivel = 2;
    let confidence = 0.5;

    // ============================================
    // REGLA 1: Detectar HOME (nivel 1)
    // ============================================
    if (pathSegments.length === 0 || pathSegments[0] === "") {
      rulesApplied.push("home_by_empty_path");
      return {
        tipologia: "home",
        nivel: 1,
        confidence: 1.0,
        rules_applied: rulesApplied,
      };
    }

    // ============================================
    // REGLA 2: Detectar BLOG y ARTÍCULOS
    // ============================================
    const blogPatterns = [
      "blog",
      "posts",
      "articles",
      "news",
      "noticias",
      "articulos",
      "entrada",
      "post",
    ];
    const isBlogPath = blogPatterns.some((pattern) =>
      pathSegments.some((seg) => seg.toLowerCase().includes(pattern)),
    );

    const hasArticleMarkup =
      htmlContent.includes("<article") ||
      htmlContent.includes('data-type="article"') ||
      htmlContent.includes('class="article') ||
      (htmlContent.includes("og:type") && htmlContent.includes("article"));

    const hasAuthorInfo =
      htmlContent.includes("author") ||
      htmlContent.includes("byline") ||
      htmlContent.includes("published") ||
      htmlContent.includes("date-published");

    if (isBlogPath || (hasArticleMarkup && hasAuthorInfo)) {
      rulesApplied.push("blog_detection_by_path_or_markup");
      // Blog en nivel 2 (listado de artículos) o nivel 3 (artículo individual)
      nivel = pathSegments.length >= 3 ? 3 : 2;
      tipologia = pathSegments.length >= 3 ? "blog" : "blog";
      confidence = 0.95;
      return { tipologia, nivel, confidence, rules_applied: rulesApplied };
    }

    // ============================================
    // REGLA 3: Detectar PRODUCTO (carrito, precio, variantes)
    // ============================================
    const cartPatterns = [
      "add-to-cart",
      "btn-cart",
      "comprar",
      "add_cart",
      "addtocart",
      "add-product",
      "product-add",
      "cart-button",
      "checkout",
      "data-product-id",
      "product_id",
      "sku",
      "variant",
    ];

    const pricePatterns = [
      "price",
      "precio",
      "cost",
      "costo",
      "$",
      "€",
      "£",
      "sale-price",
      "regular-price",
      "data-price",
      "amount",
    ];

    const hasCartElement = cartPatterns.some((pattern) =>
      htmlContent.toLowerCase().includes(pattern),
    );

    const hasPriceElement = pricePatterns.some((pattern) =>
      htmlContent.toLowerCase().includes(pattern),
    );

    const hasProductSchema =
      htmlContent.includes("schema.org/Product") ||
      (htmlContent.includes("Product") && htmlContent.includes("offers"));

    // Si detect carrito o precio + schema, es producto
    if (
      (hasCartElement || (hasPriceElement && hasProductSchema)) &&
      pathSegments.length >= 2
    ) {
      rulesApplied.push("producto_detection_by_cart_price_schema");
      tipologia = "producto";
      nivel = 3;
      confidence = 0.98;
      return { tipologia, nivel, confidence, rules_applied: rulesApplied };
    }

    // ============================================
    // REGLA 4: Detectar CATEGORÍA (listado de productos)
    // ============================================
    const categoryPatterns = [
      "category",
      "categoria",
      "categories",
      "shop",
      "tienda",
      "productos",
      "items",
      "collection",
      "coleccion",
    ];

    const isCategoryPath = categoryPatterns.some((pattern) =>
      pathSegments.some((seg) => seg.toLowerCase().includes(pattern)),
    );

    const hasGridLayout =
      htmlContent.includes("grid") ||
      htmlContent.includes("product-grid") ||
      htmlContent.includes("product-list") ||
      htmlContent.includes("products-grid");

    const hasPagination =
      htmlContent.includes("pagination") ||
      htmlContent.includes("page=") ||
      htmlContent.includes("paged") ||
      (htmlContent.includes("next") && htmlContent.includes("prev"));

    const hasMultipleProducts =
      (htmlContent.match(/product/gi) || []).length > 3;

    if (
      isCategoryPath ||
      (hasGridLayout && (hasPagination || hasMultipleProducts))
    ) {
      rulesApplied.push("categoria_detection_by_path_grid_pagination");
      tipologia = "categoria";
      nivel = 2;
      confidence = 0.9;
      return { tipologia, nivel, confidence, rules_applied: rulesApplied };
    }

    // ============================================
    // REGLA 5: Detectar LANDING PAGE
    // ============================================
    const landingPatterns = [
      "landing",
      "campaign",
      "campaña",
      "offer",
      "oferta",
      "promo",
      "promocion",
      "special",
    ];

    const isLandingPath = landingPatterns.some((pattern) =>
      pathSegments.some((seg) => seg.toLowerCase().includes(pattern)),
    );

    const hasCTA =
      htmlContent.includes("call-to-action") ||
      htmlContent.includes("cta-") ||
      htmlContent.includes("sign-up") ||
      htmlContent.includes("registro") ||
      htmlContent.includes("contact-form");

    const hasHeroSection =
      htmlContent.includes("hero") ||
      htmlContent.includes("banner") ||
      htmlContent.includes("jumbotron");

    if (
      isLandingPath ||
      (hasCTA && hasHeroSection && pathSegments.length <= 2)
    ) {
      rulesApplied.push("landing_detection_by_path_cta_hero");
      tipologia = "landing";
      nivel = 2;
      confidence = 0.85;
      return { tipologia, nivel, confidence, rules_applied: rulesApplied };
    }

    // ============================================
    // REGLA 6: Detectar PERFIL o USUARIO
    // ============================================
    const profilePatterns = [
      "profile",
      "perfil",
      "user",
      "usuario",
      "account",
      "member",
      "miembro",
      "author",
      "about",
    ];

    const isProfilePath = profilePatterns.some((pattern) =>
      pathSegments.some((seg) => seg.toLowerCase().includes(pattern)),
    );

    const hasProfileMarkup =
      htmlContent.includes("profile") ||
      htmlContent.includes("user-info") ||
      htmlContent.includes("avatar") ||
      htmlContent.includes("bio");

    if (isProfilePath || (hasProfileMarkup && pathSegments.length >= 2)) {
      rulesApplied.push("perfil_detection_by_path_markup");
      tipologia = "perfil";
      nivel = 3;
      confidence = 0.8;
      return { tipologia, nivel, confidence, rules_applied: rulesApplied };
    }

    // ============================================
    // REGLA 7: LISTADO (múltiples items sin grid)
    // ============================================
    if (hasMultipleProducts && hasPagination && !hasGridLayout) {
      rulesApplied.push("listado_detection_by_multiple_items_pagination");
      tipologia = "listado";
      nivel = 2;
      confidence = 0.75;
      return { tipologia, nivel, confidence, rules_applied: rulesApplied };
    }

    // ============================================
    // REGLA 8: Por defecto basado en profundidad
    // ============================================
    if (pathSegments.length === 1) {
      rulesApplied.push("default_single_segment");
      tipologia = "categoria";
      nivel = 2;
      confidence = 0.6;
    } else if (pathSegments.length === 2) {
      rulesApplied.push("default_two_segments");
      tipologia = "categoria";
      nivel = 2;
      confidence = 0.65;
    } else {
      rulesApplied.push("default_deep_path");
      tipologia = "producto";
      nivel = 3;
      confidence = 0.55;
    }

    return { tipologia, nivel, confidence, rules_applied: rulesApplied };
  } catch (error) {
    console.error("Error en detección de tipología:", error);
    return {
      tipologia: "estatico",
      nivel: 2,
      confidence: 0.0,
      rules_applied: ["error_fallback"],
    };
  }
}

/**
 * Valida que la tipología sea una de las válidas del sistema
 */
export function isValidTipologia(tipologia: string): boolean {
  const validTipologias = [
    "home",
    "categoria",
    "producto",
    "blog",
    "landing",
    "estatico",
    "listado",
    "perfil",
  ];
  return validTipologias.includes(tipologia.toLowerCase());
}

/**
 * Normaliza la tipología a minúsculas y valida
 */
export function normalizeTipologia(tipologia: string): string {
  const normalized = tipologia.toLowerCase();
  return isValidTipologia(normalized) ? normalized : "estatico";
}

/**
 * Obtiene la descripción en español de una tipología
 */
export function getTipologiaLabel(tipologia: string): string {
  const labels: Record<string, string> = {
    home: "Página de Inicio",
    categoria: "Categoría",
    producto: "Producto / Detalle",
    blog: "Artículo / Blog",
    landing: "Landing Page",
    estatico: "Página Estática",
    listado: "Listado",
    perfil: "Perfil / Usuario",
  };
  return labels[tipologia.toLowerCase()] || "Desconocido";
}
