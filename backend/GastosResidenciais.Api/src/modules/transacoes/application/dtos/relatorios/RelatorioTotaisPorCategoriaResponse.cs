namespace GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;

public record RelatorioTotaisPorCategoriaResponse(
    List<TotalPorCategoriaResponse> Itens,
    decimal TotalGeralReceitas,
    decimal TotalGeralDespesas,
    decimal SaldoLiquido
);
