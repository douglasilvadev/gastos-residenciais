import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import {
  categoriaSchema,
  type CategoriaFormData,
} from "../../schemas/categoriaSchema";
import { Finalidade } from "../../types/Categoria";

interface CategoriaFormProps {
  onSubmit: (data: CategoriaFormData) => Promise<void>;
}

export function CategoriaForm({ onSubmit }: CategoriaFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      descricao: "",
    },
  });

  useEffect(() => {
    reset({
      descricao: "",
    });
  }, [reset]);

  async function submit(data: CategoriaFormData) {
    await onSubmit(data);
    reset({
      descricao: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
      }}
    >
      <FormField
        label="Descrição"
        htmlFor="descricao"
        error={errors.descricao?.message}
      >
        <Input
          id="descricao"
          placeholder="Digite a descrição"
          {...register("descricao")}
        />
      </FormField>

      <FormField
        label="Finalidade"
        htmlFor="finalidade"
        error={errors.finalidade?.message}
      >
        <Controller
          control={control}
          name="finalidade"
          render={({ field }) => (
            <Select
              id="finalidade"
              hasError={!!errors.finalidade}
              value={field.value === undefined ? "" : String(field.value)}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? undefined : Number(value));
              }}
            >
              <option value="">Selecione uma finalidade</option>
              <option value={String(Finalidade.Despesa)}>Despesa</option>
              <option value={String(Finalidade.Receita)}>Receita</option>
              <option value={String(Finalidade.Ambas)}>Ambas</option>
            </Select>
          )}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Cadastrar categoria"}
      </Button>
    </form>
  );
}