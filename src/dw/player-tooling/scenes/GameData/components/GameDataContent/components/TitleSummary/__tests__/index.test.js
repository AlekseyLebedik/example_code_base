import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import { DetailRenderer } from '../index';

describe('Title Summary DetailRenderer', () => {
  const formatDateTime = d => moment(d * 1000).format('MMM DD hh:mm a z');

  it('Title Summary DetailRenderer renders props correctly', () => {
    const props = {
      formatDateTime,
      kdratio: 1.3245,
      logins: [
        {
          gameMode: 6,
          lastLogin: 1592134201,
          platform: 'xb1',
        },
        {
          gameMode: 4,
          lastLogin: 1592047801,
          platform: 'ps4',
        },
        {
          gameMode: 1,
          lastLogin: 1591961341,
          platform: 'ps4',
        },
        {
          gameMode: 5,
          lastLogin: 1591788541,
          platform: 'xb1',
        },
      ],
      prestige: 1,
      rank: 4,
      scorePerGame: 3034.4563,
      scorePerMinute: 2034.3425,
      timePlayedTotal: 43214,
      titleId: 5,
    };
    const wrapper = shallow(<DetailRenderer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Title Summary DetailRenderer renders undefined optional props correctly', () => {
    const emptyProps = {
      formatDateTime,
      kdratio: undefined,
      logins: undefined,
      prestige: undefined,
      rank: undefined,
      scorePerGame: undefined,
      scorePerMinute: undefined,
      timePlayedTotal: undefined,
      titleId: 5,
    };
    const wrapper = shallow(<DetailRenderer {...emptyProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
