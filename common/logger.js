/**
 * **Description**: Provides simple logging functions for messages and errors.
 * **Usage**: The logMessage function is used to log regular messages, while logError is used to log errors. 
 * These functions help keep the code organized and facilitate debugging by providing a consistent way to output messages and errors.
 */

// Logs information messages
export function logMessage(message) {
  console.log(message);
}

// Logs error messages
export function logError(error) {
  console.error(error);
}
