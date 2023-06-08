import React from 'react';
import { shallow } from 'enzyme';

import { repeatEventDatesProps as props } from 'playpants/testUtils/eventProps';

import RepeatEndDateField from '../index';

describe('RepeatEndDate', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RepeatEndDateField {...props} />);
  });

  it('loads the RepeatEndDate component correctly', () => {
    wrapper.setProps({
      eventData: {
        ...props.event,
        end_at: 1588276858,
        publish_at: 1588190458,
        repeat_event_settings:
          '{"end_repeat_at":1596225658,"frequency":1,"interval":"weeks","iteration":0}',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
