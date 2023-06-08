import React from 'react';
import { shallow } from 'enzyme';

import { statelessActivitiesSidebarProps as props } from 'playpants/testUtils/eventProps';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ActivitiesSidebarStateless from '../presentational';

describe('ActivitiesSidebarStateless', () => {
  const MyComponent = React.forwardRef((props, ref) => (
    <ActivitiesSidebarStateless {...props} ref={ref} />
  ));
  const root = shallow(<MyComponent {...props} />);
  it('renders ActivitiesSidebarStateless correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('enable tab on endDate not null', () => {
    root.setProps({ endDate: 10 });
    props.endDate = 10;
    expect(root).toMatchSnapshot();
  });

  it('renders DragDropContext for list', () => {
    expect(root.find(DragDropContext)).toMatchSnapshot();
  });

  it('renders Droppable for list', () => {
    expect(root.find(Droppable)).toMatchSnapshot();
  });
});
