import React from 'react';
import { shallow } from 'enzyme';

import { Companies } from '../container';

describe('Companies - Container', () => {
  const props = {
    fetchContentTypes: jest.fn(),
    fetchCompanies: jest.fn(),
    onSearch: jest.fn(),
    baseUrl: '/testurl',
    isPristine: true,
    selectedItem: null,
    isStaff: true,
    match: { params: { id: 1 }, path: '' },
    history: { push: jest.fn() },
    location: { pathname: '' },
  };

  const root = shallow(<Companies {...props} />);
  it('componentDidMount - Should call fetchContentTypes and fetchCompanies', () => {
    const instance = root.instance();
    const spy = jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
    expect(instance.props.fetchCompanies).toBeCalled();
    expect(instance.props.fetchContentTypes).toBeCalled();
  });
});
