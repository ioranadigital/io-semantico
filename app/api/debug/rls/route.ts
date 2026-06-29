import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // Crear cliente con anon key (como hace el frontend)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          status: "error",
          error: "Missing Supabase credentials",
        },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Intenta leer con la anon key
    const { data, error } = await supabase
      .from("io_sem_clientes")
      .select("*")
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          error: error.message,
          code: error.code,
          hint: "Posible problema de RLS o permisos",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: "success",
      message: "RLS check OK - Puedes leer la tabla",
      data,
    });
  } catch (err) {
    return NextResponse.json(
      {
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
