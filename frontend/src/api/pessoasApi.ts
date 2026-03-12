import type { CriarPessoaRequest, Pessoa } from "../types/Pessoa";
import { httpClient } from "./httpClient";

export const pessoasApi = {
  listar: async (): Promise<Pessoa[]> => {
    const response = await httpClient.get<Pessoa[]>("/pessoas");
    return response.data;
  },

  obterPorId: async (id: string): Promise<Pessoa> => {
    const response = await httpClient.get<Pessoa>(`/pessoas/${id}`);
    return response.data;
  },

  criar: async (data: CriarPessoaRequest): Promise<Pessoa> => {
    const response = await httpClient.post<Pessoa>("/pessoas", data);
    return response.data;
  },

  editar: async (id: string, data: CriarPessoaRequest): Promise<void> => {
    await httpClient.put(`/pessoas/${id}`, data);
  },

  deletar: async (id: string): Promise<void> => {
    await httpClient.delete(`/pessoas/${id}`);
  },
};