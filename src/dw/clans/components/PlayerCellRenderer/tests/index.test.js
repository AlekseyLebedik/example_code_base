import React from 'react';
import { shallow } from 'enzyme';
import PlayerCellRenderer from '../index';

const PLAYER = {
  accountType: 'uno',
  userID: '5151811586893775373',
  username: 'test-owner',
};

describe('Clans - PlayerCellRenderer', () => {
  const params = {
    value: PLAYER,
    context: {
      accountsServiceConfigId: '12',
    },
  };
  it('renders player view link', () => {
    const wrapper = shallow(<PlayerCellRenderer {...params} />);
    expect(wrapper).toMatchSnapshot();
  });
});
