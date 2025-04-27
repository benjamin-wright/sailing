import { Entity } from './entity';
import { World } from './world';

export class EntityQuery {
  private componentTypes: Function[];
  private cachedEntities: Entity[] = [];
  private lastUpdateTime: number = -1;
  
  constructor(world: World, ...componentTypes: Function[]) {
    this.componentTypes = componentTypes;
  }
  
  getEntities(world: World, updateTime: number): Entity[] {
    if (this.lastUpdateTime !== updateTime) {
      this.cachedEntities = world.getEntitiesWith(...this.componentTypes);
      this.lastUpdateTime = updateTime;
    }
    return this.cachedEntities;
  }
}