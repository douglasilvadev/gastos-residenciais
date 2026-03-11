namespace GastosResidenciais.Api.src.shared.infra.server.exceptions;

/// <summary>
/// Exceção usada para representar violações de regra de negócio.
/// Deve ser convertida em HTTP 400 pelo middleware global.
/// </summary>
public class DomainException : Exception
{
    public DomainException(string message) : base(message)
    {
    }
}