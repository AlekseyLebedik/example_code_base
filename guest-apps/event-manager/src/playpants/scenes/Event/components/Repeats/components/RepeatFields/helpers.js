/**
 * Parse the repeat data, modify the specified property,
 * and stringify
 * @param {*} repeatData
 * @param {*} key
 * @param {*} newValue
 */
export const modifyRepeatEventSettings = (repeatData, key, newValue) => ({
  ...repeatData,
  [key]:
    key === 'begin_repeat_at' || key === 'end_repeat_at'
      ? newValue.unix()
      : newValue,
});
