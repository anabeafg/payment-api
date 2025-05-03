import { eventBus } from "../eventBus";
import { Payment } from "../../models/payment";

export const paymentCreated = (payment: Payment): void => {
    eventBus.publish("payment:created", payment);
};

export const paymentUpdated = (payment: Payment): void => {
    eventBus.publish("payment:updated", payment);
};