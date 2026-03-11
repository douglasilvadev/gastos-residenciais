using GastosResidenciais.Api.src.modules.transacoes.application.use_cases;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.src.modules.transacoes.infra.controllers;

[ApiController]
[Route("api/[controller]")]
public class RelatoriosController : ControllerBase
{
    [HttpGet("totais-por-pessoa")]
    public async Task<IActionResult> TotaisPorPessoa(
        [FromServices] ConsultarTotaisPorPessoaUseCase useCase)
    {
        var resultado = await useCase.Executar();
        return Ok(resultado);
    }

    [HttpGet("totais-por-categoria")]
    public async Task<IActionResult> TotaisPorCategoria(
        [FromServices] ConsultarTotaisPorCategoriaUseCase useCase)
    {
        var resultado = await useCase.Executar();
        return Ok(resultado);
    }
}
