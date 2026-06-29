import { NextRequest, NextResponse } from "next/server";
import { Anthropic } from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cliente_id, url_id } = body;

    if (!cliente_id || !url_id) {
      return NextResponse.json(
        { error: "cliente_id y url_id son requeridos" },
        { status: 400 },
      );
    }

    // 1. Obtener URL + metadatos
    const { data: urlData, error: urlError } = await supabase
      .from("io_sem_urls_rastreadas")
      .select(
        "id, url, meta_title, meta_description, h1, h1_2, h2, h2_2, tipologia, cliente_id",
      )
      .eq("id", url_id)
      .eq("cliente_id", cliente_id)
      .single();

    if (urlError || !urlData) {
      return NextResponse.json({ error: "URL no encontrada" }, { status: 404 });
    }

    // 2. Obtener keywords asignadas a esta URL
    const { data: asignaciones, error: asignacionesError } = await supabase
      .from("io_sem_asignaciones_kw_url")
      .select(
        `
        keyword_id,
        io_sem_palabras_clave:keyword_id(palabra_clave, nivel)
      `,
      )
      .eq("url_id", url_id)
      .eq("cliente_id", cliente_id)
      .eq("estado", "confirmada");

    if (asignacionesError) {
      return NextResponse.json(
        { error: "Error al obtener keywords" },
        { status: 500 },
      );
    }

    const keywords =
      asignaciones?.map((a: any) => ({
        id: a.keyword_id,
        palabra_clave: a.io_sem_palabras_clave.palabra_clave,
        nivel: a.io_sem_palabras_clave.nivel,
      })) || [];

    const topKeywords = selectTopKeywords(keywords);

    // 3. Obtener restricciones de nivel 6 del cliente
    const { data: restricciones, error: restriccionesError } = await supabase
      .from("io_sem_cliente_restricciones")
      .select("palabras_prohibidas")
      .eq("cliente_id", cliente_id)
      .single();

    const bannedWords = restricciones?.palabras_prohibidas || [];

    // 4. Construir prompt para Claude
    const systemPrompt = buildSystemPrompt(topKeywords, bannedWords);
    const userPrompt = buildUserPrompt(urlData, topKeywords);

    // 5. Llamar a Claude
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const optimizationText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // 6. Validar Level6
    if (!validateLevel6(optimizationText, bannedWords)) {
      return NextResponse.json(
        { error: "Propuesta contiene palabras prohibidas" },
        { status: 400 },
      );
    }

    // 7. Guardar en optimizaciones
    const { data: optimization, error: saveError } = await supabase
      .from("io_sem_optimizaciones")
      .insert({
        cliente_id,
        url_id,
        propuesta_json: parseOptimizationResponse(optimizationText),
        estado: "generada",
        creado_en: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) {
      return NextResponse.json(
        { error: "Error al guardar optimización" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      status: "success",
      optimization: optimization,
      raw_response: optimizationText,
    });
  } catch (err) {
    console.error("Error en optimización:", err);
    return NextResponse.json(
      { error: "Error procesando optimización" },
      { status: 500 },
    );
  }
}

/**
 * Limita keywords a máximo 6 con prioridad:
 * 1-2 Level1 (Core/Brand)
 * 1-2 Level2/Level5 (Segmentación o Long-tail)
 * Resto: Level3/4 (Intención)
 */
function selectTopKeywords(keywords: any[]): any[] {
  const level1 = keywords
    .filter((k) => k.nivel.startsWith("level1"))
    .slice(0, 2);
  const level25 = keywords
    .filter((k) => k.nivel.startsWith("level2") || k.nivel.startsWith("level5"))
    .slice(0, 2);
  const level34 = keywords
    .filter((k) => k.nivel.startsWith("level3") || k.nivel.startsWith("level4"))
    .slice(0, 2);

  return [...level1, ...level25, ...level34].slice(0, 6);
}

/**
 * Valida que el nivel6 no aparezca en la salida de Claude
 */
function validateLevel6(text: string, bannedWords: string[]): boolean {
  if (!bannedWords || bannedWords.length === 0) return true;
  const regex = new RegExp(bannedWords.join("|"), "gi");
  return !regex.test(text);
}

function buildSystemPrompt(keywords: any[], bannedWords: string[]): string {
  return `Eres un experto en optimización SEO semántica. Tu tarea es generar propuestas de optimización para URLs basadas en su jerarquía de palabras clave.

## Keywords Objetivo
${keywords.map((k) => `- ${k.palabra_clave} (${k.nivel})`).join("\n")}

## Restricciones (Nivel 6 - Prohibidas)
${bannedWords.length > 0 ? bannedWords.join(", ") : "Ninguna restricción especial"}

## Directrices
1. Optimiza Meta Title (máx 60 caracteres)
2. Optimiza Meta Description (máx 160 caracteres)
3. Sugiere H1 principal que incluya keyword core
4. Sugiere H2 secundarios para subcategorías
5. Incluye propuestas de contenido adicional
6. NUNCA uses las palabras prohibidas

## Formato de Salida
Responde en JSON con esta estructura:
{
  "meta_title": "...",
  "meta_description": "...",
  "h1": "...",
  "h2_list": ["...", "..."],
  "content_suggestions": ["...", "..."],
  "priority": "high|medium|low"
}`;
}

function buildUserPrompt(urlData: any, keywords: any[]): string {
  return `Optimiza esta URL:

URL: ${urlData.url}
Tipología: ${urlData.tipologia || "No especificado"}

## Estado Actual
- Meta Title: ${urlData.meta_title || "No definido"}
- Meta Description: ${urlData.meta_description || "No definido"}
- H1: ${urlData.h1 || "No definido"}
- H2: ${urlData.h2 || "No definido"}

## Keywords a Integrar
${keywords.map((k) => `- ${k.palabra_clave}`).join("\n")}

Genera propuestas de optimización que integren estas keywords naturalmente.`;
}

function parseOptimizationResponse(response: string): Record<string, any> {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("Error parsing optimization response:", e);
  }

  return {
    raw_response: response,
    parsed: false,
  };
}
