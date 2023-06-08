import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import { taskListItemProps as props } from 'playpants/testUtils/eventProps';

import TaskListItem from '../index';

describe('TaskListItem', () => {
  const root = shallow(<TaskListItem {...props} />);
  it('renders default props', () => {
    expect(root).toMatchSnapshot();
  });

  it('should render the correct number of subtasks', () => {
    const list = root.find(List);
    expect(list.children()).toHaveLength(props.task.children.length);
  });
});
