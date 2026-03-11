using GastosResidenciais.Api.src.modules.categorias.domain.value_objects;
using GastosResidenciais.Api.src.modules.transacoes.domain.entities;
using GastosResidenciais.Api.src.modules.transacoes.domain.value_objects;
using GastosResidenciais.Api.src.shared.infra.server.exceptions;

namespace GastosResidenciais.Api.src.modules.categorias.domain.entities;

/// <summary>
/// Entidade de domínio que representa uma categoria do sistema.
/// </summary>
public class Categoria
{
    public Guid Id { get; private set; }
    public string Descricao { get; private set; } = string.Empty;
    public Finalidade Finalidade { get; private set; }
    public DateTime CriadoEm { get; private set; }

    // Navegação para EF Core
    public List<Transacao> Transacoes { get; private set; } = new();

    private Categoria()
    {
    }

    public static Categoria Criar(string descricao, Finalidade finalidade)
    {
        if (string.IsNullOrWhiteSpace(descricao))
            throw new DomainException("Descrição é obrigatória.");

        if (descricao.Trim().Length > 400)
            throw new DomainException("Descrição deve ter no máximo 400 caracteres.");

        return new Categoria
        {
            Id = Guid.NewGuid(),
            Descricao = descricao.Trim(),
            Finalidade = finalidade,
            CriadoEm = DateTime.UtcNow
        };
    }

    public bool EhCompativelCom(TipoTransacao tipo)
    {
        if (Finalidade == Finalidade.Ambas)
            return true;

        return (tipo == TipoTransacao.Despesa && Finalidade == Finalidade.Despesa)
            || (tipo == TipoTransacao.Receita && Finalidade == Finalidade.Receita);
    }
}