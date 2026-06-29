import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scrapePage, formatScrapedPageForLogging } from "@/core/scraper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let {
      url,
      htmlContent,
      cliente_id,
      guardar_en_bd = true,
      fetch_html = false,
    } = body;

    // Validar inputs
    if (!url) {
      return NextResponse.json({ error: "url es requerida" }, { status: 400 });
    }

    if (!cliente_id) {
      return NextResponse.json(
        { error: "cliente_id es requerido" },
        { status: 400 },
      );
    }

    // Si no se proporciona htmlContent, descargar desde la URL
    if (!htmlContent || fetch_html) {
      console.log(`[SCRAPE] Descargando HTML de: ${url}`);
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        htmlContent = await response.text();

        if (!htmlContent || htmlContent.length < 100) {
          throw new Error("HTML vacío o muy pequeño");
        }

        console.log(`[SCRAPE] HTML descargado: ${htmlContent.length} bytes`);
      } catch (fetchErr) {
        console.error("[FETCH ERROR]", fetchErr);
        return NextResponse.json(
          {
            error: "No se pudo descargar la URL",
            details:
              fetchErr instanceof Error
                ? fetchErr.message
                : "Error desconocido",
          },
          { status: 400 },
        );
      }
    }

    // PASO 1: Scrape automático con detección de tipología
    console.log(`[SCRAPE] Procesando: ${url}`);
    const scrapedData = await scrapePage(url, htmlContent);

    console.log(formatScrapedPageForLogging(scrapedData));

    // PASO 2: Guardar en Supabase si se solicita
    if (guardar_en_bd) {
      const { error: upsertError, data } = await supabase
        .from("io_sem_urls_rastreadas")
        .upsert(
          {
            cliente_id,
            url_actual: url,
            tipologia: scrapedData.tipologia,
            meta_title_actual: scrapedData.meta_title,
            meta_description_actual: scrapedData.meta_description,
            h1_1_actual: scrapedData.h1_1,
            h1_2_actual: scrapedData.h1_2,
            h2_actual: scrapedData.h2,
            h2_2_actual: scrapedData.h2_2,
            // Campos adicionales para auditoría
            metadata: {
              tipologia_confidence: scrapedData.tipologia_confidence,
              nivel: scrapedData.nivel,
              tipologia_rules: scrapedData.tipologia_rules,
              language: scrapedData.language,
              charset: scrapedData.charset,
              scraped_at: scrapedData.scraped_at,
            },
          },
          {
            onConflict: "url_actual,cliente_id",
          },
        )
        .select();

      if (upsertError) {
        console.error("Error saving to Supabase:", upsertError);
        return NextResponse.json(
          { error: "Error guardando en BD", details: upsertError.message },
          { status: 500 },
        );
      }

      console.log(
        `[DB] URL guardada: ${url} con tipología: ${scrapedData.tipologia}`,
      );
    }

    // PASO 3: Retornar resultado completo
    return NextResponse.json({
      status: "success",
      scrape_result: scrapedData,
      message: `URL procesada correctamente. Tipología detectada: ${scrapedData.tipologia} (nivel ${scrapedData.nivel}, confianza ${(scrapedData.tipologia_confidence * 100).toFixed(0)}%)`,
    });
  } catch (error) {
    console.error("[SCRAPE ERROR]", error);
    return NextResponse.json(
      {
        error: "Error en scraping",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/**
 * GET: Health check y documentación
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/scrape",
    method: "POST",
    description: "Scrape automático con detección de tipología",
    required_fields: {
      url: "string - URL a scrapear",
      cliente_id: "string - ID del cliente en Supabase",
    },
    optional_fields: {
      htmlContent:
        "string - Contenido HTML (si no se proporciona, se descarga automáticamente)",
      guardar_en_bd: "boolean - Guardar en Supabase (default: true)",
      fetch_html:
        "boolean - Forzar descargar HTML del servidor (default: false)",
    },
    example_request_opcion1: {
      description: "Enviar solo URL - el servidor descargará el HTML",
      url: "https://esgarden.es/",
      cliente_id: "uuid-aqui",
      guardar_en_bd: true,
    },
    example_request_opcion2: {
      description: "Enviar HTML pre-descargado",
      url: "https://example.com/products/item-123",
      htmlContent: "<html>...</html>",
      cliente_id: "uuid-aqui",
    },
    example_response: {
      status: "success",
      scrape_result: {
        url: "https://example.com/products/item-123",
        tipologia: "producto",
        nivel: 3,
        tipologia_confidence: 0.98,
        tipologia_rules: ["producto_detection_by_cart_price_schema"],
        meta_title: "Producto XYZ - Tienda Online",
        meta_description: "Descripción del producto",
        h1_1: "Producto XYZ",
        language: "es",
        charset: "utf-8",
        scraped_at: "2026-06-11T10:30:00Z",
      },
    },
  });
}
