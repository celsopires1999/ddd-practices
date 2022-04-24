import EventHandlerInterface from "#seedwork/domain/event/event-handler.interface";
import CustomerAddressChangedEvent from "#customer/domain/event/customer-address-changed.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const customer = event.eventData.customer;
    const constumerAddress = `${customer.address.street} ${customer.address.number} - ${customer.address.city} - ${customer.address.zip}`;
    console.log(
      `Address of customer: ${customer.id}, name: ${customer.name} has been changed to ${constumerAddress}.` +
        `\nEvent raised at: ${event.dataTimeOccurred}.`
    );
  }
}
