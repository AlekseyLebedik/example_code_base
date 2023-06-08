import React from 'react';
import { shallow } from 'enzyme';

import { useScheduleEventGroups } from '../hooks';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('useScheduleEventGroups', () => {
  const Container = () => {
    const eventGroups = useScheduleEventGroups();
    return <div eventGroups={eventGroups} />;
  }; // Hooks can only be used inside a function component

  const container = shallow(<Container />);

  it('should have all event types', () => {
    expect(container.prop('eventGroups')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'eventManager' }),
        expect.objectContaining({ type: 'informationalEvents' }),
        expect.objectContaining({ type: 'demonwareEvents' }),
        expect.objectContaining({ type: 'externalEvents' }),
        expect.objectContaining({ type: 'abTesting' }),
      ])
    );
  });
});
