export type EventCallback = (payload: any) => void;

class EventBus {
    private listeners: Record<string, EventCallback[]> = {}

    subscribe(event: string, callback: EventCallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(callback);
    }

    publish(event: string, payload: any) {
        console.log(`[EventBus] Evento publicado: ${event}`, payload)
        if (this.listeners[event]) {
            this.listeners[event].forEach((callback) => callback(payload))
        }
    }
}

export const eventBus = new EventBus();
