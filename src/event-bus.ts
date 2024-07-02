type EventHandler<T> = (data: T) => void;

export class EventBus<
  Subscriber extends string,
  BusEvent extends string,
  BusEventWithData extends Record<BusEvent, any>
> {
  events = new Map<string, EventHandler<any>>();

  on<BE extends BusEvent>({
    event,
    subscriber,
    handler,
  }: {
    event: BE;
    subscriber: Subscriber;
    handler: EventHandler<BusEventWithData[BE]>;
  }): void {
    this.events.set(this.key(event, subscriber), handler);
  }

  emit<BE extends BusEvent>({
    event,
    data,
    subscribers,
  }: {
    event: BE;
    data?: BusEventWithData[BE];
    subscribers: Subscriber[];
  }): void {
    for (const subscriber of subscribers) {
      if (this.events.get(this.key(event, subscriber))) {
        this.events.get(this.key(event, subscriber))?.(data);
      }
    }
  }

  remove(event: BusEvent, subscriber: Subscriber) {
    this.events.delete(this.key(event, subscriber));
  }

  clearAll(): void {
    this.events.clear();
  }

  clearAllExcept(subscribers: Subscriber[]) {
    for (const key of [...this.events.keys()]) {
      if (!subscribers.find((s) => key.endsWith(s))) {
        this.events.delete(key);
      }
    }
  }

  private key(event: BusEvent, subscriber: Subscriber): string {
    return `${event}/${subscriber}`;
  }
}
