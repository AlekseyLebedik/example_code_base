export const MAX_UINT_16_BIT = 65535;
export const MAX_UINT_64_BIT = 18446744073709551615;

export const MAX_INTEGERS = {
  MAX_UINT_16_BIT,
  MAX_UINT_64_BIT,
};

// Nginx proxy-body-size limit set @ 1024MB in devzone-deploy/config
// i1.kube.demonware.net/devzone-qa/values.yaml & s1.kube.demonware.net/devzone/values.yaml
const BYTE_TO_MB = 1000000;
export const MAX_UPLOAD_MB_SIZE = 1000;
export const MAX_UPLOAD_BYTES = BYTE_TO_MB * MAX_UPLOAD_MB_SIZE;
