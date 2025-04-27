import { World } from './world';
import { Entity, EntityId } from './entity';

export interface EntityAccessor {
    // Add an entity to the world
    addEntity(entity: Entity): void;
    // Remove an entity from the world
    removeEntity(entityId: EntityId): void;
    // Get all entities with specific component types
    getEntitiesWith(...componentTypes: Function[]): Entity[]
}

export interface System {
  // Required component types for entities to be processed by this system
  readonly requiredComponents: Function[];
  
  // Priority determines update order (lower numbers = earlier updates)
  readonly priority: number;
  
  // Called on each update cycle
  update(deltaTime: number, world: EntityAccessor): void;
}

export abstract class BaseSystem implements System {
  abstract readonly requiredComponents: Function[];
  readonly priority: number = 0;

  constructor(priority: number = 0) {
    this.priority = priority;
  }

  update(deltaTime: number, world: EntityAccessor): void {
    // Get entities with the required components
    const entities = world.getEntitiesWith(...this.requiredComponents);

    // Process each entity
    for (const entity of entities) {
      if (entity.active) {
        this.processEntity(deltaTime, entity, world);
      }
    }
  }

  protected abstract processEntity(deltaTime: number, entity: Entity, world: EntityAccessor): void;
}