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
        var pessoa = await _pessoaRepository.ObterPorId(id)
            ?? throw new NotFoundException("Pessoa não encontrada.");

        pessoa.Atualizar(request.Nome, request.Idade);

        await _pessoaRepository.Atualizar(pessoa);
    }
}