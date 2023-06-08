import React from 'react';
import { shallow } from 'enzyme';
import IconButton from 'dw/__mocks__/@material-ui/IconButton';

import Tooltip from 'dw/__mocks__/@material-ui/Tooltip';
import { SearchComponent as CommonSearch } from '../index';

describe('Search', () => {
  it('renders default search component', () => {
    const props = {
      onSearch: jest.fn(),
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('accepts string as initial value and displays clear button', () => {
    const props = {
      onSearch: jest.fn(),
      initialValue: 'test',
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('accepts object as initial value and displays clear button', () => {
    const props = {
      onSearch: jest.fn(),
      initialValue: { default: true, q: 'test' },
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('changes CommonSearch value on search input change', () => {
    const props = {
      onSearch: jest.fn(),
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    wrapper
      .find('Search')
      .props()
      .onChange({ target: { value: 'test' } });
    expect(wrapper.state().value).toBe('test');
  });

  it('calls onSearch callback', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    wrapper.find('Search').props().onSearch('john');
    expect(onSearch).toBeCalledWith({ default: true, q: 'john' });
  });

  it('clears search', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
      initialValue: { default: true, q: 'test' },
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    const clearButtonWrapper = shallow(
      wrapper.find('Search').props().suffix
    ).find(IconButton);
    clearButtonWrapper.props().onClick();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(onSearch).toBeCalledWith({ default: true, q: '' });
  });

  it('opens advanced search section', () => {
    const props = {
      onSearch: jest.fn(),
      defaultSearchField: { type: 'number', key: 'logId' },
      advancedSearchFields: [{ type: 'string', key: 'userName' }],
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    const dvancedSearchButtonWrapper = shallow(
      wrapper.find('Search').props().suffix
    ).find(IconButton);
    dvancedSearchButtonWrapper.props().onClick();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it.skip('sets default search value as advanced values and back on advanced open / close', () => {
    const props = {
      onSearch: jest.fn(),
      defaultSearchField: { type: 'number', key: 'logId' },
      advancedSearchFields: [{ type: 'string', key: 'userName' }],
      initialValue: 12345,
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    const dvancedSearchButtonWrapper = shallow(
      wrapper.find('Search').props().suffix
    )
      .find(Tooltip)
      .find('[title="Advanced Search"]')
      .find(IconButton);
    dvancedSearchButtonWrapper.props().onClick();
    wrapper.update();

    expect(wrapper.find('Search').props().value).toBe('');
    const advancedSearchWrapper = wrapper.find('AdvancedSearch');
    expect(advancedSearchWrapper.props().values).toEqual({
      logId: 12345,
    });

    advancedSearchWrapper.props().close();
    wrapper.update();

    expect(wrapper.find('Search').props().value).toBe(12345);
    expect(wrapper.find('AdvancedSearch').props().values).toEqual({});
  });

  it('disables default search when advanced is open', () => {
    const props = {
      onSearch: jest.fn(),
      defaultSearchField: { type: 'number', key: 'logId' },
      advancedSearchFields: [{ type: 'string', key: 'userName' }],
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    const dvancedSearchButtonWrapper = shallow(
      wrapper.find('Search').props().suffix
    ).find(IconButton);
    dvancedSearchButtonWrapper.props().onClick();
    wrapper.update();

    expect(wrapper.find('Search').props().disabled).toBe(true);
  });

  it('disables default search when advanced is active', () => {
    const props = {
      onSearch: jest.fn(),
      defaultSearchField: { type: 'number', key: 'logId' },
      advancedSearchFields: [{ type: 'string', key: 'userName' }],
      initialValue: { default: false, values: { logId: 12345 } },
    };

    const wrapper = shallow(<CommonSearch {...props} />);

    expect(wrapper.find('Search').props().disabled).toBe(true);
  });

  it('allows to update value externally only once', () => {
    const props = {
      onSearch: jest.fn(),
      initialValue: '',
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    wrapper.setProps({ initialValue: 'John' });
    wrapper.update();

    expect(wrapper.find('Search').props().value).toBe('John');

    wrapper.setProps({ initialValue: 'Garry' });
    wrapper.update();

    expect(wrapper.find('Search').props().value).toBe('John');
  });

  it('does not allow to update value externally if it was already changed through component', () => {
    const props = {
      onSearch: jest.fn(),
      initialValue: '',
    };

    const wrapper = shallow(<CommonSearch {...props} />);
    wrapper
      .find('Search')
      .props()
      .onChange({ target: { value: 'Garry' } });

    wrapper.setProps({ initialValue: 'John' });
    wrapper.update();

    expect(wrapper.find('Search').props().value).toBe('Garry');
  });

  it('validates default input if its type is number', () => {
    const onSearch = jest.fn();
    const props = {
      onSearch,
      defaultSearchField: { type: 'number', key: 'id' },
    };

    const wrapper = shallow(<CommonSearch {...props} />);

    wrapper.find('Search').props().onSearch('John');
    wrapper.update();

    expect(onSearch).not.toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
