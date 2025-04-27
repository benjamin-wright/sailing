import { IEntity } from "./entity";

export interface IComponent {
  init?(): void;
}

export abstract class Component implements IComponent {
  private _parent?: IEntity;
  
  get parent(): IEntity | undefined {
    return this._parent;
  }

  set parent(value: IEntity | undefined) {
    this._parent = value;
  }

  // Optional initialization method called when added to an entity
  init?(): void;

  static getId(): string {
    throw new Error('getId() must be implemented in derived classes');
  }
}