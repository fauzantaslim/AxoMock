/**
 * Filter, sort, and field selection utilities.
 */

/**
 * Filter array items by exact match on top-level fields.
 * Handles boolean strings ('true'/'false') and numeric strings.
 */
function filterByFields(array, queryParams, allowedFields) {
  let result = [...array];

  for (const field of allowedFields) {
    if (queryParams[field] !== undefined) {
      const filterValue = queryParams[field];

      result = result.filter(item => {
        const itemValue = item[field];
        if (itemValue === undefined) return false;

        // Handle boolean comparisons
        if (typeof itemValue === 'boolean') {
          return itemValue === (filterValue === 'true');
        }

        // Handle numeric comparisons
        if (typeof itemValue === 'number') {
          return itemValue === Number(filterValue);
        }

        // String comparison (case-insensitive)
        return String(itemValue).toLowerCase() === String(filterValue).toLowerCase();
      });
    }
  }

  return result;
}

/**
 * Sort array by a top-level field.
 * @param {string} order - 'asc' or 'desc'
 */
function sortByField(array, sortBy, order = 'asc') {
  if (!sortBy) return array;

  const sorted = [...array].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    // Handle undefined values — push to end
    if (valA === undefined) return 1;
    if (valB === undefined) return -1;

    // Numeric comparison
    if (typeof valA === 'number' && typeof valB === 'number') {
      return order === 'desc' ? valB - valA : valA - valB;
    }

    // String comparison
    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();

    if (strA < strB) return order === 'desc' ? 1 : -1;
    if (strA > strB) return order === 'desc' ? -1 : 1;
    return 0;
  });

  return sorted;
}

/**
 * Select only specified fields from each item.
 * @param {string} selectString - Comma-separated field names (e.g., 'id,firstName,email')
 */
function selectFields(array, selectString) {
  if (!selectString) return array;

  const fields = selectString
    .split(',')
    .map(f => f.trim())
    .filter(Boolean);
  if (fields.length === 0) return array;

  return array.map(item => {
    const selected = {};
    for (const field of fields) {
      if (item[field] !== undefined) {
        selected[field] = item[field];
      }
    }
    return selected;
  });
}

export { filterByFields, sortByField, selectFields };
