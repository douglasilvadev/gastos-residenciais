import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { categoriasApi } from "../../api/categoriasApi";
import { Finalidade } from "../../types/Categoria";
import type { Categoria, CriarCategoriaRequest, Finalidade as FinalidadeType } from "../../types/Categoria";

function traduzirFinalidade(finalidade: FinalidadeType) {
  switch (finalidade) {
    case Finalidade.Despesa:
      return "Despesa";
    case Finalidade.Receita:
      return "Receita";
    case Finalidade.Ambas:
      return "Ambas";
    default:
      return "Desconhecida";
  }
}

export function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<FinalidadeType | "">("");
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function carregarCategorias() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await categoriasApi.listar();
      setCategorias(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar as categorias.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");
      setMensagem("");

      if (finalidade === "") {
        setErro("Selecione a finalidade da categoria.");
        setSalvando(false);
        return;
      }

      const payload: CriarCategoriaRequest = {
        descricao: descricao.trim(),
        finalidade,
      };

      await categoriasApi.criar(payload);

      setDescricao("");
      setFinalidade("");
      setMensagem("Categoria cadastrada com sucesso.");

      await carregarCategorias();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error ||
        "Não foi possível cadastrar a categoria.";

      setErro(mensagemApi);
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir(id: string) {
    const confirmou = window.confirm("Deseja realmente excluir esta categoria?");

    if (!confirmou) {
      return;
    }

    try {
      setErro("");
      setMensagem("");

      await categoriasApi.deletar(id);
      setMensagem("Categoria removida com sucesso.");

      await carregarCategorias();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error ||
        "Não foi possível excluir a categoria.";

      setErro(mensagemApi);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Categorias</h1>
      <p>Cadastre e gerencie as categorias do sistema.</p>

      <section
        style={{
          background: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Nova categoria</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}
        >
          <div>
            <label htmlFor="descricao" style={{ display: "block", marginBottom: "6px" }}>
              Descrição
            </label>
            <input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              maxLength={400}
              placeholder="Digite a descrição"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div>
            <label htmlFor="finalidade" style={{ display: "block", marginBottom: "6px" }}>
              Finalidade
            </label>
            <select
              id="finalidade"
              value={finalidade === "" ? "" : String(finalidade)}
              onChange={(e) => {
                const valor = e.target.value;

                if (valor === "") {
                  setFinalidade("");
                  return;
                }

                setFinalidade(Number(valor) as FinalidadeType);
              }}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            >
              <option value="">Selecione uma finalidade</option>
              <option value={String(Finalidade.Despesa)}>Despesa</option>
              <option value={String(Finalidade.Receita)}>Receita</option>
              <option value={String(Finalidade.Ambas)}>Ambas</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={salvando}
            style={{
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {salvando ? "Salvando..." : "Cadastrar categoria"}
          </button>
        </form>
      </section>

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

      {mensagem && (
        <div
          style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          {mensagem}
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
        <h2 style={{ marginTop: 0 }}>Lista de categorias</h2>

        {carregando ? (
          <p>Carregando categorias...</p>
        ) : categorias.length === 0 ? (
          <p>Nenhuma categoria cadastrada.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "12px 8px" }}>Descrição</th>
                <th style={{ padding: "12px 8px" }}>Finalidade</th>
                <th style={{ padding: "12px 8px" }}>Criado em</th>
                <th style={{ padding: "12px 8px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 8px" }}>{categoria.descricao}</td>
                  <td style={{ padding: "12px 8px" }}>
                    {traduzirFinalidade(categoria.finalidade)}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    {new Date(categoria.criadoEm).toLocaleString("pt-BR")}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <button
                      onClick={() => handleExcluir(categoria.id)}
                      style={{
                        background: "#dc2626",
                        color: "#ffffff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}