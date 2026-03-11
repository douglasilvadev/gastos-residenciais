using GastosResidenciais.Api.src.modules.transacoes.application.dtos;
using GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;

namespace GastosResidenciais.Api.src.modules.transacoes.application.use_cases;

public class ListarTransacoesUseCase
{
    private readonly ITransacaoRepository _transacaoRepository;

    public ListarTransacoesUseCase(ITransacaoRepository transacaoRepository)
    {
        _transacaoRepository = transacaoRepository;
    }

    public async Task<List<TransacaoResponse>> Executar()
    {
        var transacoes = await _transacaoRepository.ListarTodas();

        return transacoes
            .Select(t => new TransacaoResponse(
                t.Id,
                t.Descricao,
                t.Valor,
                t.Tipo,
                t.CategoriaId,
                t.Categoria?.Descricao ?? string.Empty,
                t.PessoaId,
                t.Pessoa?.Nome ?? string.Empty,
                t.CriadoEm
            ))
            .ToList();
    }
}
