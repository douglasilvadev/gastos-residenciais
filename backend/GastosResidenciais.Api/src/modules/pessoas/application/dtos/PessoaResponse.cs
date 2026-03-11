namespace GastosResidenciais.Api.src.modules.pessoas.application.dtos;

/// <summary>
/// DTO devolvido pela API nas respostas do módulo de pessoas.
/// </summary>
public record PessoaResponse(
    Guid Id,
    string Nome,
    int Idade,
    DateTime CriadoEm,
    DateTime AtualizadoEm
);
