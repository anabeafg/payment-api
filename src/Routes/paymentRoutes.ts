import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

const router = Router();
const controller = new PaymentController();

router.get("/payments", controller.list);
router.get("/payments/:id", controller.getById);
router.post("/payments", controller.create);
router.put("/payments/:id", controller.update);
router.patch("/payments/:id/status", controller.updateStatus);

export default router;
