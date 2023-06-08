import { makeFilteredEventsSelector } from '../selectors';

function wrapper(events) {
  return events;
}

const mockedState = {
  Core: { EventsCalendar: {} },
  user: { profile: {} },
};
const eventGroups = [
  {
    type: 'eventManager',
    wrapper,
    events: [{ id: 1, type: 'eventManager', status: 'validated' }],
  },
  {
    type: 'abTesting',
    wrapper,
    events: [{ id: 1, type: 'abTesting', is_schedule: true }],
  },
];

describe('makeFilteredEventsSelector', () => {
  describe('sets isReadOnly correctly', () => {
    it('default readOnlyCallback', () => {
      const selector = makeFilteredEventsSelector();
      const [emEvent, abTestingEvent] = selector(mockedState, { eventGroups });
      expect(emEvent).toMatchObject({ isReadOnly: true });
      expect(abTestingEvent).toMatchObject({ isReadOnly: true });
    });
    it('custom readOnlyCallback', () => {
      const readOnlyCallback = event =>
        !['eventManager', 'abTesting'].includes(event.type);
      const selector = makeFilteredEventsSelector({ readOnlyCallback });
      const [emEvent, abTestingEvent] = selector(mockedState, { eventGroups });
      expect(emEvent).toMatchObject({ isReadOnly: false });
      expect(abTestingEvent).toMatchObject({ isReadOnly: false });
    });
  });
});
