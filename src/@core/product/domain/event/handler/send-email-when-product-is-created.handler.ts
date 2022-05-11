import EventHandlerInterface from "#seedwork/domain/event/event-handler.interface";
import ProductCreatedEvent from "#product/domain/event/product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(
      `The product ${event.eventData.name} has been created at ${event.dataTimeOccurred}.` +
        `\nDescription: ${event.eventData.description}.\nPrice: ${event.eventData.price}.`
    );
    console.log(`Sending email to ... TBD`);
  }
}
