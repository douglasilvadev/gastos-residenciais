using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.pessoas.application.use_cases;

public class DeletarPessoaUseCase
{
    private readonly IPessoaRepository _pessoaRepository;

    public DeletarPessoaUseCase(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task Executar(Guid id)
    {
        var pessoa = await _pessoaRepository.ObterPorId(id)
            ?? throw new NotFoundException("Pessoa não encontrada.");

        await _pessoaRepository.Remover(pessoa);
    }
}