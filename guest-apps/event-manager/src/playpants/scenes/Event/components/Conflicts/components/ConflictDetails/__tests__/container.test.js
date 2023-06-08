import React from 'react';
import { shallow } from 'enzyme';

import { eventConflictsProps as props } from 'playpants/testUtils/eventProps';

import { ConflictDetailsBase } from '../container';

describe('ConflictDetailsBase', () => {
  let instance;
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictDetailsBase {...props} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getFileUploadDetails', () => {
    it("doesn't call fileDetailsFetch when the two conflicting activities aren't pubstorage", () => {
      wrapper.setProps({
        conflictActivityDetails: {
          ...props.conflictActivityDetails,
          activity_type: 'pubstorage',
          event_activity: {
            activity: '{"ruleset_to_activate":{"label":"stronghold-5"}}',
            id: 1,
            title_envs: [1],
            type: 'ae',
          },
          overlapping_event_activity: {
            activity: '{"ruleset_to_activate":{"label":"stronghold-5"}}',
            id: 2,
            title_envs: [1],
            type: 'ae',
          },
          severity: 'activity-title-conflict',
        },
      });
      instance.getFileUploadDetails();
      expect(props.fileDetailsFetch).toHaveBeenCalledTimes(0);
    });

    it('does call fileDetailsFetch when the two conflicting activities are pubstorage', () => {
      wrapper.setProps({
        conflictActivityDetails: {
          ...props.conflictActivityDetails,
          activity_type: 'pubstorage',
          event_activity: {
            id: 5,
            type: 'pubstorage',
            activity: '{"files":[4]}',
            title_envs: [1],
          },
          overlapping_event_activity: {
            id: 8,
            type: 'pubstorage',
            activity: '{"files":[4]}',
            title_envs: [1],
          },
          severity: 'activity-title-conflict',
        },
      });
      instance.getFileUploadDetails();
      expect(props.fileDetailsFetch).toHaveBeenCalledTimes(1);
    });
  });
});
