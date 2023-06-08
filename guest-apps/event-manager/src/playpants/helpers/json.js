const TAB_SIZE = 2;

/**
 * Check if str can be parsed to JSON or not
 * @param {string} str - Any string you want to test
 * @returns {bool} whether or not the string is valid JSON
 */
export const isJSON = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const parseJSON = str => (isJSON(str) ? JSON.parse(str) : str);

export const prettyPrint = value =>
  JSON.stringify(parseJSON(value), null, TAB_SIZE);
