using GastosResidenciais.Api.src.modules.pessoas.domain.entities;

namespace GastosResidenciais.Api.src.modules.pessoas.domain.repository_interface;

public interface IPessoaRepository
{
    Task<Pessoa?> ObterPorId(Guid id);
    Task<List<Pessoa>> ListarTodas();
    Task Adicionar(Pessoa pessoa);
    Task Atualizar(Pessoa pessoa);
    Task Remover(Pessoa pessoa);
}
