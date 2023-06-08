import React from 'react';
import { shallow } from 'enzyme';

import { statelessMotdItemProps as props } from 'playpants/testUtils/eventProps';

import StatelessItem from '../presentational';

describe('StatelessItem', () => {
  const rootNotEditable = shallow(<StatelessItem {...props} />);
  it('renders MOTD stateless item correctly', () => {
    expect(rootNotEditable).toMatchSnapshot();
  });

  props.isEditable = true;
  const rootEditable = shallow(<StatelessItem {...props} />);
  it('renders editable MOTD stateless item correctly', () => {
    expect(rootEditable).toMatchSnapshot();
  });
});
