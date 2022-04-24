import Address from "#seedwork/domain/value-objects/address.vo";

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get address(): Address;
}
