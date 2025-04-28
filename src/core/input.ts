export type InputKey = string;

/**
 * Manages user input from keyboard, mouse and touch
 */
export class Input {
  // Keyboard state
  private keysDown: Set<InputKey> = new Set();
  private keysPressed: Set<InputKey> = new Set();
  private keysReleased: Set<InputKey> = new Set();
  
  // Mouse state
  private mousePosition: { x: number, y: number } = { x: 0, y: 0 };
  private mouseButtons: Map<number, boolean> = new Map();
  private mouseWheel: number = 0;
  
  // Touch state
  private touches: Map<number, {x: number, y: number}> = new Map();
  
  constructor() {
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      if (!this.keysDown.has(e.code)) {
        this.keysPressed.add(e.code);
      }
      this.keysDown.add(e.code);
    });
    
    window.addEventListener('keyup', (e) => {
      this.keysDown.delete(e.code);
      this.keysReleased.add(e.code);
    });
    
    // Mouse events
    window.addEventListener('mousemove', (e) => {
      this.updateMousePosition(e);
    });
    
    window.addEventListener('mousedown', (e) => {
      this.mouseButtons.set(e.button, true);
    });
    
    window.addEventListener('mouseup', (e) => {
      this.mouseButtons.set(e.button, false);
    });
    
    window.addEventListener('wheel', (e) => {
      this.mouseWheel = Math.sign(e.deltaY);
    });
    
    // Touch events
    window.addEventListener('touchstart', (e) => {
      this.updateTouches(e);
    });
    
    window.addEventListener('touchmove', (e) => {
      this.updateTouches(e);
    });
    
    window.addEventListener('touchend', (e) => {
      this.updateTouches(e);
    });
    
    // Prevent context menu on right click
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }
  
  /**
   * Clear method to be called at the end of each frame
   */
  clear(): void {
    // Clear one-frame state
    this.keysPressed.clear();
    this.keysReleased.clear();
    this.mouseWheel = 0;
  }
  
  // Keyboard methods
  isKeyDown(key: InputKey): boolean {
    return this.keysDown.has(key);
  }
  
  isKeyPressed(key: InputKey): boolean {
    return this.keysPressed.has(key);
  }
  
  isKeyReleased(key: InputKey): boolean {
    return this.keysReleased.has(key);
  }
  
  // Mouse methods
  getMousePosition(): { x: number, y: number } {
    return { ...this.mousePosition };
  }
  
  isMouseButtonDown(button: number): boolean {
    return this.mouseButtons.get(button) === true;
  }
  
  getMouseWheel(): number {
    return this.mouseWheel;
  }
  
  // Touch methods
  getTouches(): Map<number, {x: number, y: number}> {
    return new Map(this.touches);
  }
  
  isTouching(): boolean {
    return this.touches.size > 0;
  }
  
  // Helper methods
  private updateMousePosition(e: MouseEvent): void {
    // Get canvas-relative coordinates
    const canvas = e.target as HTMLCanvasElement;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      this.mousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      return;
    }
    
    this.mousePosition = { x: e.clientX, y: e.clientY };
  }
  
  private updateTouches(e: TouchEvent): void {
    // Clear previous touches
    this.touches.clear();
    
    // Update with current touches
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const rect = (touch.target as HTMLElement).getBoundingClientRect();
      this.touches.set(touch.identifier, {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  }
}