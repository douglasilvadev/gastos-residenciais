namespace GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;

public record TotalPorCategoriaResponse(
    Guid CategoriaId,
    string Descricao,
    decimal TotalReceitas,
    decimal TotalDespesas,
    decimal Saldo
);
