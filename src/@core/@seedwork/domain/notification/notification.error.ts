import { NotificationProps } from "#seedwork/domain/notification/notification";

export class NotificationError extends Error {
  constructor(private errors: NotificationProps[]) {
    super(
      errors.map((error) => `${error.context}: ${error.message}`).join(", ")
    );
  }
}

export default NotificationError;
