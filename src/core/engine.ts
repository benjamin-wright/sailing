// import { Camera } from './camera';

import { Input } from "./input";
import { StateId, StateMachine, StateMachineConfig } from "./state-machine";

export class GameEngine {
  private input: Input;
  // private camera: Camera;
  private stateMachine: StateMachine;
  
  private lastTime: number = 0;
  private isRunning: boolean = false;

  constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D, stateConfig: StateMachineConfig) {
    this.input = new Input();
    // this.camera = new Camera(canvas.width, canvas.height);
    this.stateMachine = new StateMachine(stateConfig);
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
    this.render();
    this.input.clear();
    requestAnimationFrame(this.loop.bind(this));
  }

  private update(deltaTime: number): void {
    // Process input for the current state
    this.stateMachine.processInput(this.input);

    // Update game logic, systems, and entities
    this.stateMachine.update(deltaTime);
  }

  private render(): void {
    // Render the game world
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Example: Render camera view
    // this.camera.render(this.context);
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