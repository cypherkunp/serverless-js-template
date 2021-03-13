const { success, error, fail } = require('jsend');
const log = require('./logger');

function getSuccessResponse(statusCode, responseData, headers) {
  const successResponse = success(responseData);
  log.debug(successResponse);

  const lambdaResponse = {
    statusCode: statusCode,
    body: JSON.stringify(successResponse),
    headers: headers,
  };

  return lambdaResponse;
}

function getFailResponse(statusCode, failData, headers) {
  const failResponse = fail(failData);
  log.debug(failResponse);

  const lambdaResponse = {
    statusCode: statusCode,
    body: JSON.stringify(failResponse),
    headers: headers,
  };
  return lambdaResponse;
}

function getErrorResponse(statusCode, errorData, headers) {
  const errorResponse = error(errorData);
  log.debug(errorResponse);

  const lambdaResponse = {
    statusCode: statusCode,
    body: JSON.stringify(errorResponse),
    headers: headers,
  };

  return lambdaResponse;
}

module.exports = {
  getSuccessResponse,
  getErrorResponse,
  getFailResponse,
};
