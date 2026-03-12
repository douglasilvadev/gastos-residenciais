import type { CriarTransacaoRequest, Transacao } from "../types/Transacao";
import type {
  RelatorioTotaisPorCategoria,
  RelatorioTotaisPorPessoa,
} from "../types/Relatorio";
import { httpClient } from "./httpClient";

export const transacoesApi = {
  listar: async (): Promise<Transacao[]> => {
    const response = await httpClient.get<Transacao[]>("/transacoes");
    return response.data;
  },

  criar: async (data: CriarTransacaoRequest): Promise<Transacao> => {
    const response = await httpClient.post<Transacao>("/transacoes", data);
    return response.data;
  },

  deletar: async (id: string): Promise<void> => {
    await httpClient.delete(`/transacoes/${id}`);
  },

  obterTotaisPorPessoa: async (): Promise<RelatorioTotaisPorPessoa> => {
    const response = await httpClient.get<RelatorioTotaisPorPessoa>(
      "/relatorios/totais-por-pessoa"
    );
    return response.data;
  },

  obterTotaisPorCategoria: async (): Promise<RelatorioTotaisPorCategoria> => {
    const response = await httpClient.get<RelatorioTotaisPorCategoria>(
      "/relatorios/totais-por-categoria"
    );
    return response.data;
  },
};