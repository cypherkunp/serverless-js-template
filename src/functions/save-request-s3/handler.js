const log = require('../../libs/logger');
const { validateSchema } = require('../../libs/schema-validator');
const { getSuccessResponse, getFailResponse, getErrorResponse } = require('../../libs/api-gateway');
const { getCorsHeaders } = require('../../libs/header');
const s3Bucket = require('../../libs/s3');
const schema = require('./schema');

module.exports.main = async event => {
  log.info('[handler.aibaConfigSave.event.header]: ', event.headers);
  log.info('[handler.aibaConfigSave.event.body]: ', event.body);

  const responseHeaders = getCorsHeaders(event.headers, ['POST', 'OPTIONS']);
  const validationErrors = validateSchema(schema, event.body);

  if (validationErrors) {
    return getFailResponse(400, validationErrors, responseHeaders);
  }

  try {
    const saveJsonToS3Response = await s3Bucket.saveRequestAndResponse(
      event.body.data,
      s3OptionsData
    );
    log.info('[handler.aibaConfigSave.saveJsonToS3Response]: ', saveJsonToS3Response);
    return getSuccessResponse(200, saveJsonToS3Response, responseHeaders);
  } catch (error) {
    log.error(error.data);
    const errorMessage = (error && error.data && error.data.message) || null;
    const errorData = error && error.data;
    return getErrorResponse(500, { message: errorMessage, data: errorData }, responseHeaders);
  }
};
