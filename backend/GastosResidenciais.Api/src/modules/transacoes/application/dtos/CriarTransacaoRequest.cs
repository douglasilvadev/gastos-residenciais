using GastosResidenciais.Api.src.modules.transacoes.domain.value_objects;

namespace GastosResidenciais.Api.src.modules.transacoes.application.dtos;

public record CriarTransacaoRequest(
    string Descricao,
    decimal Valor,
    TipoTransacao Tipo,
    Guid CategoriaId,
    Guid PessoaId
);