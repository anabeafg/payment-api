import { z } from "zod"

export const updatePaymentSchema = z.object({
  amount: z.number({
    invalid_type_error: "O campo 'valor' deve ser um número",
  }).min(0, "O campo 'valor' deve ser zero ou maior").optional(),

  dueDate: z.string({
    invalid_type_error: "O campo 'data de vencimento' deve ser uma string",
  })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "O campo 'data de vencimento' deve ser uma data válida",
    }).optional(),
}).refine(data => data.amount !== undefined || data.dueDate !== undefined, {
  message: "Pelo menos um dos campos (valor ou data de vencimento) deve ser fornecido para atualização.",
  path: ["amount", "dueDate"]
});