using GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;
using GastosResidenciais.Api.src.modules.transacoes.domain.entities;

namespace GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;

public interface ITransacaoRepository
{
    Task Adicionar(Transacao transacao);
    Task<List<Transacao>> ListarTodas();
    Task<RelatorioTotaisPorPessoaResponse> ObterTotaisPorPessoa();
    Task<RelatorioTotaisPorCategoriaResponse> ObterTotaisPorCategoria();
}
