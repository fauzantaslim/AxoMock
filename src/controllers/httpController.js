/**
 * HTTP status controller.
 * Returns responses with requested HTTP status codes for testing.
 */

const STATUS_CODES = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  301: 'Moved Permanently',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

/**
 * GET /api/http/:statusCode
 */
function getStatus(req, res) {
  const code = parseInt(req.params.statusCode);
  const description = STATUS_CODES[code];

  if (!description) {
    return res.status(400).json({
      message: `Unsupported status code: ${req.params.statusCode}. Supported codes: ${Object.keys(STATUS_CODES).join(', ')}`,
    });
  }

  // 204 has no body
  if (code === 204) {
    return res.status(204).end();
  }

  res.status(code).json({
    status: code,
    message: description,
  });
}

export { getStatus };
