using GastosResidenciais.Api.src.modules.categorias.domain.value_objects;

namespace GastosResidenciais.Api.src.modules.categorias.application.dtos;

/// <summary>
/// DTO usado para criação de categoria.
/// </summary>
public record CriarCategoriaRequest(string Descricao, Finalidade Finalidade);