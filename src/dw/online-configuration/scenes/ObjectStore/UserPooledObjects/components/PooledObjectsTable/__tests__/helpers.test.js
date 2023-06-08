import React from 'react';
import { shallow } from 'enzyme';

import { TagCellRenderer } from '../helpers';

describe('TagCellRenderer', () => {
  it('renders TagCellRenderer component with tags', () => {
    const params = {
      validTag: [],
      value: [
        {
          key: 'key_1',
          value: '1',
        },
        {
          key: 'key_2',
          value: '2',
        },
      ],
    };
    const wrapper = shallow(<TagCellRenderer {...params} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('renders TagCellRenderer component given no value', () => {
    const params = {
      validTag: [],
      value: undefined,
    };
    const wrapper = shallow(<TagCellRenderer {...params} />);

    expect(wrapper).toMatchSnapshot();
  });
});
