import React from 'react';
import { shallow } from 'enzyme';

import BansHistory from '..';

describe('BansHistory', () => {
  it('renders with data', () => {
    const sampleData = [
      {
        time: 'test-time',
        reason: 'reason',
        reasonName: 'cod_points_fraud',
        source: 'source',
        infractionStart: 'infraction start',
        infractionEnd: 'infraction end',
      },
    ];
    const rendered = shallow(<BansHistory data={sampleData} />);

    expect(rendered.find('KeyValue')).toMatchSnapshot();
  });

  it('renders with empty data', () => {
    const sampleData = [];
    const rendered = shallow(<BansHistory data={sampleData} />);

    expect(rendered).toMatchSnapshot();
  });
});
