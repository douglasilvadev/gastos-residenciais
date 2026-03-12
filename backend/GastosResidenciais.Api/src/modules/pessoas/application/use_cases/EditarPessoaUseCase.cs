using GastosResidenciais.Api.src.modules.pessoas.application.dtos;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.pessoas.application.use_cases;

public class EditarPessoaUseCase
{
    private readonly IPessoaRepository _pessoaRepository;

    public EditarPessoaUseCase(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task Executar(Guid id, EditarPessoaRequest request)
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

        if (System.Text.RegularExpressions.Regex.IsMatch(nome, @"\d"))
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

        var pessoa = await _pessoaRepository.ObterPorId(id)
            ?? throw new NotFoundException("Pessoa não encontrada.");

        pessoa.Atualizar(nome, request.Idade);

        await _pessoaRepository.Atualizar(pessoa);
    }
}