using GastosResidenciais.Api.src.modules.categorias.application.dtos;
using GastosResidenciais.Api.src.modules.categorias.domain.entities;
using GastosResidenciais.Api.src.modules.categorias.domain.repository_interface;

namespace GastosResidenciais.Api.src.modules.categorias.application.use_cases;

/// <summary>
/// Caso de uso responsável por criar uma nova categoria.
/// </summary>
public class CriarCategoriaUseCase
{
    private readonly ICategoriaRepository _categoriaRepository;

    public CriarCategoriaUseCase(ICategoriaRepository categoriaRepository)
    {
        _categoriaRepository = categoriaRepository;
    }

    public async Task<CategoriaResponse> Executar(CriarCategoriaRequest request)
    {
        var categoria = Categoria.Criar(request.Descricao, request.Finalidade);

        await _categoriaRepository.Adicionar(categoria);

        return new CategoriaResponse(
            categoria.Id,
            categoria.Descricao,
            categoria.Finalidade,
            categoria.CriadoEm
        );
    }
}