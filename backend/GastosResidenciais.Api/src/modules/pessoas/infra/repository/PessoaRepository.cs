using GastosResidenciais.Api.src.modules.pessoas.domain.entities;
using GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.persistence.context;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.src.modules.pessoas.infra.repository;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;

    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Pessoa?> ObterPorId(Guid id)
    {
        return await _context.Pessoas.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Pessoa>> ListarTodas()
    {
        return await _context.Pessoas
            .OrderBy(p => p.Nome)
            .ToListAsync();
    }

    public async Task Adicionar(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task Atualizar(Pessoa pessoa)
    {
        _context.Pessoas.Update(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task Remover(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
    }
}