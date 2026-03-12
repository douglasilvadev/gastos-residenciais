import { useEffect, useState } from "react";
import { transacoesApi } from "../../api/transacoesApi";
import type { RelatorioTotaisPorCategoria } from "../../types/Relatorio";

export function TotaisPorCategoriaPage() {
  const [relatorio, setRelatorio] = useState<RelatorioTotaisPorCategoria | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarRelatorio() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await transacoesApi.obterTotaisPorCategoria();
      setRelatorio(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar o relatório por categoria.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarRelatorio();
  }, []);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Relatório por Categoria</h1>
      <p>Consulte receitas, despesas e saldo por categoria.</p>

      {erro && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          {erro}
        </div>
      )}

      <section
        style={{
          background: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        }}
      >
        {carregando ? (
          <p>Carregando relatório...</p>
        ) : !relatorio || relatorio.itens.length === 0 ? (
          <p>Nenhum dado encontrado.</p>
        ) : (
          <>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                  <th style={{ padding: "12px 8px" }}>Categoria</th>
                  <th style={{ padding: "12px 8px" }}>Receitas</th>
                  <th style={{ padding: "12px 8px" }}>Despesas</th>
                  <th style={{ padding: "12px 8px" }}>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {relatorio.itens.map((item) => (
                  <tr key={item.categoriaId} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "12px 8px" }}>{item.descricao}</td>
                    <td style={{ padding: "12px 8px" }}>
                      {item.totalReceitas.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      {item.totalDespesas.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      {item.saldo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                background: "#f9fafb",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            >
              <p>
                <strong>Total geral de receitas:</strong>{" "}
                {relatorio.totalGeralReceitas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p>
                <strong>Total geral de despesas:</strong>{" "}
                {relatorio.totalGeralDespesas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p>
                <strong>Saldo líquido:</strong>{" "}
                {relatorio.saldoLiquido.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}