using GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;
using GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;

namespace GastosResidenciais.Api.src.modules.transacoes.application.use_cases;

public class ConsultarTotaisPorPessoaUseCase
{
    private readonly ITransacaoRepository _transacaoRepository;

    public ConsultarTotaisPorPessoaUseCase(ITransacaoRepository transacaoRepository)
    {
        _transacaoRepository = transacaoRepository;
    }

    public async Task<RelatorioTotaisPorPessoaResponse> Executar()
    {
        return await _transacaoRepository.ObterTotaisPorPessoa();
    }
}
