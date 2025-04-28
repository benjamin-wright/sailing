export type StateId = string;

// Define event types that can trigger transitions
export type EventType = string;

// State configuration interface
export interface StateConfig {
  id: StateId;
  onEnter?: (data?: any) => void;
  onExit?: (data?: any) => void;
  onUpdate?: (deltaTime: number) => void;
}

// Transition definition - what causes state changes
export interface TransitionConfig {
  from: StateId | '*';  // '*' means "any state"
  to: StateId;
  event: EventType;
  condition?: (data?: any) => boolean;
}

// Data-driven state machine configuration
export interface StateMachineConfig {
  initialState: StateId;
  states: StateConfig[];
  transitions: TransitionConfig[];
}

export class StateMachine {
  private currentState: StateId | null = null;
  private states: Map<StateId, StateConfig> = new Map();
  private transitions: TransitionConfig[] = [];
  
  /**
   * Create a state machine from configuration data
   */
  constructor(config: StateMachineConfig) {
    // Register all states
    config.states.forEach(state => {
      this.states.set(state.id, state);
    });
    
    // Register all transitions
    this.transitions = config.transitions;
    
    // Set initial state
    this.changeState(config.initialState);
  }
  
  /**
   * Change to a specific state
   */
  private changeState(newStateId: StateId, data?: any): void {
    // Exit current state if any
    if (this.currentState) {
      const currentState = this.states.get(this.currentState);
      currentState?.onExit?.(data);
    }
    
    // Enter new state
    const newState = this.states.get(newStateId);
    if (!newState) {
      throw new Error(`State '${newStateId}' not found!`);
    }
    
    this.currentState = newStateId;
    newState.onEnter?.(data);
  }
  
  /**
   * Trigger an event that may cause state transition
   */
  trigger(eventType: EventType, data?: any): boolean {
    if (!this.currentState) return false;
    
    // Find applicable transitions
    const transition = this.transitions.find(t => 
      (t.from === this.currentState || t.from === '*') && 
      t.event === eventType && 
      (!t.condition || t.condition(data))
    );
    
    // If we found a valid transition, change state
    if (transition) {
      this.changeState(transition.to, data);
      return true;
    }
    
    return false;
  }
  
  /**
   * Update the current state
   */
  update(deltaTime: number): void {
    if (!this.currentState) return;
    
    const currentState = this.states.get(this.currentState);
    currentState?.onUpdate?.(deltaTime);
  }
  
  /**
   * Get the current state ID
   */
  getCurrentState(): StateId | null {
    return this.currentState;
  }
}