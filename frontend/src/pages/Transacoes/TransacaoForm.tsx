import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/Button";
import { FormField } from "../../components/FormField";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import {
  transacaoSchema,
  type TransacaoFormData,
} from "../../schemas/transacaoSchema";
import { Finalidade, type Categoria } from "../../types/Categoria";
import { TipoTransacao } from "../../types/Transacao";
import type { Pessoa } from "../../types/Pessoa";

type TransacaoFormInput = z.input<typeof transacaoSchema>;

interface TransacaoFormProps {
  pessoas: Pessoa[];
  categorias: Categoria[];
  onSubmit: (data: TransacaoFormData) => Promise<void>;
}

export function TransacaoForm({
  pessoas,
  categorias,
  onSubmit,
}: TransacaoFormProps) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransacaoFormInput>({
    resolver: zodResolver(transacaoSchema),
    defaultValues: {
      descricao: "",
      valor: 0,
      tipo: TipoTransacao.Despesa,
      categoriaId: "",
      pessoaId: "",
    },
  });

  const tipoSelecionado = watch("tipo");

  const categoriasFiltradas = useMemo(() => {
    return categorias.filter((categoria) => {
      if (categoria.finalidade === Finalidade.Ambas) return true;

      if (tipoSelecionado === TipoTransacao.Despesa) {
        return categoria.finalidade === Finalidade.Despesa;
      }

      return categoria.finalidade === Finalidade.Receita;
    });
  }, [categorias, tipoSelecionado]);

  async function submit(data: TransacaoFormInput) {
    const parsed = transacaoSchema.parse(data);
    await onSubmit(parsed);

    reset({
      descricao: "",
      valor: 0,
      tipo: TipoTransacao.Despesa,
      categoriaId: "",
      pessoaId: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "500px",
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

      <FormField label="Valor" htmlFor="valor" error={errors.valor?.message}>
        <Input
          id="valor"
          type="number"
          step="0.01"
          placeholder="Digite o valor"
          {...register("valor")}
        />
      </FormField>

      <FormField label="Tipo" htmlFor="tipo" error={errors.tipo?.message}>
        <Controller
          control={control}
          name="tipo"
          render={({ field }) => (
            <Select
              id="tipo"
              value={String(field.value)}
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              <option value={String(TipoTransacao.Despesa)}>Despesa</option>
              <option value={String(TipoTransacao.Receita)}>Receita</option>
            </Select>
          )}
        />
      </FormField>

      <FormField
        label="Categoria"
        htmlFor="categoriaId"
        error={errors.categoriaId?.message}
      >
        <Select id="categoriaId" {...register("categoriaId")}>
          <option value="">Selecione uma categoria</option>
          {categoriasFiltradas.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.descricao}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="Pessoa"
        htmlFor="pessoaId"
        error={errors.pessoaId?.message}
      >
        <Select id="pessoaId" {...register("pessoaId")}>
          <option value="">Selecione uma pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </Select>
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Cadastrar transação"}
      </Button>
    </form>
  );
}