export class GameLoop {
  private lastTime: number = 0;
  private isRunning: boolean = false;

  constructor(private update: (deltaTime: number) => void, private render: () => void) {}

  start(): void {
    this.isRunning = true;
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

    requestAnimationFrame(this.loop.bind(this));
  }
}