import { Router } from "express";
import { PaymentController } from "../controllers/paymentController";

const router = Router();
const controller = new PaymentController();

router.post("/payments/create", controller.create);
router.get("/payments/list", controller.list);
router.get("/payments/list/:id", controller.getById);
router.put("/payments/update/:id", controller.update);
router.patch("/payments/updateStatus/:id", controller.updateStatus);

export default router;
