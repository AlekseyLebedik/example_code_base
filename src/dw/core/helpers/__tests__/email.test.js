import { VERSION } from 'dw/config';
import { getViewportSize, getInfo } from '../email';

describe('helpers/email', () => {
  it('validates getViewportSize', () => {
    global.innerWidth = 1024;
    global.innerHeight = 768;

    expect(getViewportSize()).toBe('1024x768');
  });

  it('validates getInfo', () => {
    global.innerWidth = 1024;
    global.innerHeight = 768;

    // eslint-disable-next-line
    global.navigator.__defineGetter__(
      'userAgent',
      () =>
        'Node.js (darwin; U; rv:v8.6.0) AppleWebKit/537.36 (KHTML, like Gecko)'
    );
    const BEVersion = 'blah';

    const expected = `
  Devzone Frontend: v. ${VERSION}
  Devzone Backend: v. ${BEVersion}
  Browser Name: WebKit
  Browser Major: 537
  Browser Version: 537.36
  OS Name: undefined
  OS Version: undefined
  Device Type: N/A
  Device Vendor: N/A
  Device Model: N/A
  Viewport Size: 1024x768
  `;

    expect(getInfo(BEVersion)).toEqual(expected);
  });
});
