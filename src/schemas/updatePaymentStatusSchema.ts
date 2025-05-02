import { z } from "zod";
import { PaymentStatus } from "../models/payment";

export const updatePaymentStatusSchema = z.object({
  status: z.nativeEnum(PaymentStatus, {
    invalid_type_error: "O campo 'status' deve conter um valor válido, ex: 'pending', 'paid', 'cancelled', 'overdue'",
  }),
})