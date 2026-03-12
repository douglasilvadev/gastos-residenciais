import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { pessoasApi } from "../../api/pessoasApi";
import type { CriarPessoaRequest, Pessoa } from "../../types/Pessoa";

export function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function carregarPessoas() {
    try {
      setCarregando(true);
      setErro("");

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

  async function handleSubmit(event: FormEvent) {
  event.preventDefault();

  try {
    setSalvando(true);
    setErro("");
    setMensagem("");

    const idadeNumero = Number(idade);

    if (idadeNumero > 110) {
      setErro("Idade máxima permitida é 110 anos.");
      setSalvando(false);
      return;
    }

    const payload: CriarPessoaRequest = {
      nome: nome.trim(),
      idade: idadeNumero,
    };

    await pessoasApi.criar(payload);

      setNome("");
      setIdade("");
      setMensagem("Pessoa cadastrada com sucesso.");

      await carregarPessoas();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error ||
        "Não foi possível cadastrar a pessoa.";

      setErro(mensagemApi);
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir(id: string) {
    const confirmou = window.confirm("Deseja realmente excluir esta pessoa?");

    if (!confirmou) {
      return;
    }

    try {
      setErro("");
      setMensagem("");

      await pessoasApi.deletar(id);
      setMensagem("Pessoa removida com sucesso.");

      await carregarPessoas();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error ||
        "Não foi possível excluir a pessoa.";

      setErro(mensagemApi);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Pessoas</h1>
      <p>Cadastre e gerencie as pessoas do sistema.</p>

      <section
        style={{
          background: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Nova pessoa</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}
        >
          <div>
            <label htmlFor="nome" style={{ display: "block", marginBottom: "6px" }}>
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={200}
              placeholder="Digite o nome"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div>
            <label htmlFor="idade" style={{ display: "block", marginBottom: "6px" }}>
              Idade
            </label>
            <input
              id="idade"
              type="number"
              value={idade}
              min={0}
              max={110}
              onChange={(e) => {
                const valor = e.target.value;

                if (valor.length > 3) return;

                const numero = Number(valor);

                if (numero > 110) return;

                setIdade(valor);
            }}
              placeholder="Digite a idade"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
            }}
            />
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
            {salvando ? "Salvando..." : "Cadastrar pessoa"}
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
        <h2 style={{ marginTop: 0 }}>Lista de pessoas</h2>

        {carregando ? (
          <p>Carregando pessoas...</p>
        ) : pessoas.length === 0 ? (
          <p>Nenhuma pessoa cadastrada.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                <th style={{ padding: "12px 8px" }}>Nome</th>
                <th style={{ padding: "12px 8px" }}>Idade</th>
                <th style={{ padding: "12px 8px" }}>Criado em</th>
                <th style={{ padding: "12px 8px" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 8px" }}>{pessoa.nome}</td>
                  <td style={{ padding: "12px 8px" }}>{pessoa.idade}</td>
                  <td style={{ padding: "12px 8px" }}>
                    {new Date(pessoa.criadoEm).toLocaleString("pt-BR")}
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <button
                      onClick={() => handleExcluir(pessoa.id)}
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