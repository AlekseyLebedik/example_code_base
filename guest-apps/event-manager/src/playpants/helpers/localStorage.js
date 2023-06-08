/**
 * Returns the parsed item of the given name and project from the local storage
 *
 * If none is found with that name and project, it returns an empty object
 * @param {*} project - the current project id
 * @param {*} name    - the key name of the item in local storage
 */
export function getLocalStorageHistory(project, name) {
  const historyStr = localStorage.getItem(`${name}_${project}`);
  let history = {};
  if (historyStr) {
    history = JSON.parse(historyStr);
  }
  return history;
}

/**
 * Adds in or updates the matched name project local storage item with the given key value pairing
 * @param {*} project - the current project id
 * @param {*} name    - the key name of the item in the local storage
 * @param {*} key     - the key in the retrieved local storage object to add or update
 * @param {*} value   - the value of the given key
 */
export function setLocalStorageHistory(project, name, key, value) {
  const history = getLocalStorageHistory(project, name);
  history[key] = value;
  localStorage.setItem(`${name}_${project}`, JSON.stringify(history));
}
