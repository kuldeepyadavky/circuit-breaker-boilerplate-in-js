import { logError, logMessage } from './common/logger.js';
import ChatNotification from './services/notification-service/chat-notification.js';

const STATES = {
  open: 'OPEN',
  closed: 'CLOSED',
  halfOpen: 'HALF_OPEN'
}; // all possble valid states

const NOTIFIEES = 'kuldeepyadavky';

// the Circuit Breaker Class that will create new objects for different types of requestes
class CircuitBreaker {

  constructor(action, opts = {}) {
    this.action = action; // Function that needs a Circuit Breaker to watch it and protect it (Thor is the Ciruit Breaker and Midgard is the action that needs protection)
    this.successThreshold = opts.successThreshold || 5; // number of successes to close the circuit
    this.failureThreshold = opts.failureThreshold; // number of failures to open the circuit
    this.timeout = opts.timeout || 5000;

    this.state = STATES.closed; // intially we are expecting the action will work
    this.failures = 0; // number of failures requests tracked
    this.successes = 0; // number of successful requests
    this.nextAttempt = Date.now(); // to know when we have to recheck with a new attempt
  }

  // method to call the protected function
  async call(...args) {
    logMessage(this);
    if (this.state === STATES.open) {
      if (Date.now() > this.nextAttempt) {
        this.state = STATES.halfOpen;
      } else {
        const errorMessage = `Circuit is Open for action: ${this.action.name}. Please check`;
        logError(errorMessage);
        console.log("this", this)
        const chatNotication = new ChatNotification(errorMessage, NOTIFIEES, { });
        chatNotication.notify();
        throw new Error(errorMessage);
      }
    }

    try {
      const result = await this.action(...args);
      this.onSuccess();
      return result;
    } catch {
      this.onFailure();
    }
  }

  // method to handle successful request
  onSuccess() {
    if (this.state === STATES.halfOpen) {
      this.successes++;
    }
    if (this.successes >= this.successThreshold) {
      this.state = 'CLOSED';
      this.failures = 0;
    } else {
      this.successes = 0; // Reset Success in case of first failure in a closed state.
    }
  }

  onFailure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = STATES.open;
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

export default CircuitBreaker;
