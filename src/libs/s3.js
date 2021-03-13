const AWS = require('aws-sdk');
const log = require('./logger');

const s3 = new AWS.S3();

function getDataLakeFolderStructure(meta) {
  const { division, brand, locale, type } = meta;

  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${
    config.ML_S3_BUCKET_NAME
  }/${division.toLowerCase()}/${brand.toLowerCase()}/${locale
    .toLowerCase()
    .split('-')
    .join('/')}/profiler/${type.toLowerCase()}/${year}/${month}/${day}`;
}

function getTimestampFileName() {
  return `${Date.now()}.json`;
}

async function saveRequestAndResponse(meta, requestObject, responseObject) {
  if (!config.ML_S3_BUCKET_NAME) return null;

  try {
    const folderStructure = getDataLakeFolderStructure(meta);
    const fileName = getTimestampFileName();
    log.debug('[s3.saveResponse.folderStructure]: ', folderStructure);
    log.debug('[s3.saveResponse.fileName]: ', fileName);
    const requestResponseObject = { request: requestObject, response: responseObject };

    await s3
      .putObject({
        Bucket: folderStructure,
        Key: fileName,
        Body: JSON.stringify(requestResponseObject),
        ContentType: 'application/json; charset=utf-8',
      })
      .promise();
    return true;
  } catch (error) {
    log.error('[s3.saveResponse.error]: ', error);
    return false;
  }
}

module.exports = { saveRequestAndResponse };
