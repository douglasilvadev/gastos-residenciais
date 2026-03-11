using GastosResidenciais.Api.src.modules.pessoas.application.dtos;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;

namespace GastosResidenciais.Api.src.modules.pessoas.application.use_cases;

public class ListarPessoasUseCase
{
    private readonly IPessoaRepository _pessoaRepository;

    public ListarPessoasUseCase(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task<List<PessoaResponse>> Executar()
    {
        var pessoas = await _pessoaRepository.ListarTodas();

        return pessoas
            .Select(p => new PessoaResponse(
                p.Id,
                p.Nome,
                p.Idade,
                p.CriadoEm,
                p.AtualizadoEm
            ))
            .ToList();
    }
}