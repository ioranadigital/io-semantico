import { createServer } from "http";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar .env si existe
const envFile = join(__dirname, ".env");
if (existsSync(envFile)) {
  readFileSync(envFile, "utf8").split("\n").forEach(line => {
    const [k, ...v] = line.split("=");
    if (k?.trim() && v.length) process.env[k.trim()] = v.join("=").trim();
  });
}

const PORT = process.env.PORT ?? 3700;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => {
      try { resolve(JSON.parse(data || "{}")); }
      catch { reject(new Error("JSON inválido en el body")); }
    });
    req.on("error", reject);
  });
}

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body) });
  res.end(body);
}

function runAudit(url, cliente, extraUrls) {
  return new Promise((resolve, reject) => {
    const args = ["collect.js", url];
    if (cliente) args.push(cliente);
    if (extraUrls?.length) args.push("--urls", extraUrls.join(","));
    const logs = [];
    const proc = spawn("node", args, { cwd: __dirname });
    proc.stdout.on("data", d => { process.stdout.write(d); logs.push(d.toString()); });
    proc.stderr.on("data", d => { process.stderr.write(d); logs.push(d.toString()); });
    proc.on("close", code => {
      if (code === 0) resolve(logs.join(""));
      else reject(new Error(`collect.js salió con código ${code}\n${logs.join("")}`));
    });
  });
}

function getLatestReport(slug) {
  const dir = join(__dirname, "informes", slug);
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter(f => f.endsWith(".md")).sort().reverse();
  if (!files.length) return null;
  return readFileSync(join(dir, files[0]), "utf8");
}

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function splitSlides(markdown) {
  return markdown.split(/\n(?=# )/).map(s => s.trim()).filter(Boolean);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost`);

  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, { status: "ok", timestamp: new Date().toISOString() });
  }

  if (req.method === "POST" && url.pathname === "/audit") {
    let body;
    try { body = await readBody(req); }
    catch (e) { return json(res, 400, { error: e.message }); }

    const { url: siteUrl, cliente, extra_urls, split_slides } = body;
    if (!siteUrl) return json(res, 400, { error: "El campo 'url' es obligatorio" });

    const clienteNombre = cliente ?? new URL(siteUrl).hostname;
    console.log(`\n[${new Date().toISOString()}] Auditoría: ${siteUrl} (${clienteNombre})`);

    try {
      await runAudit(siteUrl, clienteNombre, extra_urls);
      const slug = toSlug(clienteNombre);
      const markdown = getLatestReport(slug);
      if (!markdown) return json(res, 500, { error: "Informe generado pero no encontrado" });

      const response = { cliente: clienteNombre, url: siteUrl, slug, fecha: new Date().toISOString().slice(0, 10), markdown };
      if (split_slides) {
        response.slides = splitSlides(markdown);
        response.total_slides = response.slides.length;
      }
      return json(res, 200, response);
    } catch (e) {
      console.error(e.message);
      return json(res, 500, { error: e.message });
    }
  }

  if (req.method === "GET" && url.pathname.startsWith("/report/")) {
    const slug = url.pathname.replace("/report/", "").replace(/\//g, "");
    const markdown = getLatestReport(slug);
    if (!markdown) return json(res, 404, { error: `No se encontró informe para: ${slug}` });
    const splitParam = url.searchParams.get("split_slides") === "true";
    const response = { slug, markdown };
    if (splitParam) { response.slides = splitSlides(markdown); response.total_slides = response.slides.length; }
    return json(res, 200, response);
  }

  json(res, 404, { error: "Ruta no encontrada" });
});

server.listen(PORT, () => {
  console.log(`\n🚀 audit-seo API en http://localhost:${PORT}`);
  console.log(`   POST /audit  |  GET /report/:slug  |  GET /health\n`);
});
