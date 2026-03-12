namespace GastosResidenciais.Api.src.modules.pessoas.application.dtos;

/// <summary>
/// DTO usado para receber os dados de edição de pessoa.
/// </summary>
public record EditarPessoaRequest(string Nome, int Idade);