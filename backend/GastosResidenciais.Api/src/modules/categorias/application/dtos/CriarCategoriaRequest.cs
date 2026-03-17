using GastosResidenciais.Api.src.modules.categorias.domain.value_objects;

namespace GastosResidenciais.Api.src.modules.categorias.application.dtos;

public record CriarCategoriaRequest(string Descricao, Finalidade Finalidade);