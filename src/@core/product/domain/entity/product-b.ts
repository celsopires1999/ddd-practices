import Entity from "#seedwork/domain/entity/entity";
import NotificationError from "#seedwork/domain/notification/notification.error";
import ProductValidatorFactory from "../factory/product-validator.factory";
import ProductInterface from "./product.interface";
export interface ProductProperties {
  id: string;
  name: string;
  price: number;
}

export default class ProductB extends Entity implements ProductInterface {
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
    return this.props.price * 2;
  }

  changeName(name: string) {
    this.props.name = name;
    this.validate();
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  changePrice(price: number) {
    this.props.price = price;
    this.validate();
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  private validate() {
    ProductValidatorFactory.create().validate(this);
    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.errors);
    }
  }
}
