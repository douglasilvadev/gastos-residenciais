namespace GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;

public record RelatorioTotaisPorPessoaResponse(
    List<TotalPorPessoaResponse> Itens,
    decimal TotalGeralReceitas,
    decimal TotalGeralDespesas,
    decimal SaldoLiquido
);
