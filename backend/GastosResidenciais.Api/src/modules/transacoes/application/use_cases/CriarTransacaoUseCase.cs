using GastosResidenciais.Api.src.modules.categorias.domain.repository_interface;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.modules.transacoes.application.dtos;
using GastosResidenciais.Api.src.modules.transacoes.domain.domain_services;
using GastosResidenciais.Api.src.modules.transacoes.domain.entities;
using GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.transacoes.application.use_cases;

public class CriarTransacaoUseCase
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;
    private readonly TransacaoDomainService _domainService;

    public CriarTransacaoUseCase(
        ITransacaoRepository transacaoRepository,
        IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository,
        TransacaoDomainService domainService)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
        _domainService = domainService;
    }

    public async Task<TransacaoResponse> Executar(CriarTransacaoRequest request)
    {
        var pessoa = await _pessoaRepository.ObterPorId(request.PessoaId)
            ?? throw new NotFoundException("Pessoa não encontrada.");

        var categoria = await _categoriaRepository.ObterPorId(request.CategoriaId)
            ?? throw new NotFoundException("Categoria não encontrada.");

        _domainService.ValidarCriacao(pessoa, categoria, request.Tipo);

        var transacao = Transacao.Criar(
            request.Descricao,
            request.Valor,
            request.Tipo,
            request.CategoriaId,
            request.PessoaId
        );

        await _transacaoRepository.Adicionar(transacao);

        return new TransacaoResponse(
            transacao.Id,
            transacao.Descricao,
            transacao.Valor,
            transacao.Tipo,
            categoria.Id,
            categoria.Descricao,
            pessoa.Id,
            pessoa.Nome,
            transacao.CriadoEm
        );
    }
}
