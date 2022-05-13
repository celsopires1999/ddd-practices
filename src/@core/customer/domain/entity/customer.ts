import Entity from "#seedwork/domain/entity/entity";
import NotificationError from "#seedwork/domain/notification/notification.error";
import Address from "#seedwork/domain/value-objects/address.vo";

export interface CustomerProperties {
  id: string;
  name: string;
  address?: Address;
  active?: boolean;
}

export default class Customer extends Entity {
  private _rewardPoints: number = 0;

  private _name: string;
  private _address: Address;
  private _active: boolean;

  constructor(props: CustomerProperties) {
    super(props.id);
    this._name = props.name;
    this._address = props.address;
    this.isActive = props.active;
    this.validate();
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  get isActive() {
    return this._active;
  }

  private set isActive(active: boolean) {
    this._active = active ? true : false;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeAddress(address: Address) {
    if (!address && this._active) {
      throw new Error("Address is mandatory when customer is active");
    }
    if (!(address instanceof Address)) {
      throw new Error("Address value is invalid");
    }

    this._address = address;
  }

  removeAddress() {
    if (this._active) {
      throw new Error("Address cannot be removed when customer is active");
    }

    this._address = null;
  }

  changeName(name: string) {
    if (!name || name.length === 0) {
      throw new Error("Name is required");
    }
    this._name = name;
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is required to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  private validate() {
    if (!this._id || this._id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required",
      });
    }

    if (!this._name || this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required",
      });
    }

    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
  }
}
