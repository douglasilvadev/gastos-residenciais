import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { Input } from "../../components/Input";
import { pessoaSchema, type PessoaFormData } from "../../schemas/pessoaSchema";

type PessoaFormInput = z.input<typeof pessoaSchema>;

interface PessoaFormProps {
  editando: boolean;
  defaultValues?: PessoaFormData;
  onSubmit: (data: PessoaFormData) => Promise<void>;
  onCancel?: () => void;
}

export function PessoaForm({
  editando,
  defaultValues,
  onSubmit,
  onCancel,
}: PessoaFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PessoaFormInput>({
    resolver: zodResolver(pessoaSchema),
    defaultValues: defaultValues ?? {
      nome: "",
      idade: 0,
    },
  });

  useEffect(() => {
    reset(
      defaultValues ?? {
        nome: "",
        idade: 0,
      }
    );
  }, [defaultValues, reset]);

  async function submit(data: PessoaFormInput) {
    const parsed = pessoaSchema.parse(data);
    await onSubmit(parsed);
  }

  const nomeRegister = register("nome");
  const idadeRegister = register("idade");

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
      <FormField label="Nome" htmlFor="nome" error={errors.nome?.message}>
        <Input
          id="nome"
          placeholder="Digite o nome"
          {...nomeRegister}
          onChange={(e) => {
            const valor = e.target.value;
            const somenteLetras = valor.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
            e.target.value = somenteLetras;
            nomeRegister.onChange(e);
          }}
        />
      </FormField>

      <FormField label="Idade" htmlFor="idade" error={errors.idade?.message}>
        <Input
          id="idade"
          type="number"
          placeholder="Digite a idade"
          {...idadeRegister}
        />
      </FormField>

      <div style={{ display: "flex", gap: "12px" }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Salvando..."
            : editando
            ? "Salvar alterações"
            : "Cadastrar pessoa"}
        </Button>

        {editando && onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}