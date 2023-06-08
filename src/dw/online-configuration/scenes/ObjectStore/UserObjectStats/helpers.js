export const extractNumFromString = string => {
  // extract userId from the platform-userId string
  const numberPattern = /\d+/g;
  return string.match(numberPattern).join('');
};
