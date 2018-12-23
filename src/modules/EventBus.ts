class EventBus {
    private listeners: object;

    constructor() {
        this.listeners = {};
    }

    public on(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }

    public off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event]
                .filter((listener) => listener !== callback);
        }
    }

    public emit(event, data = {}) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => {
                listener(data);
            });
        }
    }
}

const eventBus = new EventBus();
export default eventBus;
