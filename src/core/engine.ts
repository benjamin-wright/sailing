import { Input } from "./input";
import { StateId, StateMachine, StateMachineConfig } from "./state-machine";

export class GameEngine {
  private stateMachine: StateMachine;
  private input: Input;
  
  private lastTime: number = 0;
  private isRunning: boolean = false;

  constructor(stateConfig: StateMachineConfig) {
    this.stateMachine = new StateMachine(stateConfig);
    this.input = new Input();
  }

  start(): void {
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  stop(): void {
    this.isRunning = false;
  }

  private loop(currentTime: number): void {
    if (!this.isRunning) return;
  
    const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = currentTime;
    this.update(deltaTime);
    this.input.clear();
    requestAnimationFrame(this.loop.bind(this));
  }

  private update(deltaTime: number): void {
    // Process input for the current state
    this.stateMachine.processInput(this.input);

    // Update game logic, systems, and entities
    this.stateMachine.update(deltaTime);
  }

  triggerStateEvent(eventType: string, data?: any): boolean {
    return this.stateMachine.trigger(eventType, data);
  }

  getCurrentState(): StateId | null {
    return this.stateMachine.getCurrentState();
  }

  getInput(): Input {
    return this.input;
  }
}