using GastosResidenciais.Api.src.modules.categorias.domain.repository_interface;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.src.modules.categorias.application.use_cases;

public class DeletarCategoriaUseCase
{
    private readonly ICategoriaRepository _categoriaRepository;

    public DeletarCategoriaUseCase(ICategoriaRepository categoriaRepository)
    {
        _categoriaRepository = categoriaRepository;
    }

    public async Task Executar(Guid id)
    {
        var categoria = await _categoriaRepository.ObterPorId(id)
            ?? throw new NotFoundException("Categoria não encontrada.");

        try
        {
            await _categoriaRepository.Remover(categoria);
        }
        catch (DbUpdateException)
        {
            throw new DomainException("Não é possível excluir uma categoria que possui transações vinculadas.");
        }
    }
}