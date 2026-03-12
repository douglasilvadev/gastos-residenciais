using GastosResidenciais.Api.src.modules.categorias.domain.entities;
using GastosResidenciais.Api.src.modules.pessoas.domain.entities;
using GastosResidenciais.Api.src.modules.transacoes.domain.value_objects;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.transacoes.domain.domain_services;

/// <summary>
/// Serviço de domínio responsável por validar regras de negócio
/// que envolvem múltiplas entidades.
/// </summary>
public class TransacaoDomainService
{
    public void ValidarCriacao(Pessoa pessoa, Categoria categoria, TipoTransacao tipo)
    {
        if (pessoa.EhMenorDeIdade() && tipo != TipoTransacao.Despesa)
        {
            throw new DomainException("Menores de idade só podem registrar despesas.");
        }

        if (!categoria.EhCompativelCom(tipo))
        {
            throw new DomainException(
                $"A categoria '{categoria.Descricao}' não é compatível com transações do tipo '{tipo}'.");
        }
    }
}