import Notification from "#seedwork/domain/notification/notification";
export abstract class Entity {
  private _id: string;
  private _notification: Notification;

  constructor(id: string) {
    this._id = id;
    this._notification = new Notification();
  }

  get id() {
    return this._id;
  }

  get notification(): Notification {
    return this._notification;
  }

  set notification(notification: Notification) {
    this._notification = notification;
  }
}

export default Entity;
