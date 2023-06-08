import { encode, decode } from '../base64';

describe('helpers/base64', () => {
  it('validates encode', () => {
    expect(encode('Blah blah!!!')).toBe('QmxhaCBibGFoISEh');
  });

  it('validates decode', () => {
    expect(decode('QmxhaCBibGFoISEh')).toBe('Blah blah!!!');
  });
});
