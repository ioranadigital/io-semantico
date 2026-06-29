/**
 * MÓDULO SCRAPER PRINCIPAL
 *
 * Responsabilidades:
 * 1. Obtener contenido HTML de una URL
 * 2. Aplicar detección de tipología automática
 * 3. Extraer metadatos relevantes (title, description, h1, etc.)
 * 4. Estructurar datos para análisis posterior
 */

import { detectarTipologiaYWebLevel } from "./typology-detector";

export interface ScrapedPage {
  url: string;
  tipologia: string;
  tipologia_confidence: number;
  nivel: number;
  tipologia_rules: string[];
  meta_title?: string;
  meta_description?: string;
  h1_1?: string;
  h1_2?: string;
  h2?: string;
  h2_2?: string;
  content_preview?: string;
  language?: string;
  charset?: string;
  scraped_at: string;
  raw_html?: string; // Opcional: guardar HTML completo
}

/**
 * Extrae metadatos del HTML usando expresiones regulares
 * (alternativa a parse si no queremos agregar dependencias)
 */
function extractMetadata(htmlContent: string): {
  title?: string;
  description?: string;
  h1_1?: string;
  h1_2?: string;
  h2?: string;
  h2_2?: string;
  language?: string;
  charset?: string;
  preview?: string;
} {
  const result: any = {};

  // Meta title
  const titleMatch = htmlContent.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) result.title = titleMatch[1].trim();

  // Meta description
  const descMatch = htmlContent.match(
    /<meta\s+name=["']?description["']?\s+content=["']?([^"']+)["']?/i,
  );
  if (descMatch) result.description = descMatch[1].trim();

  // H1 tags (máximo 2)
  const h1Matches = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (h1Matches) {
    result.h1_1 = h1Matches[0]?.replace(/<[^>]*>/g, "").trim();
    result.h1_2 = h1Matches[1]?.replace(/<[^>]*>/g, "").trim();
  }

  // H2 tags (máximo 2)
  const h2Matches = htmlContent.match(/<h2[^>]*>([^<]+)<\/h2>/gi);
  if (h2Matches) {
    result.h2 = h2Matches[0]?.replace(/<[^>]*>/g, "").trim();
    result.h2_2 = h2Matches[1]?.replace(/<[^>]*>/g, "").trim();
  }

  // Language
  const langMatch = htmlContent.match(/lang=["']?([a-z]{2}(?:-[A-Z]{2})?)/i);
  if (langMatch) result.language = langMatch[1];

  // Charset
  const charsetMatch = htmlContent.match(/charset=["']?([^"'\s;]+)/i);
  if (charsetMatch) result.charset = charsetMatch[1];

  // Content preview (primeros 200 caracteres de texto)
  const textMatch = htmlContent.match(/<body[^>]*>(.*?)<\/body>/is);
  if (textMatch) {
    const plainText = textMatch[1]
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    result.preview = plainText.substring(0, 200);
  }

  return result;
}

/**
 * Scrape completo: obtiene contenido, detecta tipología, extrae metadatos
 */
export async function scrapePage(
  urlStr: string,
  htmlContent: string,
  options?: {
    includeRawHtml?: boolean;
  },
): Promise<ScrapedPage> {
  try {
    // Validar URL
    const url = new URL(urlStr);

    // PASO 1: Detectar tipología automática
    const typologyResult = detectarTipologiaYWebLevel(urlStr, htmlContent);

    // PASO 2: Extraer metadatos
    const metadata = extractMetadata(htmlContent);

    // PASO 3: Estructurar respuesta
    const scrapedPage: ScrapedPage = {
      url: url.href,
      tipologia: typologyResult.tipologia,
      tipologia_confidence: typologyResult.confidence,
      nivel: typologyResult.nivel,
      tipologia_rules: typologyResult.rules_applied,
      meta_title: metadata.title,
      meta_description: metadata.description,
      h1_1: metadata.h1_1,
      h1_2: metadata.h1_2,
      h2: metadata.h2,
      h2_2: metadata.h2_2,
      language: metadata.language || "es",
      charset: metadata.charset || "utf-8",
      content_preview: metadata.preview,
      scraped_at: new Date().toISOString(),
    };

    // Opción: incluir HTML completo si se solicita
    if (options?.includeRawHtml) {
      scrapedPage.raw_html = htmlContent;
    }

    return scrapedPage;
  } catch (error) {
    console.error("Error en scrapePage:", error);
    throw new Error(
      `Scraping error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Scrape en batch: procesa múltiples URLs
 */
export async function scrapeBatch(
  urls: Array<{ url: string; htmlContent: string }>,
  options?: {
    includeRawHtml?: boolean;
  },
): Promise<ScrapedPage[]> {
  return Promise.all(
    urls.map((item) => scrapePage(item.url, item.htmlContent, options)),
  );
}

/**
 * Formatea el resultado para mostrar en logs (debugging)
 */
export function formatScrapedPageForLogging(page: ScrapedPage): string {
  return `
  [SCRAPE RESULT]
  URL: ${page.url}
  Tipología: ${page.tipologia} (nivel ${page.nivel}, conf: ${(page.tipologia_confidence * 100).toFixed(0)}%)
  Rules: ${page.tipologia_rules.join(", ")}
  Title: ${page.meta_title || "N/A"}
  Description: ${page.meta_description?.substring(0, 50) || "N/A"}...
  H1: ${page.h1_1 || "N/A"}
  Language: ${page.language}
  `;
}
