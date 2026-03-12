using GastosResidenciais.Api.src.modules.categorias.application.dtos;
using GastosResidenciais.Api.src.modules.categorias.domain.repository_interface;

namespace GastosResidenciais.Api.src.modules.categorias.application.use_cases;

/// <summary>
/// Caso de uso responsável por listar todas as categorias cadastradas.
/// </summary>
public class ListarCategoriasUseCase
{
    private readonly ICategoriaRepository _categoriaRepository;

    public ListarCategoriasUseCase(ICategoriaRepository categoriaRepository)
    {
        _categoriaRepository = categoriaRepository;
    }

    public async Task<List<CategoriaResponse>> Executar()
    {
        var categorias = await _categoriaRepository.ListarTodas();

        return categorias
            .Select(c => new CategoriaResponse(
                c.Id,
                c.Descricao,
                c.Finalidade,
                c.CriadoEm
            ))
            .ToList();
    }
}