import { useEffect, useState } from "react";

import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { pessoasApi } from "../../api/pessoasApi";
import { PessoaForm } from "./PessoaForm";
import type { Pessoa } from "../../types/Pessoa";
import type { PessoaFormData } from "../../schemas/pessoaSchema";

export function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<PessoaFormData | undefined>(
    undefined
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  async function carregarPessoas() {
    try {
      setCarregando(true);
      setErro(null);

      const dados = await pessoasApi.listar();
      setPessoas(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar as pessoas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPessoas();
  }, []);

  function iniciarEdicao(pessoa: Pessoa) {
    setErro(null);
    setMensagem(null);
    setEditandoId(pessoa.id);
    setDefaultValues({
      nome: pessoa.nome,
      idade: pessoa.idade,
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setDefaultValues(undefined);
  }

  async function handleSubmit(data: PessoaFormData) {
    try {
      setErro(null);
      setMensagem(null);

      if (editandoId) {
        await pessoasApi.editar(editandoId, data);
        setMensagem("Pessoa atualizada com sucesso.");
      } else {
        await pessoasApi.criar(data);
        setMensagem("Pessoa cadastrada com sucesso.");
      }

      cancelarEdicao();
      await carregarPessoas();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error || "Não foi possível salvar a pessoa.";

      setErro(mensagemApi);
    }
  }

  async function handleExcluir(id: string) {
    const confirmou = window.confirm("Deseja realmente excluir esta pessoa?");

    if (!confirmou) return;

    try {
      setErro(null);
      setMensagem(null);

      await pessoasApi.deletar(id);

      if (editandoId === id) {
        cancelarEdicao();
      }

      setMensagem("Pessoa removida com sucesso.");
      await carregarPessoas();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error || "Não foi possível excluir a pessoa.";

      setErro(mensagemApi);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Pessoas</h1>
      <p>Cadastre e gerencie as pessoas do sistema.</p>

      <Card style={{ marginBottom: "24px" }}>
        <h2 style={{ marginTop: 0 }}>
          {editandoId ? "Editar pessoa" : "Nova pessoa"}
        </h2>

        <PessoaForm
          editando={!!editandoId}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={cancelarEdicao}
        />
      </Card>

      <Alert variant="error" message={erro} />
      <Alert variant="success" message={mensagem} />

      <Card>
        <h2 style={{ marginTop: 0 }}>Lista de pessoas</h2>

        {carregando ? (
          <p>Carregando pessoas...</p>
        ) : pessoas.length === 0 ? (
          <p>Nenhuma pessoa cadastrada.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <th style={{ padding: "12px 8px" }}>Nome</th>
                <th style={{ padding: "12px 8px" }}>Idade</th>
                <th style={{ padding: "12px 8px" }}>Criado em</th>
                <th style={{ padding: "12px 8px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr
                  key={pessoa.id}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                >
                  <td style={{ padding: "12px 8px" }}>{pessoa.nome}</td>
                  <td style={{ padding: "12px 8px" }}>{pessoa.idade}</td>
                  <td style={{ padding: "12px 8px" }}>
                    {new Date(pessoa.criadoEm).toLocaleString("pt-BR")}
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <Button onClick={() => iniciarEdicao(pessoa)}>Editar</Button>

                    <Button
                      variant="danger"
                      onClick={() => handleExcluir(pessoa.id)}
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