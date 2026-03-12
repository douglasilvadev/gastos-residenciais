using GastosResidenciais.Api.src.modules.pessoas.application.dtos;
using GastosResidenciais.Api.src.modules.pessoas.application.use_cases;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.src.modules.pessoas.infra.controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Criar(
        [FromBody] CriarPessoaRequest request,
        [FromServices] CriarPessoaUseCase useCase)
    {
        var resultado = await useCase.Executar(request);
        return CreatedAtAction(nameof(ObterPorId), new { id = resultado.Id }, resultado);
    }

    [HttpGet]
    public async Task<IActionResult> Listar(
        [FromServices] ListarPessoasUseCase useCase)
    {
        var pessoas = await useCase.Executar();
        return Ok(pessoas);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> ObterPorId(
        Guid id,
        [FromServices] ObterPessoaPorIdUseCase useCase)
    {
        var pessoa = await useCase.Executar(id);
        return Ok(pessoa);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Editar(
        Guid id,
        [FromBody] EditarPessoaRequest request,
        [FromServices] EditarPessoaUseCase useCase)
    {
        await useCase.Executar(id, request);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Deletar(
        Guid id,
        [FromServices] DeletarPessoaUseCase useCase)
    {
        await useCase.Executar(id);
        return NoContent();
    }
}