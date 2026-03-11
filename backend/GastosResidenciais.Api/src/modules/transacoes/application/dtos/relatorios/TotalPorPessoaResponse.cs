namespace GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;

public record TotalPorPessoaResponse(
    Guid PessoaId,
    string Nome,
    decimal TotalReceitas,
    decimal TotalDespesas,
    decimal Saldo
);
