import Address from "../../../@seedwork/domain/value-objects/address.vo";

export interface CustomerProperties {
  id: string;
  name: string;
  address?: Address;
  active?: boolean;
}

export default class Customer {
  constructor(public readonly props: CustomerProperties) {
    this.validate();
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get address() {
    return this.props.address;
  }

  get isActive() {
    return this.props.active;
  }

  set address(address: Address) {
    this.props.address = address;
  }

  changeName(name: string) {
    if (!name || name.length === 0) {
      throw new Error("Name is required");
    }
    this.props.name = name;
  }

  activate() {
    if (!this.props.address) {
      throw new Error("Address is required to activate a customer");
    }
    this.props.active = true;
  }

  deactivate() {
    this.props.active = false;
  }

  private validate() {
    if (!this.props.id || this.props.id.length === 0) {
      throw new Error("Id is required");
    }
    if (!this.props.name || this.props.name.length === 0) {
      throw new Error("Name is required");
    }
  }
}
