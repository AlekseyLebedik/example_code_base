import React from 'react';
import { shallow } from 'enzyme';

import DashboardButton from '../index';

const mockData = {
  name: 'Name',
  type: 'matchmaking',
  status: 'Done',
};

describe('ABTesting Design - DashboardButton', () => {
  it('renders design dashboard button snapshot', () => {
    expect(
      shallow(
        <DashboardButton
          name={mockData.name}
          type={mockData.type}
          status={mockData.status}
        >
          Details
        </DashboardButton>
      )
    ).toMatchSnapshot();
  });
});
