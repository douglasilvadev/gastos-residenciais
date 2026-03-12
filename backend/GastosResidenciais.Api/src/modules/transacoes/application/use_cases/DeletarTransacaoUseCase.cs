using GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.transacoes.application.use_cases;

public class DeletarTransacaoUseCase
{
    private readonly ITransacaoRepository _transacaoRepository;

    public DeletarTransacaoUseCase(ITransacaoRepository transacaoRepository)
    {
        _transacaoRepository = transacaoRepository;
    }

    public async Task Executar(Guid id)
    {
        var transacao = await _transacaoRepository.ObterPorId(id)
            ?? throw new NotFoundException("Transação não encontrada.");

        await _transacaoRepository.Remover(transacao);
    }
}