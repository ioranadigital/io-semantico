const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://zvehtloitnuglyjtxwye.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNzY4MjQsImV4cCI6MjA5MDY1MjgyNH0.GX6YTzPVsUpigT-DDC2FVA4D4o70qILUUt5pqjZ6pWI",
);

async function debug() {
  console.log("Buscando clientes...");
  const { data: clientes } = await supabase
    .from("io_sem_clientes")
    .select("id, nombre");
  console.log("Clientes:", clientes?.length || 0);

  if (clientes && clientes.length > 0) {
    clientes.forEach((c) => console.log(`  - ${c.nombre} (${c.id})`));

    const clientId = clientes[0].id;
    console.log(`\nBuscando URLs para: ${clientId}`);

    const { data: urls, error } = await supabase
      .from("io_sem_urls_rastreadas")
      .select("id, url_actual, tipologia, cliente_id")
      .eq("cliente_id", clientId);

    if (error) console.log("Error:", error.message);
    else console.log(`URLs encontradas: ${urls?.length || 0}`);

    if (urls && urls.length > 0) {
      urls.forEach((u) => console.log(`  - ${u.url_actual} (${u.tipologia})`));
    }
  }
}

debug().catch((e) => console.error(e));
