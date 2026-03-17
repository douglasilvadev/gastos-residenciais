using FluentValidation;
using GastosResidenciais.Api.src.modules.pessoas.application.dtos;

namespace GastosResidenciais.Api.src.modules.pessoas.application.validators;

public class EditarPessoaRequestValidator : AbstractValidator<EditarPessoaRequest>
{
    public EditarPessoaRequestValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty()
                .WithMessage("Nome é obrigatório.")
            .MaximumLength(200)
                .WithMessage("Nome deve ter no máximo 200 caracteres.")
            .Matches(@"^[A-Za-zÀ-ÿ\s]+$")
                .WithMessage("Nome deve conter apenas letras e espaços.");

        RuleFor(x => x.Idade)
            .GreaterThan(0)
                .WithMessage("Idade deve ser um valor positivo.")
            .LessThanOrEqualTo(110)
                .WithMessage("Idade máxima permitida é 110 anos.");
    }
}