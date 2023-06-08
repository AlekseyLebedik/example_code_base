import React from 'react';
import { shallow } from 'enzyme';

import { Users } from '../container';
import { GROUP_TAB, ADVANCED_TAB } from '../constants';

describe('Users - container', () => {
  const props = {
    onLoad: jest.fn(),
    onShowMore: jest.fn(),
    onSearch: jest.fn(),
    match: { params: { id: 1 } },
    fetchAvailableGroups: jest.fn(),
    history: {},
    location: {},
    isStaff: false,
  };

  const root = shallow(<Users {...props} />);

  it('componentDidMount, should call onLoad', () => {
    const instance = root.instance();
    const spy = jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
    expect(instance.props.onLoad).toBeCalled();
  });

  it('onTabChange should update selected tab', () => {
    const instance = root.instance();
    expect(instance.state.selectedTab).toBe(GROUP_TAB);
    instance.onTabChange({}, ADVANCED_TAB);
    expect(instance.state.selectedTab).toBe(ADVANCED_TAB);
  });
});
