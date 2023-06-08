import UaParser from 'ua-parser-js';
import queryString from 'query-string';

import { VERSION, SUPPORT_EMAIL } from 'dw/config';

export const getViewportSize = () => {
  const x =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const y =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return `${x}x${y}`;
};

export const getInfo = (BEVersion = '') => {
  const parser = new UaParser(navigator.userAgent);
  const ua = parser.getResult();
  const info = `
  Devzone Frontend: v. ${VERSION}
  Devzone Backend: v. ${BEVersion}
  Browser Name: ${ua.browser.name}
  Browser Major: ${ua.browser.major}
  Browser Version: ${ua.browser.version}
  OS Name: ${ua.os.name}
  OS Version: ${ua.os.version}
  Device Type: ${ua.device.type || 'N/A'}
  Device Vendor: ${ua.device.vendor || 'N/A'}
  Device Model: ${ua.device.model || 'N/A'}
  Viewport Size: ${getViewportSize()}
  `;

  return info;
};

export const getMailto = (subject, body, address) => {
  const qs = queryString.stringify({
    subject,
    body: `${body || ''}

Additional information:
=======================
${getInfo()}
    `,
  });

  return `mailto:${address || SUPPORT_EMAIL}?${qs}`;
};
