import * as actions from '../actions';

import { CONTENT_TYPES_PREFIX, OBJECT_PERMISSIONS_PREFIX } from '../constants';

describe('Companies - actions', () => {
  it('fetchContentTypes returns CONTENT_TYPES_PREFIX action', () => {
    expect(actions.fetchContentTypes()).toEqual({
      type: `${CONTENT_TYPES_PREFIX}_FETCH`,
      append: false,
    });
  });

  it('fetchObjectPermissions returns OBJECT_PERMISSIONS_FETCH action', () => {
    const id = 1;
    expect(actions.fetchObjectPermissions(id)).toEqual({
      type: `${OBJECT_PERMISSIONS_PREFIX}_FETCH`,
      id,
      append: false,
    });
  });

  it('editObjecetPermissions returns OBJECT_PERMISSIONS_PUT action', () => {
    const id = 1;
    const data = 'test';
    expect(actions.editObjectPermissions(id, data)).toEqual({
      type: `${OBJECT_PERMISSIONS_PREFIX}_PUT`,
      id,
      data,
    });
  });
});
