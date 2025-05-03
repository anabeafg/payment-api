import { z } from "zod";

export const updatePaymentSchema = z.object({
  amount: z.number({
    invalid_type_error: "O campo 'valor' deve ser um número",
  }).min(0, "O campo 'valor' deve ser zero ou maior"),

  dueDate: z.string({
    invalid_type_error: "O campo 'data de vencimento' deve ser uma string",
  })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "O campo 'data de vencimento' deve ser uma data válida",
    })
})