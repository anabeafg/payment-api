import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../services/paymentService";
import { createPaymentSchema } from "../schemas/createPaymentSchema";
import { updatePaymentSchema } from "../schemas/updatePaymentSchema";
import { updatePaymentStatusSchema } from "../schemas/updatePaymentStatusSchema";
import { paymentCreated, paymentUpdated } from "../events/notification/paymentNotification";

const paymentService = new PaymentService();

export class PaymentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentData = createPaymentSchema.parse(req.body);
      const payment = await paymentService.create(paymentData);
      paymentCreated(payment);
      return res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await paymentService.list();
      return res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await paymentService.getById(req.params.id);
      return res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentData = updatePaymentSchema.parse(req.body);
      const payment = await paymentService.update(req.params.id, paymentData);
      paymentUpdated(payment);
      return res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentData = updatePaymentStatusSchema.parse(req.body);
      const payment = await paymentService.updateStatus(req.params.id, paymentData.status);
      paymentUpdated(payment);
      return res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  }
}
