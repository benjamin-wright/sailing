import { GameEngine } from './core/engine';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');
if (!context) {
    throw new Error('Failed to get canvas context');
}

console.info(`Canvas size: ${canvas.width}x${canvas.height}`);

document.body.appendChild(canvas);

const gameEngine = new GameEngine(canvas, context, {
    initialState: 'mainMenu',
    states: [
        {
            id: 'mainMenu',
            inputMappings: [
                { inputType: 'keyDown', key: 'Enter', action: 'startGame' },
                { inputType: 'keyDown', key: 'Escape', action: 'exit' }
            ]
        }
    ],
    transitions: [],
});

gameEngine.start();