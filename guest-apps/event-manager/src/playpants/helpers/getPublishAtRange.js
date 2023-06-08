const getPublishAtRange = ({ startRange, endRange }) => {
  if (startRange && endRange) return `${startRange},${endRange}`;
  return null;
};

export default getPublishAtRange;
