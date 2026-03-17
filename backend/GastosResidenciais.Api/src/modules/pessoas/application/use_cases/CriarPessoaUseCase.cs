using GastosResidenciais.Api.src.modules.pessoas.application.dtos;
using GastosResidenciais.Api.src.modules.pessoas.domain.entities;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;

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
        var pessoa = Pessoa.Criar(request.Nome.Trim(), request.Idade);

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