import { eventBus } from "./event-bus.js";
import { EventSubscriber } from "./event-subscriber.js";
import { EventType } from "./event.js";

const input = document.querySelector('.input') as HTMLElement;
const output = document.querySelector('.output') as HTMLElement;
const addMessage = document.querySelector('.add-message') as HTMLElement;
const messages = document.querySelector('.messages') as HTMLElement;

input.addEventListener('input', (e: any) => {
    eventBus.emit({ type: EventType.MESSAGE_INPUT, data: { message: e.target.value } }, [EventSubscriber.MAIN]);
});

addMessage.addEventListener('click', () => {
    eventBus.emit({ type: EventType.ADD_MESSAGE, data: { text: output.textContent || '' } }, [EventSubscriber.MAIN]);
});

eventBus.on(EventType.MESSAGE_INPUT, EventSubscriber.MAIN, (data: { message: string }) => {
    output.textContent = data.message;
});

eventBus.on(EventType.ADD_MESSAGE, EventSubscriber.MAIN, (data: { text: string }) => {
    const message = document.createElement('p');
    message.textContent = data.text;
    messages.append(message);
});
