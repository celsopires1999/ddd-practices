export type NotificationProps = {
  message: string;
  context: string;
};

export class Notification {
  private _errors: NotificationProps[] = [];

  get errors(): NotificationProps[] {
    return this._errors;
  }

  addError(error: NotificationProps): void {
    this._errors.push(error);
  }

  hasError(): boolean {
    return this._errors.length > 0;
  }

  messages(context?: string): string {
    return this._errors
      .filter((error) => !context || error.context === context)
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }
}

export default Notification;
