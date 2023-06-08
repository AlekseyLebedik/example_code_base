import fromEntries from 'object.fromentries';

/**
 * For IE and NodeJS (< v12) support (used as test runner)
 * See also:
 * -  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
 */
if (!Object.fromEntries) {
  fromEntries.shim();
}
