namespace GastosResidenciais.Api.src.shared.infra.server.exceptions;

/// <summary>
/// Exceção usada quando um recurso não é encontrado.
/// Deve ser convertida em HTTP 404 pelo middleware global.
/// </summary>
public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message)
    {
    }
}