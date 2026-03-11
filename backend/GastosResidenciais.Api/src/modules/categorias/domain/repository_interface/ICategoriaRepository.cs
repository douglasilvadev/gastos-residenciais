using GastosResidenciais.Api.src.modules.categorias.domain.entities;

namespace GastosResidenciais.Api.src.modules.categorias.domain.repository_interface;

/// <summary>
/// Contrato do repositório de categorias.
/// </summary>
public interface ICategoriaRepository
{
    Task<Categoria?> ObterPorId(Guid id);
    Task<List<Categoria>> ListarTodas();
    Task Adicionar(Categoria categoria);
}