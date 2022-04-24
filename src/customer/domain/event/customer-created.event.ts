import EventInterface from "#seedwork/domain/event/event.interface";
import Customer from "#customer/domain/entity/customer";
export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerCreatedEventProps;

  constructor(eventData: CustomerCreatedEventProps) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

export type CustomerCreatedEventProps = {
  customer: Customer;
};
