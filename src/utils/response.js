/**
 * Response formatting helpers.
 * Ensures consistent API response shapes across all resources.
 */

/**
 * Build a paginated list response.
 * Format: { [resourceName]: [...], total, skip, limit }
 */
function listResponse(resourceName, data, total, skip, limit) {
  return {
    [resourceName]: data,
    total,
    skip,
    limit,
  };
}

/**
 * Build an error response.
 * Format: { message: "..." }
 */
function errorResponse(message) {
  return { message };
}

export { listResponse, errorResponse };
