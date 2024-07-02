export enum Subscriber {
  theModal = "theModal",
  mobileNavigation = "mobileNavigation",
}

export enum BusEvent {
  showModal = "showModal",
  toggleMobileNavigation = "toggleMobileNavigation",
}

export type BusEventWithData = {
  [BusEvent.showModal]: { title: string };
  [BusEvent.toggleMobileNavigation]: undefined;
};
