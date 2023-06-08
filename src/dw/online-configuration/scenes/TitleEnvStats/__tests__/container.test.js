import React from 'react';
import { shallow } from 'enzyme';

import { GraphsStateful } from '../container';

describe('GraphsStateful Methods', () => {
  let component;
  let props;
  const stat = 'my-stat';
  let initialState;

  beforeEach(() => {
    props = {
      events: {
        maintenances: [{ id: 1 }, { id: 2 }],
        incidents: [{ id: 3 }, { id: 4 }],
        generalComments: [{ id: 5 }, { id: 6 }],
      },
      onLoad: jest.fn(),
      showOnlineGames: true,
      useCorevizLink: false,
    };

    component = shallow(<GraphsStateful {...props} />);
    initialState = component.instance().state;
    component.setState({
      actionStatus: {
        generalComments: [],
        incidents: [],
        maintenances: [stat],
      },
    });
  });

  it('should render successfully with default values provided by store', () => {
    expect(component).toMatchSnapshot();
    expect(props.onLoad).toBeCalled();
  });

  it('should manage properly toggleAction method', () => {
    component.instance().toggleAction('incidents', stat);
    expect(component.instance().state).toMatchSnapshot();
  });

  it('should manage properly toggleAction method on toggled element', () => {
    component.instance().toggleAction('maintenances', stat);
    expect(component.instance().state).toEqual(initialState);
  });

  it('should manage properly isActionEnabled method', () => {
    expect(component.instance().isActionEnabled('incidents', stat)).toEqual(
      false
    );
  });

  it('should manage properly isActionEnabled method on toggled element', () => {
    expect(component.instance().isActionEnabled('maintenances', stat)).toEqual(
      true
    );
  });

  it('should manage properly getSeries method', () => {
    expect(component.instance().getSeries(stat)).toMatchSnapshot();
  });
});
