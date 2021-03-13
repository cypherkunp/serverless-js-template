const log = require('../../libs/logger');
const { validateSchema } = require('../../libs/schema-validator');
const { getSuccessResponse, getFailResponse, getErrorResponse } = require('../../libs/api-gateway');
const { getCorsHeaders } = require('../../libs/header');
const { middyfy } = require('../../libs/lambda');

const schema = require('./schema');

const helloWorld = async event => {
  log.info('[handler.helloWorld.event.header]: ', event.headers);
  log.info('[handler.helloWorld.event.body]: ', event.body);

  const responseHeaders = getCorsHeaders(event.headers, ['POST', 'OPTIONS']);
  const validationErrors = validateSchema(schema, event.body);

  if (validationErrors) {
    return getFailResponse(400, validationErrors, responseHeaders);
  }

  try {
    const response = {
      message: `Hello World, ${event.body.name}`,
    };
    log.info('[handler.helloWorld.response]: ', response);
    return getSuccessResponse(200, response, responseHeaders);
  } catch (error) {
    log.error(error.data);
    const errorMessage = (error && error.data && error.data.message) || null;
    const errorData = error && error.data;
    return getErrorResponse(500, { message: errorMessage, data: errorData }, responseHeaders);
  }
};

module.exports.main = middyfy(helloWorld);
