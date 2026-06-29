import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-client";

export async function GET() {
  try {
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
          details: error.details,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Supabase connection OK",
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
