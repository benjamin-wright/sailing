export class GameEngine {
    private lastTime: number = 0;
    private isRunning: boolean = false;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private numberOfFrames: number = 0;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
    }

    public start(): void {
        this.isRunning = true;
        this.lastTime = performance.now();
    }

    public tick(): void {
        if (!this.isRunning) return;

        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;

        this.update(deltaTime);
        this.render();

        this.lastTime = currentTime;
        this.numberOfFrames++;
    }

    private update(deltaTime: number): void {
        // Update game state logic here
    }

    private render(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Set the background color to sky blue
        const increment = this.numberOfFrames % 511;
        const blue = increment < 256 ? increment : 511 - increment;
        this.context.fillStyle = `rgb(${blue}, ${blue}, 255)`;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public stop(): void {
        this.isRunning = false;
    }
}

export default GameEngine;