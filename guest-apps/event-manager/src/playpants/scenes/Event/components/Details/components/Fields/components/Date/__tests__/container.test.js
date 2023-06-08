import React from 'react';
import { shallow } from 'enzyme';

import { eventDatesProps as props } from 'playpants/testUtils/eventProps';
import * as DT from 'dw/core/helpers/date-time';
import Date from '../container';

describe('Date', () => {
  DT.getNowTimestamp = jest.fn(() => 1548547200);
  const root = shallow(<Date {...props} label="From" />);

  it('loads the Date component correctly', () => {
    root.setProps({
      eventData: { ...props.event, publish_at: 1542825180 },
      type: 'publish_at',
    });
    expect(root).toMatchSnapshot();
  });

  it('change to end at', () => {
    root.setProps({
      eventData: {
        ...props.event,
        publish_at: 1542825180,
        end_at: 1543825180,
      },
      type: 'end_at',
    });
    expect(root).toMatchSnapshot();
  });
});
