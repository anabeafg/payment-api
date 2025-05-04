import { z } from "zod";

export const createPaymentSchema = z.object({
  amount: z.number({
    required_error: "O campo 'valor' é obrigatório",
    invalid_type_error: "O campo 'valor' deve ser um número",
  }).min(0.01, "O campo 'valor' deve ser 0.01 ou maior"),

  dueDate: z.string({
    required_error: "O campo 'data de vencimento' é obrigatório",
    invalid_type_error: "O campo 'data de vencimento' deve ser uma string",
  })
    .refine((val) => /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/.test(val), {
      message: "O campo 'data de vencimento' deve estar no formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss.SSSZ",
    })
    .refine((val) => {
      const parsedDate = new Date(val);
      return !isNaN(parsedDate.getTime());
    }, {
      message: "O campo 'data de vencimento' deve ser uma data válida",
    })
});