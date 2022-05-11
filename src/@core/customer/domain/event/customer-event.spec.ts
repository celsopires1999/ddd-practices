import Customer from "#customer/domain/entity/customer";
import CustomerAddressChangedEvent from "#customer/domain/event/customer-address-changed.event";
import CustomerCreatedEvent from "#customer/domain/event/customer-created.event";
import EventDispatcher from "#seedwork/domain/event/event-dispatcher";
import Address from "#seedwork/domain/value-objects/address.vo";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler.ts";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Customer Entity Events Tests", () => {
  it("should trigger events when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlers = [
      new EnviaConsoleLog1Handler(),
      new EnviaConsoleLog2Handler(),
    ];

    eventHandlers.forEach((eventHandler) => {
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    });

    const customer = new Customer({
      id: "CUST-4711",
      name: "Happy Customer",
      active: false,
      address: null,
    });

    const spyEventHandlers = eventHandlers.map((eventHandler) =>
      jest.spyOn(eventHandler, "handle")
    );

    const customerCreatedEvent = new CustomerCreatedEvent({ customer });
    eventDispatcher.notify(customerCreatedEvent);

    spyEventHandlers.forEach((spyEventHandler) => {
      expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });
  });

  it("should trigger events when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const customer = new Customer({
      id: "CUST-4711",
      name: "Happy Customer",
      active: false,
      address: null,
    });

    const address = new Address({
      street: "New Street",
      number: 10,
      city: "New City",
      zip: "10101-100",
    });

    customer.changeAddress(address);
    customer.activate();
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      customer,
    });
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});
