export enum TipoTransacao {
  Despesa = 0,
  Receita = 1,
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: string;
  categoriaDescricao: string;
  pessoaId: string;
  pessoaNome: string;
  criadoEm: string;
}

export interface CriarTransacaoRequest {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: string;
  pessoaId: string;
}