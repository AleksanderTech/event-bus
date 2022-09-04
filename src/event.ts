export enum EventType {
    MESSAGE_INPUT = 'MESSAGE_INPUT',
    ADD_MESSAGE = 'ADD_MESSAGE'
}

export type Event = {
    [EventType.MESSAGE_INPUT]: { type: EventType.MESSAGE_INPUT, data: { message: string } },
    [EventType.ADD_MESSAGE]: { type: EventType.ADD_MESSAGE, data: { text: string } }
};

export type EventValue = Event[keyof Event];
