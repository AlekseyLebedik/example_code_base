import React from 'react';
import { shallow } from 'enzyme';

import { eventStatusIndicatorProps as props } from 'playpants/testUtils/eventSummaryProps';
import StatusDot from 'playpants/components/StatusDot';

import EventStatus, { EventStatusDot } from '../index';

describe('EventStatusIndicator', () => {
  const root = shallow(<EventStatus {...props} />);
  describe('rendering()', () => {
    it('renders the default component snapshot correctly', () => {
      expect(root).toMatchSnapshot();
    });

    it('renders task status dot', () => {
      expect(root.find(EventStatusDot).dive().find(StatusDot).length).toBe(1);
    });

    it('does not render status dot on acceptable task status', () => {
      root.setProps({ taskStatus: 'succeeded' });
      root.update();
      expect(root.find('div').children().at(0).text()).toMatch('');
      expect(root.find(EventStatusDot).dive().find(StatusDot).length).toBe(0);
    });
  });
});
