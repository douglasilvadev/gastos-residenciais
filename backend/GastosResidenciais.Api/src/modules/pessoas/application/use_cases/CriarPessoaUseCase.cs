using System.Text.RegularExpressions;
using GastosResidenciais.Api.src.modules.pessoas.application.dtos;
using GastosResidenciais.Api.src.modules.pessoas.domain.entities;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.pessoas.application.use_cases;

public class CriarPessoaUseCase
{
    private readonly IPessoaRepository _pessoaRepository;

    public CriarPessoaUseCase(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task<PessoaResponse> Executar(CriarPessoaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nome))
        {
            throw new DomainException("Nome é obrigatório.");
        }

        var nome = request.Nome.Trim();

        if (nome.Length > 200)
        {
            throw new DomainException("Nome deve ter no máximo 200 caracteres.");
        }

        if (!Regex.IsMatch(nome, @"^[A-Za-zÀ-ÿ\s]+$"))
        {
            throw new DomainException("Nome não pode conter números.");
        }

        if (request.Idade <= 0)
        {
            throw new DomainException("Idade deve ser um valor positivo.");
        }

        if (request.Idade > 110)
        {
            throw new DomainException("Idade máxima permitida é 110 anos.");
        }

        var pessoa = Pessoa.Criar(nome, request.Idade);

        await _pessoaRepository.Adicionar(pessoa);

        return new PessoaResponse(
            pessoa.Id,
            pessoa.Nome,
            pessoa.Idade,
            pessoa.CriadoEm,
            pessoa.AtualizadoEm
        );
    }
}