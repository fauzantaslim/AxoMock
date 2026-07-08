/**
 * Search utility.
 * Performs case-insensitive partial string matching across specified fields.
 */

function search(array, query, fields) {
  if (!query || !fields || fields.length === 0) return array;

  const lowerQuery = query.toLowerCase();

  return array.filter(item => {
    return fields.some(field => {
      const value = getNestedValue(item, field);
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerQuery);
    });
  });
}

/**
 * Get a nested value from an object using dot notation.
 * e.g., getNestedValue({ address: { city: 'Austin' } }, 'address.city') → 'Austin'
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

export { search };
