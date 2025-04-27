import { GameLoop } from './game-loop';
// import { Input } from './input';
// import { Camera } from './camera';

export class GameEngine {
  private gameLoop: GameLoop;
  // private input: Input;
  // private camera: Camera;

  constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {
    this.gameLoop = new GameLoop(this.update.bind(this), this.render.bind(this));
    // this.input = new Input();
    // this.camera = new Camera(canvas.width, canvas.height);
  }

  start(): void {
    this.gameLoop.start();
  }

  stop(): void {
    this.gameLoop.stop();
  }

  private update(deltaTime: number): void {
    // Update game logic, systems, and entities
  }

  private render(): void {
    // Render the game world
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Example: Render camera view
    // this.camera.render(this.context);
  }
}