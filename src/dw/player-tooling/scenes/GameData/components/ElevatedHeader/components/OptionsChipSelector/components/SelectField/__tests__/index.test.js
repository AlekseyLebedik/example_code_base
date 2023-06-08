import React from 'react';
import { shallow } from 'enzyme';

import Component, { renderGroupedValues, getRenderChipFunc } from '../index';

const options = [
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
];

describe('Select', () => {
  it('renders default values', () => {
    const props = { options };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      onDelete: jest.fn(),
      onClick: jest.fn(),
      options,
      value: ['accounts', '5830', 'battlepass'],
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  describe('renderGroupedValues', () => {
    it('renders correct number of selected options', () => {
      const renderChip = getRenderChipFunc({
        onDelete: jest.fn(),
        itemProps: {},
      });
      const result = renderGroupedValues({
        options,
        renderChip,
        selected: ['accounts', '5830', 'inventory'],
      });
      expect(result).toMatchSnapshot();
      expect(
        shallow(result).children().filter('WithStyles(ForwardRef(Chip))').length
      ).toBe(3);
    });
  });
});
