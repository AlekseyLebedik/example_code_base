export const normalizeSwitches = array =>
  Array.isArray(array)
    ? array.reduce(
        (map, item) => ({
          ...map,
          [item.name]: item.active,
        }),
        {}
      )
    : array;
