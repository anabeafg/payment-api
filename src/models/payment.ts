export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
  OVERDUE = "overdue"
}

export interface Payment {
  id: string
  amount: number
  status: PaymentStatus
  createdDate: string
  updatedDate: string
  dueDate: string | null
  paymentDate: string | null
}