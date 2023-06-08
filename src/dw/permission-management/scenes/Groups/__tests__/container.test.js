import React from 'react';
import { shallow } from 'enzyme';

import { PermissionGroups } from '../container';

describe('Groups - container', () => {
  const props = {
    deleteGroup: jest.fn(),
    fetchGroups: jest.fn(),
    fetchContentTypes: jest.fn(),
    getCompanies: jest.fn(),
    baseUrl: '/testurl',
    isPristine: true,
    selectedItem: null,
    isStaff: true,
  };

  const root = shallow(<PermissionGroups {...props} />);

  it('componentDidMount, should call fetchs on componentDidMount', () => {
    const instance = root.instance();
    const spy = jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
    expect(instance.props.fetchGroups).toBeCalled();
    expect(instance.props.fetchContentTypes).toBeCalled();
    expect(instance.props.getCompanies).toBeCalled();
  });
});
