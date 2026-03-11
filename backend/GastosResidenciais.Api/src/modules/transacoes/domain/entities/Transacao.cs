using GastosResidenciais.Api.src.modules.categorias.domain.entities;
using GastosResidenciais.Api.src.modules.pessoas.domain.entities;
using GastosResidenciais.Api.src.modules.transacoes.domain.value_objects;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.transacoes.domain.entities;

/// <summary>
/// Entidade de domínio que representa uma transação financeira.
/// </summary>
public class Transacao
{
    public Guid Id { get; private set; }
    public string Descricao { get; private set; } = string.Empty;
    public decimal Valor { get; private set; }
    public TipoTransacao Tipo { get; private set; }
    public Guid CategoriaId { get; private set; }
    public Guid PessoaId { get; private set; }
    public DateTime CriadoEm { get; private set; }

    // Navegações para EF Core
    public Categoria? Categoria { get; private set; }
    public Pessoa? Pessoa { get; private set; }

    private Transacao()
    {
    }

    public static Transacao Criar(
        string descricao,
        decimal valor,
        TipoTransacao tipo,
        Guid categoriaId,
        Guid pessoaId)
    {
        if (string.IsNullOrWhiteSpace(descricao))
            throw new DomainException("Descrição é obrigatória.");

        if (descricao.Trim().Length > 400)
            throw new DomainException("Descrição deve ter no máximo 400 caracteres.");

        if (valor <= 0)
            throw new DomainException("Valor deve ser um número positivo.");

        return new Transacao
        {
            Id = Guid.NewGuid(),
            Descricao = descricao.Trim(),
            Valor = valor,
            Tipo = tipo,
            CategoriaId = categoriaId,
            PessoaId = pessoaId,
            CriadoEm = DateTime.UtcNow
        };
    }
}