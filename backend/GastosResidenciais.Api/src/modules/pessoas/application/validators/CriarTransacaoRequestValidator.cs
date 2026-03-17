using FluentValidation;
using GastosResidenciais.Api.src.modules.transacoes.application.dtos;

namespace GastosResidenciais.Api.src.modules.transacoes.application.validators;

public class CriarTransacaoRequestValidator : AbstractValidator<CriarTransacaoRequest>
{
    public CriarTransacaoRequestValidator()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty()
                .WithMessage("Descrição é obrigatória.")
            .MaximumLength(400)
                .WithMessage("Descrição deve ter no máximo 400 caracteres.");

        RuleFor(x => x.Valor)
            .GreaterThan(0)
                .WithMessage("Valor deve ser maior que zero.");

        RuleFor(x => x.Tipo)
            .IsInEnum()
                .WithMessage("Tipo deve ser um valor válido.");

        RuleFor(x => x.CategoriaId)
            .NotEmpty()
                .WithMessage("Categoria é obrigatória.");

        RuleFor(x => x.PessoaId)
            .NotEmpty()
                .WithMessage("Pessoa é obrigatória.");
    }
}