import { Router } from "express"
import { PaymentController } from "../controllers/paymentController"

const router = Router()
const controller = new PaymentController()

router.post("/payment/create", controller.create)
router.get("/payment/list", controller.list)
router.get("/payment/list/:id", controller.getById)
router.put("/payment/update/:id", controller.update)
router.patch("/payment/updateStatus/:id", controller.updateStatus)

export default router
