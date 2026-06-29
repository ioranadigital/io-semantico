import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const csvContent = `keyword,nivel,volumen,url_asignada
"Palabra clave principal",level1_entity_core,2400,https://misite.com
"Palabra clave secundaria",level2_local,1800,https://misite.com/pagina
"Búsqueda informativa",level3_educational_howto,1200,https://misite.com/blog
"Palabra clave de intención comercial",level4_comparative_vs,890,https://misite.com/productos
"Long-tail específico",level5_longtail_transactional,450,https://misite.com/oferta
"Palabra prohibida",level6_banned_words,0,`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="plantilla-keywords.csv"',
      },
    });
  } catch (err) {
    console.error("Error generating template:", err);
    return NextResponse.json(
      { error: "Error generating template" },
      { status: 500 },
    );
  }
}
