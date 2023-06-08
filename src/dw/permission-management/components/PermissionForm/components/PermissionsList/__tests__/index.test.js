import React from 'react';
import { shallow } from 'enzyme';

import PermissionsList from '../index';

describe('Permissions List component', () => {
  const props = {
    contentType: {
      id: 1,
      model: 'contentType1',
      details: [{ id: 2, str: 'detail1' }],
      permissions: [{ id: 1, name: 'perm1' }],
    },
    fields: { map: jest.fn() },
    onMove: jest.fn(),
  };

  const root = shallow(<PermissionsList {...props} />);

  it('renders the container of the permissions list', () => {
    expect(root.find('Paper')).toMatchSnapshot();
  });
});
