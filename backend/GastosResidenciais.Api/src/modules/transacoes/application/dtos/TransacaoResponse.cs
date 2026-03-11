using GastosResidenciais.Api.src.modules.transacoes.domain.value_objects;

namespace GastosResidenciais.Api.src.modules.transacoes.application.dtos;

public record TransacaoResponse(
    Guid Id,
    string Descricao,
    decimal Valor,
    TipoTransacao Tipo,
    Guid CategoriaId,
    string CategoriaDescricao,
    Guid PessoaId,
    string PessoaNome,
    DateTime CriadoEm
);
