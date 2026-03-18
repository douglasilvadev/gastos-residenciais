import { z } from "zod";
import { Finalidade } from "../types/Categoria";

export const categoriaSchema = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "Descrição é obrigatória.")
    .max(400, "Descrição deve ter no máximo 400 caracteres."),

  finalidade: z
    .union([
      z.literal(Finalidade.Despesa),
      z.literal(Finalidade.Receita),
      z.literal(Finalidade.Ambas),
    ])
    .refine((value) => value !== undefined, {
      message: "Selecione uma finalidade válida.",
    }),
});

export type CategoriaFormData = z.output<typeof categoriaSchema>;