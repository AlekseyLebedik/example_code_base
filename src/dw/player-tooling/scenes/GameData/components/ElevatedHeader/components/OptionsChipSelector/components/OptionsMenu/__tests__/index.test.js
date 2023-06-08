import React from 'react';
import { shallow } from 'enzyme';

import OptionsMenu from '../index';

const props = {
  anchorEl: document.createElement('div'),
  handleClickAway: jest.fn(),
  onSelectOption: jest.fn(),
  open: true,
  selectedOptions: {
    globals: ['accounts', 'activity'],
    titles: ['5830'],
    services: ['battlepass', 'inventory'],
  },
  optionGroups: [
    {
      groupLabel: 'globals',
      options: [
        {
          value: 'accounts',
          label: 'Accounts',
        },
      ],
    },
    {
      groupLabel: 'titles',
      options: [
        {
          value: '5827',
          label: 'BO5 CrossPlay Blueberry Dev',
        },
        {
          value: '5830',
          label: 'BO5 CrossPlay Scratch Dev',
        },
      ],
    },
    {
      groupLabel: 'services',
      options: [
        {
          value: 'battlepass',
          label: 'Battlepass',
          disabled: false,
        },
        {
          value: 'inventory',
          label: 'Inventory',
          disabled: false,
        },
      ],
    },
  ],
};

describe('StatelessSchedule', () => {
  const root = shallow(<OptionsMenu {...props} />);
  const popper = root.find('ForwardRef(Popper)');
  const menuList = popper.dive().find('ForwardRef(MenuList)');

  it('renders correctly with ClickAwayListener', () => {
    expect(root.find('ClickAwayListener')).toMatchSnapshot();
  });

  it('renders correct number of global options', () => {
    const globals = menuList.childAt(0);
    expect(globals).toMatchSnapshot();
    expect(globals.children().length).toBe(1);
  });
  it('renders correct number of title options', () => {
    const titles = menuList.childAt(1);
    expect(titles).toMatchSnapshot();
    expect(titles.children().length).toBe(3);
  });
  it('renders correct number of services options', () => {
    const services = menuList.childAt(2);
    expect(services).toMatchSnapshot();
    expect(services.children().length).toBe(3);
  });
});
