namespace GastosResidenciais.Api.src.modules.pessoas.application.dtos;

/// <summary>
/// DTO usado para receber os dados de criação de pessoa.
/// </summary>
public record CriarPessoaRequest(string Nome, int Idade);