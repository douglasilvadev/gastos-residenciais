import { useEffect, useState } from "react";

import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { categoriasApi } from "../../api/categoriasApi";
import { CategoriaForm } from "./CategoriaForm";
import { Finalidade } from "../../types/Categoria";
import type { Categoria } from "../../types/Categoria";
import type { CategoriaFormData } from "../../schemas/categoriaSchema";

function traduzirFinalidade(finalidade: number) {
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
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function carregarCategorias() {
    try {
      setCarregando(true);
      setErro(null);

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

  async function handleSubmit(data: CategoriaFormData) {
    try {
      setErro(null);
      setMensagem(null);

      await categoriasApi.criar(data);
      setMensagem("Categoria cadastrada com sucesso.");

      await carregarCategorias();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error || "Não foi possível cadastrar a categoria.";

      setErro(mensagemApi);
    }
  }

  async function handleExcluir(id: string) {
    const confirmou = window.confirm("Deseja realmente excluir esta categoria?");

    if (!confirmou) return;

    try {
      setErro(null);
      setMensagem(null);

      await categoriasApi.deletar(id);
      setMensagem("Categoria removida com sucesso.");

      await carregarCategorias();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error || "Não foi possível excluir a categoria.";

      setErro(mensagemApi);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Categorias</h1>
      <p>Cadastre e gerencie as categorias do sistema.</p>

      <Card style={{ marginBottom: "24px" }}>
        <h2 style={{ marginTop: 0 }}>Nova categoria</h2>

        <CategoriaForm onSubmit={handleSubmit} />
      </Card>

      <Alert variant="error" message={erro} />
      <Alert variant="success" message={mensagem} />

      <Card>
        <h2 style={{ marginTop: 0 }}>Lista de categorias</h2>

        {carregando ? (
          <p>Carregando categorias...</p>
        ) : categorias.length === 0 ? (
          <p>Nenhuma categoria cadastrada.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <th style={{ padding: "12px 8px" }}>Descrição</th>
                <th style={{ padding: "12px 8px" }}>Finalidade</th>
                <th style={{ padding: "12px 8px" }}>Criado em</th>
                <th style={{ padding: "12px 8px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr
                  key={categoria.id}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                >
                  <td style={{ padding: "12px 8px" }}>{categoria.descricao}</td>
                  <td style={{ padding: "12px 8px" }}>
                    {traduzirFinalidade(categoria.finalidade)}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    {new Date(categoria.criadoEm).toLocaleString("pt-BR")}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <Button
                      variant="danger"
                      onClick={() => handleExcluir(categoria.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}