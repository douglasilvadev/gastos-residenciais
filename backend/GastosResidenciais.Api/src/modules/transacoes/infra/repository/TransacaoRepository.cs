using GastosResidenciais.Api.src.modules.transacoes.application.dtos.relatorios;
using GastosResidenciais.Api.src.modules.transacoes.domain.entities;
using GastosResidenciais.Api.src.modules.transacoes.domain.repository_interface;
using GastosResidenciais.Api.src.modules.transacoes.domain.value_objects;
using GastosResidenciais.Api.src.shared.infra.persistence.context;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.src.modules.transacoes.infra.repository;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly AppDbContext _context;

    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task Adicionar(Transacao transacao)
    {
        await _context.Transacoes.AddAsync(transacao);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Transacao>> ListarTodas()
    {
        return await _context.Transacoes
            .Include(t => t.Categoria)
            .Include(t => t.Pessoa)
            .OrderByDescending(t => t.CriadoEm)
            .ToListAsync();
    }

    public async Task<RelatorioTotaisPorPessoaResponse> ObterTotaisPorPessoa()
    {
        var totais = await _context.Pessoas
            .Select(p => new TotalPorPessoaResponse(
                p.Id,
                p.Nome,
                p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0,
                p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0,
                (p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0)
                -
                (p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0)
            ))
            .OrderBy(x => x.Nome)
            .ToListAsync();

        return new RelatorioTotaisPorPessoaResponse(
            totais,
            totais.Sum(t => t.TotalReceitas),
            totais.Sum(t => t.TotalDespesas),
            totais.Sum(t => t.Saldo)
        );
    }

    public async Task<RelatorioTotaisPorCategoriaResponse> ObterTotaisPorCategoria()
    {
        var totais = await _context.Categorias
            .Select(c => new TotalPorCategoriaResponse(
                c.Id,
                c.Descricao,
                c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0,
                c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0,
                (c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => (decimal?)t.Valor) ?? 0)
                -
                (c.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => (decimal?)t.Valor) ?? 0)
            ))
            .OrderBy(x => x.Descricao)
            .ToListAsync();

        return new RelatorioTotaisPorCategoriaResponse(
            totais,
            totais.Sum(t => t.TotalReceitas),
            totais.Sum(t => t.TotalDespesas),
            totais.Sum(t => t.Saldo)
        );
    }
}