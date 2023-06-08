export function normalizeObjects(objects) {
  return objects.reduce((map, data) => {
    const fileName = data.name || data.metadata.name;
    return {
      ...map,
      [fileName]: data,
    };
  }, {});
}

export function filterObject(obj, callback) {
  return Object.entries(obj).reduce(
    (map, [key, value]) => ({
      ...map,
      [key]: callback(value) ? value : undefined,
    }),
    {}
  );
}

export function sortDeletedObjects(results) {
  const { deletedObjects, notDeletedObjects } = Object.entries(results).reduce(
    (output, [name, deleted]) => {
      if (deleted) output.deletedObjects.push(name);
      else output.notDeletedObjects.push(name);
      return output;
    },
    { deletedObjects: [], notDeletedObjects: [] }
  );
  return { deletedObjects, notDeletedObjects };
}
