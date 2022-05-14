import Entity from "#seedwork/domain/entity/entity";
import NotificationError from "#seedwork/domain/notification/notification.error";
import ProductInterface from "./product.interface";
export interface ProductProperties {
  id: string;
  name: string;
  price: number;
}

export default class ProductB extends Entity implements ProductInterface {
  constructor(public readonly props: ProductProperties) {
    super(props.id);
    this.validate(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price * 2;
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

  private validate(props: ProductProperties) {
    this.validateId(props.id);
    this.validateName(props.name);
    this.validatePrice(props.price);

    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  private validateId(id: string) {
    if (typeof id !== "string") {
      this.notification.addError({
        context: "product",
        message: "Id must be a string",
      });
    }
    if (this.isEmpty(id) || id.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Id is required",
      });
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
