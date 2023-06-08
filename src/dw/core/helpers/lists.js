export function transformObjectToList(object = {}) {
  return Object.entries(object).map(([key, value]) => ({
    key,
    value,
  }));
}

export function transformKeyValueListToObject(list = []) {
  return Object.assign({}, ...list.map(({ key, value }) => ({ [key]: value })));
}
