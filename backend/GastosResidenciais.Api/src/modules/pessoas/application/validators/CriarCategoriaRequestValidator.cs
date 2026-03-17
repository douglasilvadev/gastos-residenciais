using FluentValidation;
using GastosResidenciais.Api.src.modules.categorias.application.dtos;

namespace GastosResidenciais.Api.src.modules.categorias.application.validators;

public class CriarCategoriaRequestValidator : AbstractValidator<CriarCategoriaRequest>
{
    public CriarCategoriaRequestValidator()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty()
                .WithMessage("Descrição é obrigatória.")
            .MaximumLength(400)
                .WithMessage("Descrição deve ter no máximo 400 caracteres.");

        RuleFor(x => x.Finalidade)
            .IsInEnum()
                .WithMessage("Finalidade deve ser um valor válido.");
    }
}