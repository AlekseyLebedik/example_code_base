import React from 'react';
import { shallow } from 'enzyme';

import FormControlLabel from 'dw/__mocks__/@material-ui/FormControlLabel';
import Icon from 'dw/__mocks__/@material-ui/Icon';

import PermissionListModal from '../index';

describe('PermissionListModal component', () => {
  const render = (newProps = {}) => {
    const props = {
      visible: true,
      options: [
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
      ],
      onCancel: jest.fn(),
      onSubmit: jest.fn(),
      ...newProps,
    };
    const wrapper = shallow(<PermissionListModal {...props} />);

    return { props, wrapper };
  };

  it('renders structure', () => {
    const { wrapper } = render();
    const permissions = wrapper.find(FormControlLabel);
    expect(permissions).toHaveLength(5);
    expect(permissions.at(0)).toHaveProp('label', 'AB Testing');
    expect(permissions.at(1)).toHaveProp('label', 'Add entities');
    expect(permissions.at(2)).toHaveProp('label', 'Delete entities');
    expect(permissions.at(3)).toHaveProp('label', 'Leaderboards');
    expect(permissions.at(4)).toHaveProp('label', 'Delete entries');
  });

  it('renders group toggler', () => {
    const { wrapper } = render();
    expect(
      wrapper
        .findWhere(node => node.key() === 'AB Testing')
        .find(Icon)
        .children()
        .text()
    ).toBe('expand_less');
    wrapper.instance().onToggle('AB Testing')();
    wrapper.update();
    expect(
      wrapper
        .findWhere(node => node.key() === 'AB Testing')
        .find(Icon)
        .children()
        .text()
    ).toBe('expand_more');
  });

  it('selectPermission handler', () => {
    const { wrapper } = render();
    expect(wrapper.state().selectedPermissions).toEqual([]);
    wrapper.instance().selectPermission(163)({ target: { checked: true } });
    expect(wrapper.state().selectedPermissions).toEqual([163]);
    wrapper.instance().selectPermission(163)({ target: { checked: false } });
    expect(wrapper.state().selectedPermissions).toEqual([]);
  });

  it('onToggle handler', () => {
    const { wrapper } = render();
    expect(wrapper.state().collapsed).toEqual([]);
    wrapper.instance().onToggle('AB Testing')();
    expect(wrapper.state().collapsed).toEqual(['AB Testing']);
    wrapper.instance().onToggle('AB Testing')();
    expect(wrapper.state().collapsed).toEqual([]);
  });

  it('test if group is checked', () => {
    const {
      wrapper,
      props: { options },
    } = render();
    expect(wrapper.instance().isChecked(options[0].options)).toBe(false);
    wrapper.instance().selectPermission(163)({ target: { checked: true } });
    wrapper.instance().selectPermission(165)({ target: { checked: true } });
    expect(wrapper.instance().isChecked(options[0].options)).toBe(true);
  });

  it('selectGroup handler', () => {
    const {
      wrapper,
      props: { options },
    } = render();
    expect(wrapper.state().selectedPermissions).toEqual([]);
    wrapper.instance().selectGroup(options[0].options)({
      target: { checked: true },
    });
    expect(wrapper.state().selectedPermissions).toEqual([163, 165]);
    wrapper.instance().selectGroup(options[0].options)({
      target: { checked: false },
    });
    expect(wrapper.state().selectedPermissions).toEqual([]);
  });

  it('onSearch handler', () => {
    const {
      wrapper,
      props: { options },
    } = render();
    expect(wrapper.state().options).toEqual(options);
    wrapper.instance().onSearch({ q: 'Delete' });
    expect(wrapper.state().options).toEqual([
      {
        label: 'AB Testing',
        options: [{ value: 165, label: 'Delete entities' }],
      },
      {
        label: 'Leaderboards',
        options: [{ value: 128, label: 'Delete entries' }],
      },
    ]);
  });
});
