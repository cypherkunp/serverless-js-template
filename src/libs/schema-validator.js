const log = require('./logger');

function validateSchema(joiSchema, requestBody) {
  const { error } = joiSchema.validate(requestBody, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const validationDetails = error.details
      .map(({ message, context }) => ({
        [context.label]: message.replace(/['"]/g, ''),
      }))
      .reduce((r, c) => Object.assign(r, c), {});

    log.debug({ validationDetails });
    return validationDetails;
  } else return null;
}

function validateQueryParams(requestQueryParams, requiredQueryParams) {
  const validationErrors = {};
  requestQueryParams = requestQueryParams || {};
  requiredQueryParams.forEach(queryParam => {
    if (!requestQueryParams[queryParam]) {
      validationErrors[queryParam] = `${queryParam} is required`;
    }
  });

  if (Object.keys(validationErrors).length === 0) {
    return null;
  } else {
    log.debug('[request-validator.validateQueryParams.validationErrors] ', validationErrors);
    return validationErrors;
  }
}

export { validateQueryParams, validateSchema };
