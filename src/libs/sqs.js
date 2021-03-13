const AWS = require('aws-sdk');
const log = require('./logger');

const sqs = new AWS.SQS();

class SimpleSQSQueue {
  queueName = null;
  options = null;

  constructor(queueName, options = {}) {
    this.queueName = queueName;
    this.options = options;
    log.info('[sqs.SimpleSQSQueue.constructor]: QUEUE INITIALIZED');
    log.debug('[sqs.SimpleSQSQueue.constructor.queueName]: ', queueName);
    log.debug('[sqs.SimpleSQSQueue.constructor.options]: ', options);
  }

  async sendMessage(messageObject = {}) {
    const messageBody = JSON.stringify(messageObject);

    log.debug('[sqs.SimpleSQSQueue.sendMessage.queueName]:', this.queueName);
    log.debug('[sqs.SimpleSQSQueue.sendMessage.message]:', messageBody);

    const params = {
      MessageBody: messageBody,
      QueueUrl: this.queueName,
      ...this.options,
    };

    try {
      const sqsSendMessageResponse = await sqs.sendMessage(params).promise();
      return sqsSendMessageResponse;
    } catch (error) {
      log.error('[sqs.SimpleSQSQueue.sendMessage.error]:', error);
      throw error;
    }
  }

  async receiveMessage() {
    const params = {
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ['All'],
      QueueUrl: this.queueName,
      VisibilityTimeout: 0,
      WaitTimeSeconds: 10,
    };

    try {
      const sqsReceiveMessageResponse = await sqs.receiveMessage(params).promise();
      log.info(
        '[sqs.SimpleSQSQueue.receiveMessage.sqsReceiveMessageResponse]:',
        sqsReceiveMessageResponse
      );
      return sqsReceiveMessageResponse;
    } catch (error) {
      log.error('[sqs.SimpleSQSQueue.sendMessage.error]:', error);
      throw error;
    }
  }
}

module.exports = { SimpleSQSQueue };
