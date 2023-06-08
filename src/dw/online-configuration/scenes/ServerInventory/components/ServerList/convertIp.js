function num2dot(int) {
  const part1 = int & 255;
  const part2 = (int >> 8) & 255;
  const part3 = (int >> 16) & 255;
  const part4 = (int >> 24) & 255;

  return `${part4}.${part3}.${part2}.${part1}`;
}

export const convertIp = userId => {
  const id = Number(userId);
  // convert to binary
  const binValue = id.toString(2).split('');
  // remove the first 16 bits
  binValue.splice(0, 16);
  // get the next 32 bits and convert to string
  const data = binValue.slice(0, 32).join('');
  // convert string to digit
  const digit = parseInt(data, 2).toString(10);
  // convert digit to dot notation
  return num2dot(digit);
};
