import Notification from "#seedwork/domain/notification/notification";
export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  get notification(): Notification;
}
