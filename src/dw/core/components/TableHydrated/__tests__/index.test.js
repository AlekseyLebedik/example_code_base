import React from 'react';
import { shallow } from 'enzyme';

import TableHydrated from '../index';

describe('TableHydrated', () => {
  const props = {
    formatDateTime: jest.fn(),
    data: [
      {
        rating: 16777,
        id: '1198874410363381809',
        name: 'HostUser',
      },
      {
        rating: 13363,
        id: '1133417151930087413',
        name: 'AnonymousHostUser',
      },
    ],
    columns: [
      {
        title: 'Entity ID',
        dataIndex: 'id',
        key: 'id',
        width: '25%',
      },
      {
        title: 'Entity Name',
        dataIndex: 'name',
        key: 'name',
        width: '35%',
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        width: '15%',
      },
    ],
    setSelectedRowKeys: jest.fn(),
  };

  it('renders default values', () => {
    const props = {
      formatDateTime: jest.fn(),
      data: [],
      columns: [],
      setSelectedRowKeys: jest.fn(),
    };

    expect(
      shallow(<TableHydrated.WrappedComponent {...props} />)
    ).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const newProps = {
      ...props,
      className: 'table-class',
      getKey: k => k.id,
      size: 'big',
      actions: [
        {
          iconName: 'icon',
          label: 'Blah',
          handler: jest.fn(),
        },
      ],
      hideActions: false,
    };

    expect(
      shallow(<TableHydrated.WrappedComponent {...newProps} />)
    ).toMatchSnapshot();
  });

  it('validates onInputChange', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onInputChange({ target: { value: 'blah' } }, 'id');

    expect(wrapper.state('searchText')).toContainEqual({
      key: 'id',
      text: 'blah',
    });
  });

  it('validates addFilter', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    const expected = { id: 'blah' };

    expect(wrapper.instance().addFilter('id', 'blah')).toEqual(expected);
    expect(wrapper.state('filterText')).toEqual(expected);
  });

  it('validates addFilter from search', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onInputChange({ target: { value: 'blah' } }, 'id');
    const expected = { id: 'blah' };

    expect(wrapper.instance().addFilter('id', undefined)).toEqual(expected);
    expect(wrapper.state('filterText')).toEqual(expected);
  });

  it('validates removeFilter', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().addFilter('id', 'blah');
    wrapper.instance().onInputChange({ target: { value: 'blah' } }, 'name');
    wrapper.instance().addFilter('name', undefined);

    expect(wrapper.instance().removeFilter('id')).toEqual({ name: 'blah' });
    expect(wrapper.state('searchText')).toContainEqual({
      key: 'name',
      text: 'blah',
    });
  });

  it('validates onSearch', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onInputChange({ target: { value: 'blah' } }, 'name');
    wrapper.instance().onSearch('name', undefined);

    expect(wrapper.state('filterText')).toEqual({ name: 'blah' });
    expect(wrapper.state('filtered')).toContainEqual({
      key: 'name',
      filtered: true,
    });
    expect(wrapper.state('searchText')).toContainEqual({
      key: 'name',
      text: 'blah',
    });
  });

  it('validates onSearch data', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onSearch('rating', 13363);

    expect(wrapper.state('data').length).toBe(1);
    expect(wrapper.state('data')).toEqual([
      { rating: 13363, id: '1133417151930087413', name: 'AnonymousHostUser' },
    ]);
  });

  it('validates Enter key pressed', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onInputChange({ target: { value: 'blah' } }, 'name');
    wrapper.instance().onKeyPress({ charCode: 13 }, 'name');

    expect(wrapper.state('filterText')).toEqual({ name: 'blah' });
    expect(wrapper.state('filtered')).toContainEqual({
      key: 'name',
      filtered: true,
    });
    expect(wrapper.state('searchText')).toContainEqual({
      key: 'name',
      text: 'blah',
    });
  });

  it('validates onClearFilter', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onInputChange({ target: { value: 'blah' } }, 'name');
    wrapper.instance().onSearch('name', undefined);

    expect(wrapper.state('filtered')).toContainEqual({
      key: 'name',
      filtered: true,
    });
    expect(wrapper.state('filterText')).toEqual({ name: 'blah' });

    wrapper.instance().onClearFilter('name');

    expect(wrapper.state('filtered')).toContainEqual({
      key: 'name',
      filtered: false,
    });
    expect(wrapper.state('filterText')).toEqual({});
  });

  it('validates getSorter', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    const column = {
      title: 'Entity Name',
      key: 'name',
    };
    const sorter = wrapper.instance().getSorter(column);

    expect(sorter({ name: 'a' }, { name: 'b' })).toBe(-1);
    expect(sorter({ name: 'b' }, { name: 'a' })).toBe(1);
    expect(sorter({ name: 'a' }, { name: 'a' })).toBe(0);
  });

  it('validates getSorter number', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    const column = {
      title: 'Rating',
      key: 'rating',
      type: 'number',
    };
    const sorter = wrapper.instance().getSorter(column);

    expect(sorter({ rating: 6 }, { rating: 2 })).toBe(4);
  });

  it('validates sorting disabled', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    const column = {
      title: 'Entity ID',
      key: 'id',
      noSorting: true,
    };

    expect(wrapper.instance().getSorter(column)).toBe(false);
  });

  it('renders getFilterDropdown', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    const column = {
      title: 'Entity ID',
      key: 'id',
    };

    expect(wrapper.instance().getFilterDropdown(column)).toMatchSnapshot();
  });

  it('validates filtering disabled', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    const column = {
      title: 'Entity ID',
      key: 'id',
      noFiltering: true,
    };

    expect(wrapper.instance().getFilterDropdown(column)).toBe(false);
  });

  it('validates clearAll', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().clearAll();

    expect(wrapper.state('filterText')).toEqual({});
    expect(wrapper.state('sortedInfo')).toEqual({});
    expect(wrapper.state('data')).toEqual([...props.data]);
  });

  it('validates handleChange', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    const sorter = {
      column: { key: 'id', width: '28%' },
      columnKey: 'id',
      order: 'ascend',
    };
    wrapper.instance().handleChange(undefined, undefined, sorter);

    expect(wrapper.state('sortedInfo')).toEqual(sorter);
  });

  it('validates isClearAllButtonVisible', () => {
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);

    expect(wrapper.instance().isClearAllButtonVisible()).toBe(false);

    wrapper.instance().onSearch('name', 'blah');
    expect(wrapper.instance().isClearAllButtonVisible()).toBe(true);
  });

  it('validates noClearAllButton', () => {
    const newProps = {
      ...props,
      noClearAllButton: true,
    };
    const wrapper = shallow(<TableHydrated.WrappedComponent {...newProps} />);

    expect(wrapper.instance().isClearAllButtonVisible()).toBe(false);

    wrapper.instance().onSearch('name', 'blah');
    expect(wrapper.instance().isClearAllButtonVisible()).toBe(false);
  });

  it('validates onSelectRowChange', () => {
    const setSelectedRowKeys = jest.fn();
    const selectedRowKeys = [1, 2, 3];
    const props = {
      formatDateTime: jest.fn(),
      data: [],
      columns: [],
      setSelectedRowKeys,
    };
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onSelectRowChange(selectedRowKeys);

    expect(setSelectedRowKeys).toBeCalledWith(selectedRowKeys);
  });

  it('validates onResetSelectedRowKeys', () => {
    const setSelectedRowKeys = jest.fn();
    const props = {
      formatDateTime: jest.fn(),
      data: [],
      columns: [],
      setSelectedRowKeys,
    };
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onResetSelectedRowKeys();

    expect(setSelectedRowKeys).toBeCalledWith([]);
  });

  it('validates onExecuteHandlerAndCleanIfisNeeded', () => {
    const setSelectedRowKeys = jest.fn();
    const props = {
      formatDateTime: jest.fn(),
      data: [],
      columns: [],
      setSelectedRowKeys,
    };
    const actionHandler = jest.fn();
    const action = {
      handler: actionHandler,
      cleanAfterExecute: true,
    };
    const wrapper = shallow(<TableHydrated.WrappedComponent {...props} />);
    wrapper.instance().onExecuteHandlerAndCleanIfisNeeded(action);

    expect(actionHandler).toBeCalled();
    expect(setSelectedRowKeys).toBeCalledWith([]);
  });
});
