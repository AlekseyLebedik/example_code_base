import React from 'react';
import { shallow } from 'enzyme';
import ServerStateChart from '../presentational';

describe('ServerInventory', () => {
  describe('ServerStateChart', () => {
    describe('presentational', () => {
      it('renders pie chart', () => {
        expect(
          shallow(<ServerStateChart counters={{ idle: 10, allocated: 20 }} />)
        ).toMatchSnapshot();
      });
    });
  });
});
