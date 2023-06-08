export const keyGenerator = defaultOption =>
  defaultOption
    ? `${defaultOption.label}-${defaultOption.value}-selected`
    : 'unselected';

export const getDefaultOption = (options, value, defaultValue) =>
  options
    .reduce((acc, cur) => acc.concat(cur.options), [])
    .find(option =>
      value ? value === option.value : option.value === defaultValue
    );
