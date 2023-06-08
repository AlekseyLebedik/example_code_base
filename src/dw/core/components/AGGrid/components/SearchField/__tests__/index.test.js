import React from 'react';
import { shallow } from 'enzyme';

import SearchField from '..';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation() {
    return { pathname: '/home', search: 'query=some value' };
  },
  useHistory() {
    return { push: mockPush };
  },
}));

const mockGridApi = {
  setQuickFilter: jest.fn(),
};

describe('SeasrchField', () => {
  it('has search icon', () => {
    const wrapper = shallow(<SearchField gridApi={mockGridApi} />);
    expect(wrapper.props().InputProps.startAdornment).toMatchSnapshot();
  });
  it('renders clear button when has value', () => {
    const wrapper = shallow(
      <SearchField gridApi={mockGridApi} defaultValue="some value" />
    );
    expect(wrapper.props().InputProps.endAdornment).toMatchSnapshot();
  });
  it('uses query param', () => {
    const wrapper = shallow(
      <SearchField gridApi={mockGridApi} queryParamName="query" />
    );
    expect(wrapper.props().value).toEqual('some value');
  });
  it('changes query param', () => {
    const expected = 'new value';
    const wrapper = shallow(
      <SearchField gridApi={mockGridApi} queryParamName="query" />
    );
    wrapper.simulate('change', { target: { value: expected } });
    expect(mockPush).toBeCalledWith({
      pathname: '/home',
      search: `query=${escape(expected)}`,
    });
  });
});
