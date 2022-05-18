import Entity from "#seedwork/domain/entity/entity";
import NotificationError from "#seedwork/domain/notification/notification.error";
import ProductValidatorFactory from "../factory/product-validator.factory";
import ProductInterface from "./product.interface";
export interface ProductProperties {
  id: string;
  name: string;
  price: number;
}

export default class Product extends Entity implements ProductInterface {
  constructor(public readonly props: ProductProperties) {
    super(props.id);
    this.validate();
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  changeName(name: string) {
    this.validateName(name);
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
    this.props.name = name;
  }

  changePrice(price: number) {
    this.validatePrice(price);
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
    this.props.price = price;
  }

  private validate() {
    ProductValidatorFactory.create().validate(this);
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  private validateName(name: string) {
    if (typeof name !== "string") {
      this.notification.addError({
        context: "product",
        message: "name must be a string",
      });
    }
    if (this.isEmpty(name) || name.length === 0) {
      this.notification.addError({
        context: "product",
        message: "name is required",
      });
    }
  }

  private validatePrice(price: number) {
    if (typeof price !== "number") {
      this.notification.addError({
        context: "product",
        message: "price must be a number",
      });
    }
    if (this.isEmpty(price) || price === 0) {
      this.notification.addError({
        context: "product",
        message: "price is required",
      });
    }
    if (price <= 0) {
      this.notification.addError({
        context: "product",
        message: "price must be greater than zero",
      });
    }
  }

  private isEmpty(value: any): boolean {
    return value === null || value === undefined;
  }
}
