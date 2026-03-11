using GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;
using GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;

namespace GastosResidenciais.Api.src.modules.transacoes.application.use_cases;

public class ConsultarTotaisPorCategoriaUseCase
{
    private readonly ITransacaoRepository _transacaoRepository;

    public ConsultarTotaisPorCategoriaUseCase(ITransacaoRepository transacaoRepository)
    {
        _transacaoRepository = transacaoRepository;
    }

    public async Task<RelatorioTotaisPorCategoriaResponse> Executar()
    {
        return await _transacaoRepository.ObterTotaisPorCategoria();
    }
}
