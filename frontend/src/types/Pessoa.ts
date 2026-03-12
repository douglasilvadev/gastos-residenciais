export interface Pessoa {
  id: string;
  nome: string;
  idade: number;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CriarPessoaRequest {
  nome: string;
  idade: number;
}