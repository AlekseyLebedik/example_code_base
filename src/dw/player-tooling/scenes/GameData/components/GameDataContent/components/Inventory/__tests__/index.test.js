import React from 'react';
import { shallow } from 'enzyme';
import { ReduxProvider } from 'dw/core/helpers/__tests__';

import { DetailRenderer, DetailsRenderer } from '../index';

const data = [
  {
    titleId: 5827,
    currencies: [],
    items: [
      {
        id: '28002804',
        name: 'ar_accurate_bp_ace',
        quantity: 1,
        titleId: 5827,
        updated: 1617795885,
      },
    ],
  },
  {
    titleId: 5830,
    currencies: [
      {
        id: '20',
        amount: 1300,
        name: 'CoDPoints',
        titleId: 5830,
        updated: 1614176413,
      },
      {
        id: '249',
        amount: 0,
        name: 'UNO Rename Token',
        titleId: 5830,
        updated: 1598380874,
      },
    ],
    items: [],
  },
];

describe('GameData Inventory', () => {
  describe('DetailRenderer', () => {
    it('renders single table in recentActivity view', () => {
      const props = {
        recentActivity: true,
        values: [
          {
            id: '28002804',
            name: 'ar_accurate_bp_ace',
            quantity: 1,
            updated: 1617795885,
          },
        ],
      };
      const wrapper = shallow(
        <ReduxProvider>
          <DetailRenderer {...props} />
        </ReduxProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
    it('renders grid view as default', () => {
      const props = {
        recentActivity: false,
        values: {
          currencies: [],
          items: [
            {
              id: '28002804',
              name: 'ar_accurate_bp_ace',
              quantity: 1,
              titleId: 5827,
              updated: 1617795885,
            },
          ],
        },
      };
      const wrapper = shallow(
        <ReduxProvider>
          <DetailRenderer {...props} />
        </ReduxProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('DetailsRenderer', () => {
    it('renders two title tables', () => {
      const props = { data, unoID: '8357148467332307154' };
      const wrapper = shallow(
        <ReduxProvider>
          <DetailsRenderer {...props} />
        </ReduxProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
