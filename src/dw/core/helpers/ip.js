const ipv4regex =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; // taken from http://stackoverflow.com/questions/23483855/javascript-regex-to-validate-ipv4-and-ipv6-address-no-hostnames

export const toInt = ip => {
  let ipInt = 0;
  ip.split('.').forEach(octet => {
    ipInt <<= 8;
    ipInt += parseInt(octet, 10);
  });
  return ipInt >>> 0;
};

export const isValid = ip => ipv4regex.test(ip);

export const ntoa = num => {
  const buf = Buffer.alloc(4);
  buf.writeUInt32BE(num, 0);

  const a = [];
  for (let i = 0; i < 4; i += 1) {
    a[i] = buf.readUInt8(i);
  }

  return a.join('.');
};
