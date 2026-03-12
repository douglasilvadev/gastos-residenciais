using GastosResidenciais.Api.src.modules.transacoes.application.dtos;
using GastosResidenciais.Api.src.modules.transacoes.application.use_cases;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.src.modules.transacoes.infra.controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Criar(
        [FromBody] CriarTransacaoRequest request,
        [FromServices] CriarTransacaoUseCase useCase)
    {
        var resultado = await useCase.Executar(request);
        return StatusCode(StatusCodes.Status201Created, resultado);
    }

    [HttpGet]
    public async Task<IActionResult> Listar(
        [FromServices] ListarTransacoesUseCase useCase)
    {
        var transacoes = await useCase.Executar();
        return Ok(transacoes);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Deletar(
        Guid id,
        [FromServices] DeletarTransacaoUseCase useCase)
    {
        await useCase.Executar(id);
        return NoContent();
    }
}