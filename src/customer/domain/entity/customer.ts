import Address from "../../../@seedwork/domain/value-objects/address.vo";

export interface CustomerProperties {
  id: string;
  name: string;
  address?: Address;
  active?: boolean;
}

export default class Customer {
  private _rewardPoints: number = 0;

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

  get rewardPoints(): number {
    return this._rewardPoints;
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

  addRewardPoints(points: number) {
    this._rewardPoints += points;
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
