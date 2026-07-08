/**
 * Pagination utility.
 * Slices an array based on limit/skip and returns paginated result with metadata.
 */

function paginate(array, { limit = 10, skip = 0 } = {}) {
  limit = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
  skip = Math.max(parseInt(skip) || 0, 0);

  const total = array.length;
  const data = array.slice(skip, skip + limit);

  return { data, total, skip, limit };
}

export { paginate };
