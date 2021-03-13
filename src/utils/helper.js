async function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function getMessageObject(message) {
  return typeof message === 'string' ? JSON.parse(message) : message;
}

module.exports = { sleep, getMessageObject };
