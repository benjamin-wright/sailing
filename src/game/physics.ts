class PhysicsController {
    private gravity: number;
    private friction: number;

    constructor() {
        this.gravity = 9.81; // Gravity constant
        this.friction = 0.1; // Friction coefficient
    }

    applyGravity(boat: { velocity: number; position: number }) {
        boat.velocity += this.gravity;
        boat.position += boat.velocity;
    }

    checkCollisions(boat: { position: number }, obstacles: Array<{ position: number; width: number }>) {
        for (const obstacle of obstacles) {
            if (boat.position >= obstacle.position && boat.position <= obstacle.position + obstacle.width) {
                // Handle collision
                console.log("Collision detected!");
            }
        }
    }

    updatePosition(boat: { position: number; velocity: number }) {
        boat.position += boat.velocity;
        boat.velocity *= (1 - this.friction); // Apply friction
    }
}

export default PhysicsController;