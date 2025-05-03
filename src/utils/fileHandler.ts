import fs from "fs/promises"
import path from "path"
import { Payment } from "../models/payment"

const filePath = path.join(process.cwd(), "payments.json")

export async function readPayments(): Promise<Payment[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return []
    }
    throw err
  }
}

export async function writePayments(payments: Payment[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(payments, null, 2))
}