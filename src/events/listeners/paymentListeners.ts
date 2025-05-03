import { eventBus } from "../eventBus";

eventBus.subscribe("payment:created", (payment) => {
    console.log(`[Listener] Pagamento criado:`, payment)
});

eventBus.subscribe("payment:updated", (payment) => {
    console.log(`[Listener] Pagamento atualizado:`, payment)
});
