export interface AddressProperties {
  street: string;
  number: number;
  zip: string;
  city: string;
}

export default class Address {
  constructor(public readonly props: AddressProperties) {
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

  private validate() {
    if (!this.props.street || this.props.street.length === 0) {
      throw new Error("street is required");
    }
    if (!this.props.number || this.props.number === 0) {
      throw new Error("number is required");
    }
    if (!this.props.zip || this.props.zip.length === 0) {
      throw new Error("zip is required");
    }
    if (!this.props.city || this.props.city.length === 0) {
      throw new Error("city is required");
    }
  }
}
