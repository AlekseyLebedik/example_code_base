import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import { taskDetailsProps as props } from 'playpants/testUtils/eventProps';

import SubTasks from '../index';

describe('SubTasks', () => {
  const root = shallow(<SubTasks {...props} />);
  it('renders default props', () => {
    expect(root).toMatchSnapshot();
  });

  it('should render the correct number of subtasks', () => {
    const list = root.find(List);
    expect(list.children()).toHaveLength(props.subTasks.length);
  });
});
