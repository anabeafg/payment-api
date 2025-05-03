import { Payment, PaymentStatus } from "../models/payment"
import { readPayments, writePayments } from "../utils/fileHandler"
import { v4 as uuidv4 } from "uuid"
import { toBrasiliaISOString } from "../utils/formatDate"
import { CreatePaymentDTO } from "../dtos/createPaymentDTO"
import { UpdatePaymentDTO } from "../dtos/updatePaymentDTO"

const formattedDate = toBrasiliaISOString()

export class PaymentService {
  async list(): Promise<Payment[]> {
    const payments = await readPayments();
    console.log(payments)
    if (payments.length === 0) {
      console.log("Não há registros")
    }
    return payments
  }

  async getById(id: string): Promise<Payment> {
    const payments = await readPayments();
    const payment = payments.find(p => p.id === id);
    if (!payment) {
      throw new Error("Pagamento não encontrado");
    }
    return payment
  }

  async create(paymentData: CreatePaymentDTO): Promise<Payment> {
    const payments = await readPayments();
    const newPayment: Payment = {
      id: uuidv4(),
      amount: paymentData.amount,
      status: PaymentStatus.PENDING,
      createdDate: formattedDate,
      updatedDate: formattedDate,
      dueDate: toBrasiliaISOString(new Date(paymentData.dueDate)),
      paymentDate: null,
    }

    payments.push(newPayment);
    await writePayments(payments);
    return newPayment;
  }

  async update(id: string, data: UpdatePaymentDTO): Promise<Payment> {
    const payments = await readPayments()
    const index = payments.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error("Pagamento não encontrado")
    }
    const updated = {
      ...payments[index],
      ...data,
      updatedDate: formattedDate,
    };
    payments[index] = updated
    await writePayments(payments)
    return updated
  }

  async updateStatus(id: string, status: PaymentStatus): Promise<Payment> {
    const payments = await readPayments()
    const index = payments.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error("Pagamento não encontrado")
    }
    payments[index].status = status
    payments[index].updatedDate = formattedDate
    await writePayments(payments)
    return payments[index]
  }
}