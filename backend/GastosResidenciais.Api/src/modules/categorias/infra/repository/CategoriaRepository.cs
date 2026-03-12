using GastosResidenciais.Api.src.modules.categorias.domain.entities;
using GastosResidenciais.Api.src.modules.categorias.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.persistence.context;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.src.modules.categorias.infra.repository;

/// <summary>
/// Implementação concreta do repositório de categorias usando EF Core.
/// </summary>
public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;

    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Categoria?> ObterPorId(Guid id)
    {
        return await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<List<Categoria>> ListarTodas()
    {
        return await _context.Categorias
            .OrderBy(c => c.Descricao)
            .ToListAsync();
    }

    public async Task Adicionar(Categoria categoria)
    {
        await _context.Categorias.AddAsync(categoria);
        await _context.SaveChangesAsync();
    }
}