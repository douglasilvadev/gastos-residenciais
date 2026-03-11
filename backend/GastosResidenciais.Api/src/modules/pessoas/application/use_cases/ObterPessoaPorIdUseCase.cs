using GastosResidenciais.Api.src.modules.pessoas.application.dtos;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.pessoas.application.use_cases;

public class ObterPessoaPorIdUseCase
{
    private readonly IPessoaRepository _pessoaRepository;

    public ObterPessoaPorIdUseCase(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task<PessoaResponse> Executar(Guid id)
    {
        var pessoa = await _pessoaRepository.ObterPorId(id)
            ?? throw new NotFoundException("Pessoa não encontrada.");

        return new PessoaResponse(
            pessoa.Id,
            pessoa.Nome,
            pessoa.Idade,
            pessoa.CriadoEm,
            pessoa.AtualizadoEm
        );
    }
}
