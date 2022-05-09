import EventHandlerInterface from "#seedwork/domain/event/event-handler.interface";
import CustomerCreatedEvent from "#customer/domain/event/customer-created.event";

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const customer = event.eventData.customer;
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    console.log(
      `The customer: ${customer.name} has been created. Event raised at ${event.dataTimeOccurred}.` +
        `\nId: ${customer.id}.`
    );
  }
}
