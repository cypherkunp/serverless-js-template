const commonAccessControlAllowHeaders = [
  'Content-Type',
  'Content-Encoding',
  'X-Amz-Date',
  'Authorization',
  'X-Api-Key',
  'X-Auth-Token',
  'X-Amz-Security-Token',
  'X-Amz-User-Agent',
  'Access-Control-Request-Method',
  'Access-Control-Request-Headers',
];

function getCapHeaderValue(header) {
  return header
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
}

function getSmlHeaderValue(header) {
  return header
    .split('-')
    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
    .join('-');
}

function getHeaderValue(headers, header) {
  const capHeader = getCapHeaderValue(header);
  const smlHeader = getSmlHeaderValue(header);
  let headerValue = null;

  if (headers[capHeader]) {
    headerValue = headers[capHeader];
  } else if (headers[smlHeader]) {
    headerValue = headers[smlHeader];
  }

  return headerValue;
}

function getCorsHeaders(requestHeaders, allowMethods, allowHeaders = []) {
  return {
    'access-control-allow-headers': [commonAccessControlAllowHeaders, ...allowHeaders].join(','),
    'access-control-allow-origin': getHeaderValue(requestHeaders, 'origin') || '*',
    'access-control-allow-methods': allowMethods.join(','),
  };
}

module.exports = { getCorsHeaders };
