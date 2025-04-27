import { Component } from './component';

export type EntityId = number;

export interface IEntity {
  id: EntityId;
  getComponent<T extends Component>(componentType: Function): T;
  hasComponent(componentType: Function): boolean;
}

export class Entity implements IEntity {
  private static nextId: EntityId = 1;
  private _id: EntityId;
  private _components: Map<string, Component>;
  private _tags: Set<string>;
  private _active: boolean = true;

  constructor() {
    this._id = Entity.nextId++;
    this._components = new Map<string, Component>();
    this._tags = new Set<string>();
  }

  get id(): EntityId {
    return this._id;
  }
  
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  // Add a component to this entity
  addComponent<T extends Component>(component: T): Entity {
    const componentId = (component.constructor as typeof Component).getId();
    this._components.set(componentId, component);
    component.parent = this; // Set the parent entity for the component
    return this;
  }

  // Get a component by its type
  getComponent<T extends Component>(componentType: Function): T {
    const componentId = (componentType as typeof Component).getId();
    return this._components.get(componentId) as T;
  }

  // Remove a component
  removeComponent(componentType: Function): boolean {
    const componentId = (componentType as typeof Component).getId();
    const component = this._components.get(componentId);
    const removed = this._components.delete(componentId);
    if (removed && component) {
      component.parent = undefined; // Clear the parent reference
    }
    return removed;
  }

  // Check if the entity has a component
  hasComponent(componentType: Function): boolean {
    const componentId = (componentType as typeof Component).getId();
    return this._components.has(componentId);
  }

  // Tag management
  addTag(tag: string): Entity {
    this._tags.add(tag);
    return this;
  }

  hasTag(tag: string): boolean {
    return this._tags.has(tag);
  }

  removeTag(tag: string): boolean {
    return this._tags.delete(tag);
  }
}