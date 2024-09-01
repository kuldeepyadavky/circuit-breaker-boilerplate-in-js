import CircuitBreaker from './circuit-breaker.js';
import Instrumenter from './common/instrumenter.js';
import { logError, logMessage } from './common/logger.js';
import translationService from './services/translation-service.js';

const breakerOptions = {
  failureThreshold: 2, // failures to open the circuit
  successThreshold: 1, // successes to close the circuit
  timeout: 10000 // 10 seconds before moving to half-open
};

const breaker = new CircuitBreaker(translationService, breakerOptions); // adding translation service to circuit breaker 

logMessage(breaker);
// Logs : CircuitBreaker {
//   action: [AsyncFunction: translationService],
//   successThreshold: 2,
//   failureThreshold: 3,
//   timeout: 10000,
//   state: 'CLOSED',
//   failures: 0,
//   successes: 0,
//   nextAttempt: 1725125275265
// }

// using it
(async () => {
  for (let i = 0; i < 20; i++) {
    try {
      const result = await breaker.call('some random text');
      logMessage(`\nresult: ${result}`); // Logs: result from the action
      if (!result) {
        throw new Error('failure response');
      }
      const successInstrumenter = new Instrumenter('translation service returned a valid response', {}, 'parent:fn:line');
      successInstrumenter.instrument();
    } catch (error) {
      // for every error, you are logging it into logs, you are also instrumenting the failures and success response from the service for health monitoring
      // you are not sending an alert as it is handled in circuit breaker for everyone and is not related to translation service
      const customErrorMessage = 'Error occurred while calling translation service';
      logError(`${customErrorMessage} - ${error.message}`); // Logs: Error occurred while calling translation service - 429 too many requests
      const failureInstrumenter = new Instrumenter(customErrorMessage, { error }, 'parent:fn:line');
      failureInstrumenter.instrument();
    }
  }
})();
