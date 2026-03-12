import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
      }}
    >
      <aside
        style={{
          width: "220px",
          background: "#1f2937",
          color: "#ffffff",
          padding: "24px 16px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Gastos</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link to="/pessoas" style={{ color: "#fff", textDecoration: "none" }}>
            Pessoas
          </Link>

          <Link to="/categorias" style={{ color: "#fff", textDecoration: "none" }}>
            Categorias
          </Link>

          <Link to="/transacoes" style={{ color: "#fff", textDecoration: "none" }}>
            Transações
          </Link>

          <Link to="/relatorios/pessoas" style={{ color: "#fff", textDecoration: "none" }}>
            Relatório por Pessoa
          </Link>

          <Link to="/relatorios/categorias" style={{ color: "#fff", textDecoration: "none" }}>
            Relatório por Categoria
          </Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}