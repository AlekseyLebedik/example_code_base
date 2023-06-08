import React from 'react';
import { shallow } from 'enzyme';
import { taskDetailsProps as props } from 'playpants/testUtils/eventProps';

import TaskOverview from '../index';

describe('TaskOverview', () => {
  const root = shallow(<TaskOverview {...props} formatDateTime={jest.fn()} />);
  it('renders default props', () => {
    expect(root).toMatchSnapshot();
  });
});
