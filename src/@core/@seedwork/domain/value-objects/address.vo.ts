import Notification from "#seedwork/domain/notification/notification";
import NotificationError from "../notification/notification.error";

export interface AddressProperties {
  street: string;
  number: number;
  zip: string;
  city: string;
}

export default class Address {
  private notification: Notification;

  constructor(public readonly props: AddressProperties) {
    this.notification = new Notification();
    this.validate();
  }

  get value(): AddressProperties {
    return {
      street: this.props.street,
      number: this.props.number,
      zip: this.props.zip,
      city: this.props.city,
    };
  }

  get street(): string {
    return this.props.street;
  }

  get number(): number {
    return this.props.number;
  }

  get zip(): string {
    return this.props.zip;
  }

  get city(): string {
    return this.props.city;
  }

  private validate() {
    if (!this.props.street || this.props.street.length === 0) {
      this.notification.addError({
        context: "address",
        message: "street is required",
      });
    }
    if (!this.props.number || this.props.number === 0) {
      this.notification.addError({
        context: "address",
        message: "number is required",
      });
    }
    if (!this.props.zip || this.props.zip.length === 0) {
      this.notification.addError({
        context: "address",
        message: "zip is required",
      });
    }
    if (!this.props.city || this.props.city.length === 0) {
      this.notification.addError({
        context: "address",
        message: "city is required",
      });
    }

    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
  }
}
