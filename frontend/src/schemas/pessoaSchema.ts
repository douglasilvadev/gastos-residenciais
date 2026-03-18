import { z } from "zod";

export const pessoaSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório.")
    .max(200, "Nome deve ter no máximo 200 caracteres.")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços."),

  idade: z.coerce
    .number()
    .int("Idade deve ser um número inteiro.")
    .min(1, "Idade mínima é 1 ano.")
    .max(110, "Idade máxima permitida é 110 anos."),
});

export type PessoaFormData = z.output<typeof pessoaSchema>;