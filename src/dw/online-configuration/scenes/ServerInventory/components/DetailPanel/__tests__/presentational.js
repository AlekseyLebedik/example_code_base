import React from 'react';
import { shallow } from 'enzyme';
import DetailPanel from '../presentational';

describe('ServerInventory', () => {
  describe('DetailPanel', () => {
    describe('presentational', () => {
      it('renders loading state', () => {
        expect(shallow(<DetailPanel loading />)).toMatchSnapshot();
      });

      it('renders empty state', () => {
        expect(shallow(<DetailPanel empty />)).toMatchSnapshot();
      });

      it('should renders no data when there is no context, buildname and dc', () => {
        const wrapper = shallow(<DetailPanel empty />);
        expect(wrapper.find('EmptyComponent')).toExist();
      });

      it('renders chart', () => {
        expect(shallow(<DetailPanel displayChart />)).toMatchSnapshot();
      });

      it('renders server list', () => {
        const servers = [
          {
            data: {
              allocated: false,
              priority: '1',
              registrationTime: '2010-01-01',
              playlistID: '1',
            },
            userID: '12345',
          },
        ];

        expect(shallow(<DetailPanel servers={servers} />)).toMatchSnapshot();
      });
    });
  });
});
