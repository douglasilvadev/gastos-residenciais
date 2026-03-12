import { FormEvent, useEffect, useMemo, useState } from "react";
import { categoriasApi } from "../../api/categoriasApi";
import { pessoasApi } from "../../api/pessoasApi";
import { transacoesApi } from "../../api/transacoesApi";
import { Finalidade } from "../../types/Categoria";
import { TipoTransacao } from "../../types/Transacao";
import type { Categoria } from "../../types/Categoria";
import type { Pessoa } from "../../types/Pessoa";
import type { CriarTransacaoRequest, Transacao } from "../../types/Transacao";

function traduzirTipo(tipo: TipoTransacao) {
  return tipo === TipoTransacao.Despesa ? "Despesa" : "Receita";
}

export function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [categoriaId, setCategoriaId] = useState("");
  const [pessoaId, setPessoaId] = useState("");

  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const categoriasFiltradas = useMemo(() => {
    return categorias.filter((categoria) => {
      if (categoria.finalidade === Finalidade.Ambas) return true;

      if (tipo === TipoTransacao.Despesa) {
        return categoria.finalidade === Finalidade.Despesa;
      }

      return categoria.finalidade === Finalidade.Receita;
    });
  }, [categorias, tipo]);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const [dadosTransacoes, dadosPessoas, dadosCategorias] = await Promise.all([
        transacoesApi.listar(),
        pessoasApi.listar(),
        categoriasApi.listar(),
      ]);

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

  useEffect(() => {
    setCategoriaId("");
  }, [tipo]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");
      setMensagem("");

      const payload: CriarTransacaoRequest = {
        descricao: descricao.trim(),
        valor: Number(valor),
        tipo,
        categoriaId,
        pessoaId,
      };

      await transacoesApi.criar(payload);

      setDescricao("");
      setValor("");
      setTipo(TipoTransacao.Despesa);
      setCategoriaId("");
      setPessoaId("");
      setMensagem("Transação cadastrada com sucesso.");

      await carregarDados();
    } catch (error: any) {
      console.error(error);

      const mensagemApi =
        error?.response?.data?.error ||
        "Não foi possível cadastrar a transação.";

      setErro(mensagemApi);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Transações</h1>
      <p>Cadastre e visualize as transações financeiras do sistema.</p>

      <section
        style={{
          background: "#ffffff",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Nova transação</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}
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
            <label htmlFor="valor" style={{ display: "block", marginBottom: "6px" }}>
              Valor
            </label>
            <input
              id="valor"
              type="number"
              step="0.01"
              min="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Digite o valor"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <div>
            <label htmlFor="tipo" style={{ display: "block", marginBottom: "6px" }}>
              Tipo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            >
              <option value={TipoTransacao.Despesa}>Despesa</option>
              <option value={TipoTransacao.Receita}>Receita</option>
            </select>
          </div>

          <div>
            <label htmlFor="categoria" style={{ display: "block", marginBottom: "6px" }}>
              Categoria
            </label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            >
              <option value="">Selecione uma categoria</option>
              {categoriasFiltradas.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pessoa" style={{ display: "block", marginBottom: "6px" }}>
              Pessoa
            </label>
            <select
              id="pessoa"
              value={pessoaId}
              onChange={(e) => setPessoaId(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            >
              <option value="">Selecione uma pessoa</option>
              {pessoas.map((pessoa) => (
                <option key={pessoa.id} value={pessoa.id}>
                  {pessoa.nome}
                </option>
              ))}
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
            {salvando ? "Salvando..." : "Cadastrar transação"}
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
        <h2 style={{ marginTop: 0 }}>Lista de transações</h2>

        {carregando ? (
          <p>Carregando transações...</p>
        ) : transacoes.length === 0 ? (
          <p>Nenhuma transação cadastrada.</p>
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
                <th style={{ padding: "12px 8px" }}>Valor</th>
                <th style={{ padding: "12px 8px" }}>Tipo</th>
                <th style={{ padding: "12px 8px" }}>Categoria</th>
                <th style={{ padding: "12px 8px" }}>Pessoa</th>
                <th style={{ padding: "12px 8px" }}>Criado em</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((transacao) => (
                <tr key={transacao.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 8px" }}>{transacao.descricao}</td>
                  <td style={{ padding: "12px 8px" }}>
                    {transacao.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td style={{ padding: "12px 8px" }}>{traduzirTipo(transacao.tipo)}</td>
                  <td style={{ padding: "12px 8px" }}>{transacao.categoriaDescricao}</td>
                  <td style={{ padding: "12px 8px" }}>{transacao.pessoaNome}</td>
                  <td style={{ padding: "12px 8px" }}>
                    {new Date(transacao.criadoEm).toLocaleString("pt-BR")}
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