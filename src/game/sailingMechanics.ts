export class SailingMechanics {
    private sailAngle: number;
    private windSpeed: number;
    private boatPosition: { x: number; y: number };

    constructor() {
        this.sailAngle = 0;
        this.windSpeed = 0;
        this.boatPosition = { x: 0, y: 0 };
    }

    public adjustSail(angle: number): void {
        this.sailAngle = angle;
    }

    public calculateWindEffect(): { x: number; y: number } {
        const windEffect = {
            x: Math.cos(this.sailAngle) * this.windSpeed,
            y: Math.sin(this.sailAngle) * this.windSpeed,
        };
        return windEffect;
    }

    public updateBoatPosition(deltaTime: number): void {
        const windEffect = this.calculateWindEffect();
        this.boatPosition.x += windEffect.x * deltaTime;
        this.boatPosition.y += windEffect.y * deltaTime;
    }

    public setWindSpeed(speed: number): void {
        this.windSpeed = speed;
    }

    public getBoatPosition(): { x: number; y: number } {
        return this.boatPosition;
    }
}