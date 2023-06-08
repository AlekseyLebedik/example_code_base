import React from 'react';
import { shallow } from 'enzyme';

import PlayerTabsContainer from '../index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    inventoryType: 'blah',
    path: 'blah',
  }),
}));

describe('PlayerTabsContainer', () => {
  it('renders Player Tabs Container component', () => {
    const props = {
      tabs: [
        {
          name: 'player-achievements',
          label: 'Achievements',
        },
        { name: 'audit-log', label: 'Audit' },
      ],
      tab: 'player-achievements',
      onPlayerChange: jest.fn(),
      onTabChange: jest.fn(),
    };
    expect(shallow(<PlayerTabsContainer {...props} />)).toMatchSnapshot();
  });
});
