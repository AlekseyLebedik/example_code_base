import mockState from 'playpants/testUtils/mockState';
import { filestorageProps as props } from 'playpants/testUtils/eventProps';
import * as selectors from '../selectors';

describe('File Storage selectors', () => {
  describe('filesSelector', () => {
    it('select all uploaded files', () => {
      const testSelectedFiles = selectors.filesSelector(mockState);
      expect(testSelectedFiles).toEqual(props.files);
    });
  });

  describe('contextsDataSelector', () => {
    it('select all contexts', () => {
      const testContextSelector = selectors.contextsDataSelector(mockState);
      expect(testContextSelector).toEqual(props.contextsData);
    });
  });

  describe('uploadProgressSelector', () => {
    it('select upload progress object', () => {
      const testUploadProgressSelector =
        selectors.uploadProgressSelector(mockState);
      expect(testUploadProgressSelector).toEqual(props.uploadProgress);
    });
  });
});
