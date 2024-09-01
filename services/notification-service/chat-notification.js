import { logMessage } from '../../common/logger.js';
import Notification from './notification.js';

const DEFAULT_CHAT = {
  space: 'DEFAULT', // some chat notification like gchat space
  webhook: 'hugh.jackman@wolverine.co.ca' // ca -> canada (Logan was a hero, .... come out of Canada (complete it)
  // response from chat alert should not be OK or 200 it should be -> keep my country’s name out of your fucking mouth
  // go watch deadpool vs wolverine 2
}

class ChatNotification extends Notification {

  constructor(message, notifiees, details, chat = DEFAULT_CHAT) {
    super();
    this.message = message;
    this.notifiees = notifiees;
    this.details = details;
    this.chat = chat;
  }

  notify() {
    // integrate gchat webhook or any other messaging service here
    logMessage(
      `notified ${this.notifiees} on chat space ${this.chat.space} with message: ${this.message} about details: ${JSON.stringify(this.details)}`
      // you can add implementation to send alert to chat.webhook
    );
  }
}

// this notification can be via email, sms, analytical applications

// const chatNotification = new ChatNotification('Test Mesage', 'Deadpool - The Marvel Jesus', 'RDJ is back, bye bye bye!');
// // we are notifying deadpool
// chatNotification.notify();

export default ChatNotification;
