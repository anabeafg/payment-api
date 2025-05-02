import { z } from "zod";
import { PaymentStatus } from "../models/payment";

export const updatePaymentSchema = z.object({
  amount: z.number({
    invalid_type_error: "O campo 'valor' deve ser um número",
  }).min(0, "O campo 'valor' deve ser zero ou maior"),

  dueDate: z.string({
    invalid_type_error: "O campo 'data de vencimento' deve ser uma string",
  })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "O campo 'data de vencimento' deve ser uma data válida",
    }),

  status: z.nativeEnum(PaymentStatus, {
    invalid_type_error: "O campo 'status' deve conter um valor válido, ex: 'pending', 'paid', 'cancelled', 'overdue'",
  }),
})