
# Circuit Breaker Pattern Implementation in JavaScript

## Overview

This project demonstrates the implementation of the Circuit Breaker design pattern in JavaScript. The Circuit Breaker pattern is a key concept in handling failures in distributed systems and ensuring resilience by preventing repeated failures from causing cascading failures.

## Folder Structure

```
.
├── app.js                   # Main application file
├── circuit-breaker.js       # Circuit Breaker class implementation
├── common                   # Common utilities
│   ├── instrumenter.js      # Instrumentation utility for event logging
│   └── logger.js            # Simple logging functions
├── package.json             # Node.js package file
└── services                 # Service files
    ├── notification-service # Notification services
    │   ├── chat-notification.js # Chat notification implementation
    │   └── notification.js  # Base Notification class
    └── translation-service.js # Simulated translation service
```

## How to Run

1. Clone the repository:
  ```sh
    git clone https://github.com/kuldeepyadavky/circuit-breaker-boilerplate-in-js
    cd circuit-breaker-boilerplate-in-js
  ```

2. Run the application:
  ```sh
    node app.js
  ```

## Explanation of the Circuit Breaker


For a detailed explanation, check out my blog
  ```sh
    https://kuldeepyadavky.medium.com/circuit-breaker-design-pattern-2d94b3c69c5b
  ```

The `CircuitBreaker` class in `circuit-breaker.js` is designed to manage the state of a protected function (an action) and decide whether it should be executed or blocked based on its recent success or failure rate. The circuit can be in one of three states: 

1. **Closed**: The function is working fine, and all requests are passed through.
2. **Open**: The function has failed repeatedly, and further requests are blocked for a set amount of time.
3. **Half-Open**: The circuit allows a few test requests to see if the function has recovered.

### Key Components:

- **Constructor**: Initializes the circuit with thresholds and initial state.
- **call method**: Handles requests and manages state transitions.
- **onSuccess method**: Called when the protected function succeeds, helping to reset the circuit.
- **onFailure method**: Called when the protected function fails, incrementing the failure count and possibly opening the circuit.

### Usage of Circuit Breaker

The circuit breaker is configured to use the `translationService`, a simulated service that randomly fails to illustrate the Circuit Breaker's handling of failures.

## Logging and Instrumentation

Logging is done using simple functions (`logMessage`, `logError`) to provide clarity on what the application is doing. Instrumentation is used to monitor and record the events, which is crucial for debugging and improving the service.

## Notification Service

The notification service demonstrates how to extend the base `Notification` class to implement different types of alerts, such as chat notifications (`ChatNotification`).

## Why Circuit Breaker?

The Circuit Breaker pattern is critical for ensuring system resilience by avoiding repetitive failures and quickly detecting and responding to failures in distributed systems. It helps to maintain the stability of the entire system by cutting off access to a failing service, giving it time to recover.

## Additional Information

For more detailed explanations and code comments, please refer to the respective files in the repository.

## License

This project is licensed under the MIT License.