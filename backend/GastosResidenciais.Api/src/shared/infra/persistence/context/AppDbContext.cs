using GastosResidenciais.Api.src.modules.categorias.domain.entities;
using GastosResidenciais.Api.src.modules.pessoas.domain.entities;
using GastosResidenciais.Api.src.modules.transacoes.domain.entities;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Api.src.shared.infra.persistence.context;

/// <summary>
/// Contexto principal do Entity Framework Core.
/// Responsável pelo mapeamento entre entidades e tabelas do PostgreSQL.
/// </summary>
public class AppDbContext : DbContext
{
    public DbSet<Pessoa> Pessoas => Set<Pessoa>();
    public DbSet<Categoria> Categorias => Set<Categoria>();
    public DbSet<Transacao> Transacoes => Set<Transacao>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pessoa>(entity =>
        {
            entity.ToTable("pessoas");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.Nome)
                .HasColumnName("nome")
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(e => e.Idade)
                .HasColumnName("idade")
                .IsRequired();

            entity.Property(e => e.CriadoEm)
                .HasColumnName("criado_em")
                .IsRequired();

            entity.Property(e => e.AtualizadoEm)
                .HasColumnName("atualizado_em")
                .IsRequired();

            entity.HasMany(e => e.Transacoes)
                .WithOne(t => t.Pessoa)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasCheckConstraint("ck_pessoas_idade_positiva", "\"idade\" > 0");
        });

        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.ToTable("categorias");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.Descricao)
                .HasColumnName("descricao")
                .HasMaxLength(400)
                .IsRequired();

            entity.Property(e => e.Finalidade)
                .HasColumnName("finalidade")
                .HasConversion<int>()
                .IsRequired();

            entity.Property(e => e.CriadoEm)
                .HasColumnName("criado_em")
                .IsRequired();

            entity.HasMany(e => e.Transacoes)
                .WithOne(t => t.Categoria)
                .HasForeignKey(t => t.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Transacao>(entity =>
        {
            entity.ToTable("transacoes");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.Descricao)
                .HasColumnName("descricao")
                .HasMaxLength(400)
                .IsRequired();

            entity.Property(e => e.Valor)
                .HasColumnName("valor")
                .HasPrecision(18, 2)
                .IsRequired();

            entity.Property(e => e.Tipo)
                .HasColumnName("tipo")
                .HasConversion<int>()
                .IsRequired();

            entity.Property(e => e.CategoriaId)
                .HasColumnName("categoria_id")
                .IsRequired();

            entity.Property(e => e.PessoaId)
                .HasColumnName("pessoa_id")
                .IsRequired();

            entity.Property(e => e.CriadoEm)
                .HasColumnName("criado_em")
                .IsRequired();

            entity.HasCheckConstraint("ck_transacoes_valor_positivo", "\"valor\" > 0");
        });

        base.OnModelCreating(modelBuilder);
    }
}