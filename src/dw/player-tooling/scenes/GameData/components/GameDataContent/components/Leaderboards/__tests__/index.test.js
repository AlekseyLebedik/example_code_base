import React from 'react';
import { shallow } from 'enzyme';
import { ReduxProvider } from 'dw/core/helpers/__tests__';

import { DetailRenderer, DetailsRenderer } from '../index';

const data = [
  {
    leaderboards: [
      {
        id: '20',
        name: 'XP',
      },
      {
        id: '249',
        name: 'Double Kills',
      },
    ],
    env: { title: { id: 5827, name: 'B05 Dev' }, shortType: 'dev' },
  },
  {
    leaderboards: [
      {
        id: '20',
        name: 'XP',
      },
    ],
    env: { title: { id: 5830, name: 'B05 Scratch' }, shortType: 'dev' },
  },
];

describe('GameData Leaderboards', () => {
  describe('DetailRenderer', () => {
    it('renders two links for 5827', () => {
      const props = {
        values: data[0],
      };
      const wrapper = shallow(<DetailRenderer {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('Link').length).toEqual(2);
    });
    it('renders grid view as default', () => {
      const props = {
        values: data[1],
      };
      const wrapper = shallow(<DetailRenderer {...props} />);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('Link').length).toEqual(1);
    });
  });

  describe('DetailsRenderer', () => {
    it('renders two title tables', () => {
      const props = { data, hideTitles: false };
      const wrapper = shallow(
        <ReduxProvider>
          <DetailsRenderer {...props} />
        </ReduxProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
