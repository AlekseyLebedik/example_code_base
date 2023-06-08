import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import { eventDatesProps as props } from 'playpants/testUtils/eventProps';

import Date from '../presentational';

describe('Date', () => {
  const root = shallow(<Date {...props} />);

  it('loads the Date component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  props.type = 'end_at';
  props.date = moment('2019-11-18T11:55:00Z').tz('America/Los_Angeles').unix();
  it('loads end date instead of publish date', () => {
    expect(root).toMatchSnapshot();
  });
});
