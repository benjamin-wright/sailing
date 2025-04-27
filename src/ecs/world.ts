import { Entity, EntityId } from './entity';
import { System, EntityAccessor } from './system';

export class World implements EntityAccessor {
  private _entities: Map<EntityId, Entity> = new Map();
  private _systems: System[] = [];
  private _entitiesToAdd: Entity[] = [];
  private _entitiesToRemove: EntityId[] = [];
  private _systemsDirty: boolean = false;

  // Add an entity to the world
  addEntity(entity: Entity): void {
    this._entitiesToAdd.push(entity);
  }

  // Remove an entity from the world
  removeEntity(entityId: EntityId): void {
    this._entitiesToRemove.push(entityId);
  }

  // Add a system to the world
  addSystem(system: System): void {
    this._systems.push(system);
    this._systemsDirty = true;
  }

  // Get all entities with specific component types
  getEntitiesWith(...componentTypes: Function[]): Entity[] {
    const result: Entity[] = [];
    
    this._entities.forEach(entity => {
      let hasAllComponents = true;
      
      for (const type of componentTypes) {
        if (!entity.hasComponent(type)) {
          hasAllComponents = false;
          break;
        }
      }
      
      if (hasAllComponents) {
        result.push(entity);
      }
    });
    
    return result;
  }

  // Update all systems and process entity additions/removals
  update(deltaTime: number): void {
    // Process pending entity operations
    this._processEntityOperations();
    
    // Sort systems by priority if needed
    if (this._systemsDirty) {
      this._systems.sort((a, b) => a.priority - b.priority);
      this._systemsDirty = false;
    }
    
    // Update all systems
    for (const system of this._systems) {
      system.update(deltaTime, this);
    }
  }

  private _processEntityOperations(): void {
    // Add pending entities
    for (const entity of this._entitiesToAdd) {
      this._entities.set(entity.id, entity);
    }
    this._entitiesToAdd = [];
    
    // Remove pending entities
    for (const entityId of this._entitiesToRemove) {
      this._entities.delete(entityId);
    }
    this._entitiesToRemove = [];
  }
}