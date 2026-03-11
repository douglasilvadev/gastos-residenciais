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
        var pessoas = await _context.Pessoas
            .OrderBy(p => p.Nome)
            .ToListAsync();

        var totaisPorPessoa = await _context.Transacoes
            .GroupBy(t => t.PessoaId)
            .Select(g => new
            {
                PessoaId = g.Key,
                TotalReceitas = g
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor),
                TotalDespesas = g
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor)
            })
            .ToListAsync();

        var itens = pessoas
            .Select(p =>
            {
                var total = totaisPorPessoa.FirstOrDefault(x => x.PessoaId == p.Id);

                var totalReceitas = total?.TotalReceitas ?? 0;
                var totalDespesas = total?.TotalDespesas ?? 0;

                return new TotalPorPessoaResponse(
                    p.Id,
                    p.Nome,
                    totalReceitas,
                    totalDespesas,
                    totalReceitas - totalDespesas
                );
            })
            .ToList();

        return new RelatorioTotaisPorPessoaResponse(
            itens,
            itens.Sum(x => x.TotalReceitas),
            itens.Sum(x => x.TotalDespesas),
            itens.Sum(x => x.Saldo)
        );
    }

    public async Task<RelatorioTotaisPorCategoriaResponse> ObterTotaisPorCategoria()
    {
        var categorias = await _context.Categorias
            .OrderBy(c => c.Descricao)
            .ToListAsync();

        var totaisPorCategoria = await _context.Transacoes
            .GroupBy(t => t.CategoriaId)
            .Select(g => new
            {
                CategoriaId = g.Key,
                TotalReceitas = g
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor),
                TotalDespesas = g
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor)
            })
            .ToListAsync();

        var itens = categorias
            .Select(c =>
            {
                var total = totaisPorCategoria.FirstOrDefault(x => x.CategoriaId == c.Id);

                var totalReceitas = total?.TotalReceitas ?? 0;
                var totalDespesas = total?.TotalDespesas ?? 0;

                return new TotalPorCategoriaResponse(
                    c.Id,
                    c.Descricao,
                    totalReceitas,
                    totalDespesas,
                    totalReceitas - totalDespesas
                );
            })
            .ToList();

        return new RelatorioTotaisPorCategoriaResponse(
            itens,
            itens.Sum(x => x.TotalReceitas),
            itens.Sum(x => x.TotalDespesas),
            itens.Sum(x => x.Saldo)
        );
    }
}