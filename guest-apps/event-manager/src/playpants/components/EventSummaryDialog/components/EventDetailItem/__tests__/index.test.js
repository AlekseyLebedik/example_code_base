import React from 'react';
import { shallow } from 'enzyme';
import { eventDetailItemProps as props } from 'playpants/testUtils/eventSummaryProps';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EventDetailItem from '../index';

describe('EventDetailItem', () => {
  const root = shallow(<EventDetailItem {...props} />);
  it('renders the EventDetailItem correctly', () => {
    expect(root).toMatchSnapshot();
  });

  describe('isHidden prop:', () => {
    it('hides all items when true', () => {
      root.setProps({ isHidden: true });
      expect(root.find(ListItemText)).toHaveLength(0);
      expect(root.find(ListItemIcon)).toHaveLength(0);
    });

    it('displays text and icon when false', () => {
      root.setProps({ isHidden: false });
      expect(root.find(ListItemText)).toHaveLength(1);
      expect(root.find(ListItemIcon)).toHaveLength(1);
    });
  });

  describe('willDisplayIcon prop:', () => {
    it('does not display icon with set to false', () => {
      root.setProps({ willDisplayIcon: false });
      expect(root.find(ListItemIcon)).toHaveLength(0);
    });

    it('displays icon when set to true', () => {
      root.setProps({ willDisplayIcon: true });
      expect(root.find(ListItemIcon)).toHaveLength(1);
    });
  });
});
