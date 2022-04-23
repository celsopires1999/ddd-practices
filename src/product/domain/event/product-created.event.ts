import EventInterface from "#seedwork/domain/event/event.interface";
export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: ProductCreatedEventProps;

  constructor(eventData: ProductCreatedEventProps) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

export type ProductCreatedEventProps = {
  name: string;
  description: string;
  price: number;
};
