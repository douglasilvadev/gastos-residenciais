using GastosResidenciais.Api.src.shared.infra.server.exceptions;
using GastosResidenciais.Api.src.modules.transacoes.domain.entities;

namespace GastosResidenciais.Api.src.modules.pessoas.domain.entities;

/// <summary>
/// Entidade de domínio que representa uma pessoa no sistema.
/// Contém regras básicas de validação de nome e idade.
/// </summary>
public class Pessoa
{
    public Guid Id { get; private set; }
    public string Nome { get; private set; } = string.Empty;
    public int Idade { get; private set; }
    public DateTime CriadoEm { get; private set; }
    public DateTime AtualizadoEm { get; private set; }
    public List<Transacao> Transacoes { get; private set; } = new();

    private Pessoa()
    {
    }

    public static Pessoa Criar(string nome, int idade)
    {
        if (string.IsNullOrWhiteSpace(nome))
            throw new DomainException("Nome é obrigatório.");

        if (nome.Trim().Length > 200)
            throw new DomainException("Nome deve ter no máximo 200 caracteres.");

        if (idade <= 0)
            throw new DomainException("Idade deve ser um valor positivo.");

        return new Pessoa
        {
            Id = Guid.NewGuid(),
            Nome = nome.Trim(),
            Idade = idade,
            CriadoEm = DateTime.UtcNow,
            AtualizadoEm = DateTime.UtcNow
        };
    }

    public void Atualizar(string nome, int idade)
    {
        if (string.IsNullOrWhiteSpace(nome))
            throw new DomainException("Nome é obrigatório.");

        if (nome.Trim().Length > 200)
            throw new DomainException("Nome deve ter no máximo 200 caracteres.");

        if (idade <= 0)
            throw new DomainException("Idade deve ser um valor positivo.");

        Nome = nome.Trim();
        Idade = idade;
        AtualizadoEm = DateTime.UtcNow;
    }

    public bool EhMenorDeIdade() => Idade < 18;
}