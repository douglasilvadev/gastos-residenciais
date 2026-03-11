using GastosResidenciais.Api.src.modules.categorias.application.dtos;
using GastosResidenciais.Api.src.modules.categorias.application.use_cases;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Api.src.modules.categorias.infra.controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Criar(
        [FromBody] CriarCategoriaRequest request,
        [FromServices] CriarCategoriaUseCase useCase)
    {
        var resultado = await useCase.Executar(request);
        return StatusCode(StatusCodes.Status201Created, resultado);
    }

    [HttpGet]
    public async Task<IActionResult> Listar(
        [FromServices] ListarCategoriasUseCase useCase)
    {
        var categorias = await useCase.Executar();
        return Ok(categorias);
    }
}
