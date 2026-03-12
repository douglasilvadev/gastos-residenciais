export enum Finalidade {
  Despesa = 0,
  Receita = 1,
  Ambas = 2,
}

export interface Categoria {
  id: string;
  descricao: string;
  finalidade: Finalidade;
  criadoEm: string;
}

export interface CriarCategoriaRequest {
  descricao: string;
  finalidade: Finalidade;
}
