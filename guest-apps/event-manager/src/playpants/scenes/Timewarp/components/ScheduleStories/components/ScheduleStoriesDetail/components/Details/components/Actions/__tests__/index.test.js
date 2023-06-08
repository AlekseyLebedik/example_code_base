import React from 'react';
import { shallow } from 'enzyme';
import { actionsProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import { ActionsBase } from '../index';

describe('Actions', () => {
  const root = shallow(<ActionsBase {...actionsProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
