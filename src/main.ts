import { EventBus } from "./event-bus";
import { Subscriber, BusEvent, BusEventWithData } from "./types";

export const eventBus = new EventBus<Subscriber, BusEvent, BusEventWithData>();

// subscriber
eventBus.on({
  subscriber: Subscriber.theModal,
  event: BusEvent.showModal,
  handler: (data: { title: string }) => {
    console.log(data);
  },
});

// publisher
eventBus.emit({
  event: BusEvent.showModal,
  data: { title: "your title" },
  subscribers: [Subscriber.theModal],
});
