using GastosResidenciais.Api.src.modules.categorias.domain.value_objects;

namespace GastosResidenciais.Api.src.modules.categorias.application.dtos;

/// <summary>
/// DTO devolvido pela API nas respostas do módulo de categorias.
/// </summary>
public record CategoriaResponse(
    Guid Id,
    string Descricao,
    Finalidade Finalidade,
    DateTime CriadoEm
);