import type { Categoria, CriarCategoriaRequest } from "../types/Categoria";
import { httpClient } from "./httpClient";

export const categoriasApi = {
  listar: async (): Promise<Categoria[]> => {
    const response = await httpClient.get<Categoria[]>("/categorias");
    return response.data;
  },

  criar: async (data: CriarCategoriaRequest): Promise<Categoria> => {
    const response = await httpClient.post<Categoria>("/categorias", data);
    return response.data;
  },

  deletar: async (id: string): Promise<void> => {
    await httpClient.delete(`/categorias/${id}`);
  },
};