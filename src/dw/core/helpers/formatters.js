export function formatFileSize(value) {
  let numberBytes;
  if (Number.isNaN(value)) {
    numberBytes = 0;
  } else {
    numberBytes = parseInt(value, 10);
  }
  if (numberBytes > 1000000) {
    return `${Math.round((100 * numberBytes) / 1000000) / 100} MB`;
  }
  if (numberBytes > 1000) {
    return `${Math.round((100 * numberBytes) / 1000) / 100} KB`;
  }
  return `${numberBytes} bytes`;
}

export function formatBool(value) {
  return value ? 'Yes' : 'No';
}
export function formatBoolAgGrid(value) {
  return value === true ? 'Yes' : 'No';
}

export function valueOrNotAvailable(value, alt) {
  if (value) return value;
  return alt || 'n/a';
}
