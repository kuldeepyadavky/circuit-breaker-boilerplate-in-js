// Simulating the translation service

const translationService = async (text) => {
  // simulating a request to an external translation service as I don't want implement all the http pattern here

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random() > 0.7;

      if (randomNumber) { // Simulate a failure rate of 30%
        reject(new Error('translation service is down.'));
      } else {
        resolve(`Translated: ${text}`);
      }

    }, 1000);
  });
}

export default translationService;
