import { z } from "zod";
import { TipoTransacao } from "../types/Transacao";

export const transacaoSchema = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "Descrição é obrigatória.")
    .max(400, "Descrição deve ter no máximo 400 caracteres."),

  valor: z.coerce
    .number()
    .positive("Valor deve ser maior que zero.")
    .max(999_999_999.99, "Valor máximo excedido.")
    .transform((value) => Math.round(value * 100) / 100),

  tipo: z.union([
    z.literal(TipoTransacao.Despesa),
    z.literal(TipoTransacao.Receita),
  ]),

  categoriaId: z.string().min(1, "Selecione uma categoria."),
  pessoaId: z.string().min(1, "Selecione uma pessoa."),
});

export type TransacaoFormData = z.output<typeof transacaoSchema>;