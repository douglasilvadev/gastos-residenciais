export interface TotalPorPessoa {
  pessoaId: string;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioTotaisPorPessoa {
  itens: TotalPorPessoa[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquido: number;
}

export interface TotalPorCategoria {
  categoriaId: string;
  descricao: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioTotaisPorCategoria {
  itens: TotalPorCategoria[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquido: number;
}