import { z } from "zod";

export const createPaymentSchema = z.object({
  amount: z.number({
    required_error: "O campo 'valor' é obrigatório",
    invalid_type_error: "O campo 'valor' deve ser um número",
  }).min(0, "O campo 'valor' deve ser zero ou maior"),

  dueDate: z.string({
    required_error: "O campo 'data de vencimento' é obrigatório",
    invalid_type_error: "O campo 'data de vencimento' deve ser uma string",
  })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "O campo 'data de vencimento' deve ser uma data válida",
    })
});
