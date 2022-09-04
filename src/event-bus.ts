import { EventSubscriber as Subscriber } from "./event-subscriber.js";
import { EventType, EventValue } from './event.js';

type EventHandler = (data?: any) => void;

export class EventBus {
    private static instance = new EventBus();
    events = new Map<string, EventHandler>();

    constructor() {
        if (EventBus.instance == null) EventBus.instance = this;
        return EventBus.instance;
    }

    on(event: EventType, subscriber: Subscriber, handler: EventHandler): void {
        this.events.set(this.key(event, subscriber), handler);
    }

    emit(event: EventValue, subscribers: Subscriber[]): void {
        for (let subscriber of subscribers) {
            let events = this.events.get(this.key(event.type, subscriber));
            if (events) events(event.data);
        }
    }

    remove(event: EventType, subscriber: Subscriber) {
        this.events.delete(this.key(event, subscriber));
    }

    clearAll(): void {
        this.events.clear();
    }

    private key(event: EventType, subscriber: Subscriber): string {
        return `${event}/${subscriber}`;
    }
}

export const eventBus = new EventBus();
