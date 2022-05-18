export interface ValidatorInterface<T> {
  validate(entity: T): void;
}

export default ValidatorInterface;
