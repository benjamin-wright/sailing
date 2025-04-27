import { GameEngine } from './game/engine';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');
if (!context) {
    throw new Error('Failed to get canvas context');
}

console.info(`Canvas size: ${canvas.width}x${canvas.height}`);

document.body.appendChild(canvas);

const gameEngine = new GameEngine(canvas, context);

function gameLoop() {
    gameEngine.tick();
    requestAnimationFrame(gameLoop);
}

gameEngine.start();
gameLoop();