import React from 'react';
import { shallow } from 'enzyme';

import createStore from 'dw/permission-management/store';

import PermissionField from '../index';

describe('PermissionField component', () => {
  const render = (newProps = {}) => {
    const { store } = createStore();
    const props = {
      store,
      options: [
        {
          id: 163,
          codename: 'add_abtesting_entities',
          name: 'AB Testing | Add entities',
        },
        {
          id: 165,
          codename: 'delete_abtesting_entities',
          name: 'AB Testing | Delete entities',
        },
        {
          id: 128,
          codename: 'delete_leaderboard_entries',
          name: 'Leaderboards | Delete entries',
        },
      ],
      placeholder: 'Please select Permissions',
      label: 'Permissions',
      input: {
        value: [128],
        name: 'input.permission',
      },
      meta: {
        form: 'PermissionForm',
        touched: undefined,
        error: undefined,
      },
      ...newProps,
    };
    const wrapper = shallow(<PermissionField {...props} />).shallow();

    return { props, wrapper };
  };

  it('renders structure', () => {
    const { wrapper } = render();
    const select = wrapper.find('ReduxFormSelect');
    expect(select).toHaveLength(1);
    expect(select.props().SelectProps.open).toBe(false);
    expect(select.props().options).toEqual([
      {
        label: 'AB Testing',
        options: [
          { value: 163, label: 'Add entities' },
          { value: 165, label: 'Delete entities' },
        ],
      },
      {
        label: 'Leaderboards',
        options: [{ value: 128, label: 'Delete entries' }],
      },
    ]);
  });

  it('simulate ckick, modal popup should be opened', () => {
    const { wrapper } = render();
    const select = wrapper.find('ReduxFormSelect');
    select.simulate('click');
    const modal = wrapper.find('PermissionListModal');
    expect(modal).toHaveLength(1);
    expect(modal.props().selectedOptions).toEqual([128]);
    expect(modal.props().options).toEqual([
      {
        label: 'AB Testing',
        options: [
          { value: 163, label: 'Add entities' },
          { value: 165, label: 'Delete entities' },
        ],
      },
      {
        label: 'Leaderboards',
        options: [{ value: 128, label: 'Delete entries' }],
      },
    ]);
  });

  it('open/close dialog handlers', () => {
    const { wrapper } = render();
    expect(wrapper.state().isPermissionModalOpen).toBe(false);
    wrapper.instance().openPermissionModal();
    expect(wrapper.state().isPermissionModalOpen).toBe(true);
    wrapper.instance().closePermissionModal();
    expect(wrapper.state().isPermissionModalOpen).toBe(false);
  });
});
