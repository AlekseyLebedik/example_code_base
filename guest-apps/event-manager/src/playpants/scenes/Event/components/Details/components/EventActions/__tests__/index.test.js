import React from 'react';
import { shallow } from 'enzyme';

import IconMenu from 'dw/core/components/IconMenu';
import Grid from '@material-ui/core/Grid';
import { eventActionsProps as props } from 'playpants/testUtils/eventProps';

import EventActionsBase from '../index';

describe('EventActionsBase:', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventActionsBase {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders icon menu when there are 5 or more options available', () => {
    wrapper.setProps({
      ...props,
      status: {
        ...props.status,
        canCancel: true,
        canDelete: true,
        canDuplicate: true,
        canEndNow: true,
        canOpen: true,
        canPublishNow: false,
        canShowTemplate: false,
        readOnly: false,
      },
    });
    wrapper.update();
    expect(wrapper.find(IconMenu).length).toBeTruthy();
  });

  it('renders two overflowing event actions in action menu', () => {
    wrapper.setProps({
      ...props,
      status: {
        ...props.status,
        canCancel: true,
        canDelete: true,
        canDuplicate: true,
        canEndNow: true,
        canOpen: false,
        canPublishNow: false,
        canShowTemplate: false,
        readOnly: false,
      },
    });
    wrapper.update();
    expect(wrapper.find(IconMenu).find(Grid).length).toBe(4);
  });

  it('does not render menu item when there are less than 5 options', () => {
    wrapper.setProps({
      ...props,
      status: {
        ...props.status,
        canCancel: false,
        canDelete: false,
        canDuplicate: true,
        canEndNow: false,
        canOpen: true,
        canPublishNow: true,
        canShowTemplate: false,
        readOnly: true,
      },
    });
    wrapper.update();
    expect(wrapper.find(IconMenu).length).toBeFalsy();
  });
});
