export const Finalidade = {
  Despesa: 0,
  Receita: 1,
  Ambas: 2,
} as const;

export type Finalidade = (typeof Finalidade)[keyof typeof Finalidade];

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