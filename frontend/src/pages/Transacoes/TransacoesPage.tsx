import { useEffect, useState } from "react";

import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { categoriasApi } from "../../api/categoriasApi";
import { pessoasApi } from "../../api/pessoasApi";
import { transacoesApi } from "../../api/transacoesApi";
import { TransacaoForm } from "./TransacaoForm";
import { TipoTransacao } from "../../types/Transacao";
import { formatCurrency } from "../../utils/formatCurrency";

import type { Categoria } from "../../types/Categoria";
import type { Pessoa } from "../../types/Pessoa";
import type { Transacao } from "../../types/Transacao";
import type { TransacaoFormData } from "../../schemas/transacaoSchema";

function traduzirTipo(tipo: number) {
  return tipo === TipoTransacao.Despesa ? "Despesa" : "Receita";
}

export function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro(null);

      const [dadosTransacoes, dadosPessoas, dadosCategorias] = await Promise.all(
        [transacoesApi.listar(), pessoasApi.listar(), categoriasApi.listar()]
      );

      setTransacoes(dadosTransacoes);
      setPessoas(dadosPessoas);
      setCategorias(dadosCategorias);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar os dados da tela de transações.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleSubmit(data: TransacaoFormData) {
    try {
      setErro(null);
      setMensagem(null);

      await transacoesApi.criar(data);
      setMensagem("Transação cadastrada com sucesso.");

      await carregarDados();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error || "Não foi possível cadastrar a transação.";

      setErro(mensagemApi);
    }
  }

  async function handleExcluir(id: string) {
    const confirmou = window.confirm("Deseja realmente excluir esta transação?");

    if (!confirmou) return;

    try {
      setErro(null);
      setMensagem(null);

      await transacoesApi.deletar(id);
      setMensagem("Transação removida com sucesso.");

      await carregarDados();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error || "Não foi possível excluir a transação.";

      setErro(mensagemApi);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Transações</h1>
      <p>Cadastre e visualize as transações financeiras do sistema.</p>

      <Card style={{ marginBottom: "24px" }}>
        <h2 style={{ marginTop: 0 }}>Nova transação</h2>

        <TransacaoForm
          pessoas={pessoas}
          categorias={categorias}
          onSubmit={handleSubmit}
        />
      </Card>

      <Alert variant="error" message={erro} />
      <Alert variant="success" message={mensagem} />

      <Card>
        <h2 style={{ marginTop: 0 }}>Lista de transações</h2>

        {carregando ? (
          <p>Carregando transações...</p>
        ) : transacoes.length === 0 ? (
          <p>Nenhuma transação cadastrada.</p>
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
                <th style={{ padding: "12px 8px" }}>Valor</th>
                <th style={{ padding: "12px 8px" }}>Tipo</th>
                <th style={{ padding: "12px 8px" }}>Categoria</th>
                <th style={{ padding: "12px 8px" }}>Pessoa</th>
                <th style={{ padding: "12px 8px" }}>Criado em</th>
                <th style={{ padding: "12px 8px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr
                  key={transacao.id}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                >
                  <td style={{ padding: "12px 8px" }}>{transacao.descricao}</td>
                  <td style={{ padding: "12px 8px" }}>
                    {formatCurrency(transacao.valor)}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    {traduzirTipo(transacao.tipo)}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    {transacao.categoriaDescricao}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    {transacao.pessoaNome}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    {new Date(transacao.criadoEm).toLocaleString("pt-BR")}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <Button
                      variant="danger"
                      onClick={() => handleExcluir(transacao.id)}
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