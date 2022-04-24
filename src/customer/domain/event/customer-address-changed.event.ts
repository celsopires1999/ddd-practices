import EventInterface from "#seedwork/domain/event/event.interface";
import Customer from "#customer/domain/entity/customer";
export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressChangedEventProps;

  constructor(eventData: CustomerAddressChangedEventProps) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

export type CustomerAddressChangedEventProps = {
  customer: Customer;
};
