export const userIdSelector = value => {
  if (!value) return null;
  const [userName, userID] = value.split(' | ');
  return userID === undefined ? userName : userID;
};
