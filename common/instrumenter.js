import { logMessage, logError } from './common/logger.js';

class Instrumenter {
  constructor(event, details, eventSource, destination='RMQ', isError=false) {
    super()
    this.event = event
    // this.notifier = notifier; (Notifiers not needed for instrumentation, hence this is not added)
    this.details = details;
    this.source = eventSource;
    this.destination = destination;
    this.isError = isError;
    // this will never be used here and don't need it in our notify function, hence not used it, you can set this as default logger too
  }

  instrument() {
    // send to RMQ for Instrumentation
    // add to DB if event tracking is done there (this shouldn't not happen, use ClickHouse)
    logMessage(
      `Event for ${this.event} just emitted from source: ${this.source} has additional details about the event: ${this.details}`
    );

    if (this.isError) {
      logError(
        `Error Event for ${this.event} just emitted from source: ${this.source} has additional details about the event: ${this.details}`
      )
    }
  }
}

// const instrumenter = new Instrumenter();
// instrumenter.instrument();

export default Instrumenter;
// why is this file needed ? (why is instrumentation required ?)
// Quoting my CEO -> If you can't instrument it -> you can't fix it  or improve it !
