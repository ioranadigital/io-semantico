export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>404</h1>
      <p style={{ fontSize: "20px", marginBottom: "32px" }}>
        Página no encontrada
      </p>
      <a href="/" style={{ color: "#4D32A5", textDecoration: "underline" }}>
        Volver al inicio
      </a>
    </main>
  );
}
