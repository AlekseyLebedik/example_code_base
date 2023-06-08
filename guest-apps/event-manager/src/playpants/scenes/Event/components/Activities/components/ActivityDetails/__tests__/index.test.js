import React from 'react';
import { shallow } from 'enzyme';

import { activitiesDetailsProps as props } from 'playpants/testUtils/eventProps';

import ActivityDetailsBase from '../index';

describe('ActivityDetails', () => {
  const rootNoSelectedActivity = shallow(<ActivityDetailsBase {...props} />);
  it('renders the ActivityDetails container correctly with no selected activity', () => {
    expect(rootNoSelectedActivity).toMatchSnapshot();
  });

  props.selectedActivity = {
    id: 50,
    type: 'motd',
    activity: '{"type":"motd","languages":[{"language":"it","text":""}]}',
    title_envs: [],
  };
  const rootSelectedMOTD = shallow(<ActivityDetailsBase {...props} />);
  it('renders the ActivityDetails container correctly with a selected MOTD', () => {
    expect(rootSelectedMOTD).toMatchSnapshot();
  });

  props.selectedActivity = {
    id: 56,
    type: 'pubvars',
    activity: {
      variable_sets: [
        {
          context: '2',
          group_id: '2',
          is_major_update: false,
          namespace: 'Namespace1',
          variables: {
            test: 'var1',
            test2: 'var2',
          },
        },
      ],
    },
    title_envs: [],
  };
  const rootSelectedPubVars = shallow(<ActivityDetailsBase {...props} />);
  it('renders the ActivityDetails container correctly with a selected PubVars', () => {
    expect(rootSelectedPubVars).toMatchSnapshot();
  });
});
