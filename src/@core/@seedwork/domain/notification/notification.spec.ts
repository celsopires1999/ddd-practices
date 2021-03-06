import Notification from "./notification";
describe("Notification Unit Tests", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message");
    expect(notification.errors).toStrictEqual([error]);

    const error2 = {
      message: "error message2",
      context: "customer",
    };

    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: error message, customer: error message2"
    );
    expect(notification.errors).toStrictEqual([error, error2]);

    const error3 = {
      message: "error message3",
      context: "order",
    };

    notification.addError(error3);

    expect(notification.messages("customer")).toBe(
      "customer: error message, customer: error message2"
    );

    expect(notification.messages()).toBe(
      "customer: error message, customer: error message2, order: error message3"
    );

    expect(notification.errors).toStrictEqual([error, error2, error3]);
  });

  it("should check if notification has at least one error", () => {
    const notification = new Notification();
    const error = {
      message: "error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.hasError()).toBeTruthy();
  });
});
