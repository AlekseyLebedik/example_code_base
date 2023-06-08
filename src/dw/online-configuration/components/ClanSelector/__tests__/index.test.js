import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { shallowUntilTarget } from 'dw/test-utils';

import ClanSelector from '../index';

describe('ClanSelector', () => {
  it('renders clan search component', () => {
    const props = { playerId: '1234' };
    expect(
      shallowUntilTarget(
        <MemoryRouter>
          <ClanSelector {...props} />
        </MemoryRouter>,
        'ClanSelector'
      )
    ).toMatchSnapshot();
  });
});
