import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";
import { createPaymentSchema } from "../schemas/createPaymentSchema";
import { updatePaymentSchema } from "../schemas/updatePaymentSchema";
import { z } from "zod";
import { updatePaymentStatusSchema } from "../schemas/updatePaymentStatusSchema";

const paymentService = new PaymentService();

export class PaymentController {
  async list(req: Request, res: Response) {
    const payments = await paymentService.list();
    return res.status(200).json(payments);
  }

  async getById(req: Request, res: Response) {
    try {
      const payment = await paymentService.getById(req.params.id);
      return res.status(200).json(payment);
    } catch (error) {
      return res.status(404).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const paymentData = createPaymentSchema.parse(req.body)
      const payment = await paymentService.create(paymentData);
      return res.status(201).json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const paymentData = updatePaymentSchema.parse(req.body)
      const payment = await paymentService.update(req.params.id, paymentData);
      return res.status(200).json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
      }
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const paymentData = updatePaymentStatusSchema.parse(req.body)
      const payment = await paymentService.updateStatus(req.params.id, paymentData.status);
      return res.status(200).json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
      }
    }
  }
}