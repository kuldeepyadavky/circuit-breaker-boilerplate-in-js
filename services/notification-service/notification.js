import { logMessage, logError } from '../../common/logger.js';

class Notification {
  constructor(msg, notifier, details) {
    // this.msg = msg;
    // this.notifier = notifier;
    // this.details = details;
    // this will never be used here and don't need it in our notify function, hence not used it, you can set this as default logger too
  }

  notify() {
    logError('This is not defined yet!');
  }
}

// const notifier = new Notifier();
// notifier.notify();

export default Notification;
