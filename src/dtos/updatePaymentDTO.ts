import { PaymentStatus } from "../models/payment";

export interface UpdatePaymentDTO {
  amount: number;
  status: PaymentStatus;
  dueDate: string;
}