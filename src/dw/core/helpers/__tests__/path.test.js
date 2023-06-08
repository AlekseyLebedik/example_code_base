import { joinPath, joinQueryParam } from '../path';

describe('helpers/path', () => {
  describe('joinPath', () => {
    it('should remove trailing slash from base', () => {
      expect(joinPath('/base/', 'path')).toBe('/base/path');
    });
    it('should concat base and path with slash', () => {
      expect(joinPath('/base', 'path')).toBe('/base/path');
    });
    it('should concat base and few pathes with slash', () => {
      expect(joinPath('/base', 'path', 'to', 'component')).toBe(
        '/base/path/to/component'
      );
    });
    it('should keep querystring', () => {
      expect(joinPath('/base', 'path?q=search')).toBe('/base/path?q=search');
    });
  });

  describe('joinQueryParam', () => {
    it('should add first param', () => {
      expect(joinQueryParam('/base/', 'q', '12345')).toBe('/base/?q=12345');
    });
    it('should add second param', () => {
      expect(joinQueryParam('/base/?token=abcd', 'q', '12345')).toBe(
        '/base/?token=abcd&q=12345'
      );
    });
  });
});
