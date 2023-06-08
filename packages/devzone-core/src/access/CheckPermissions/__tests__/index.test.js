import axios from '../../../axios';
import { fetchPermissions } from '../index';

jest.mock('../../../axios');

describe('fetchPermissions function', () => {
  const PREDICATES = ['test', 'test2'];
  const OBJECTS = ['test', 'test2'];
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { permission: true } });
  });

  it('does not accept many to many permission checks', () => {
    const ERR = Error(
      'Checking multiple predicates against multiple objects is not supported'
    );
    expect(() => fetchPermissions(PREDICATES, OBJECTS)).toThrow(ERR);
  });

  it('calls axios with the correct arguments', () => {
    const multipleObjectsUrl = `${process.env.REACT_APP_API_HOST}/api/v2/users/self/check-permissions/?predicates=test&objects=test&objects=test2`;
    fetchPermissions(PREDICATES[0], OBJECTS);
    expect(axios.get).toHaveBeenCalledWith(multipleObjectsUrl);

    const multiplePredicatesUrl = `${process.env.REACT_APP_API_HOST}/api/v2/users/self/check-permissions/?predicates=test&predicates=test2&objects=test`;
    fetchPermissions(PREDICATES, OBJECTS[0]);
    expect(axios.get).toHaveBeenCalledWith(multiplePredicatesUrl);
  });

  describe('memoize', () => {
    it('not call axios when permission data is memoized', () => {
      const multipleObjectsUrl = `${process.env.REACT_APP_API_HOST}/api/v2/users/self/check-permissions/?predicates=test&objects=test&objects=test2`;
      fetchPermissions(PREDICATES[0], OBJECTS);
      expect(axios.get).toHaveBeenCalledWith(multipleObjectsUrl);

      // stored in cache
      fetchPermissions(PREDICATES[0], OBJECTS);
      expect(axios.get).toHaveBeenCalledTimes(2);
    });

    it('calls axios when permission data is not memoized', () => {
      // not stored in cache
      fetchPermissions(PREDICATES[0], OBJECTS[0]);
      expect(axios.get).toHaveBeenCalledTimes(3);
    });
  });
});
