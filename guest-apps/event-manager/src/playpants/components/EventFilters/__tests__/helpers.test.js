import { eventFilterProps } from 'dw/core/components/EventsCalendar/testData';
import { getGroups, sortByOrder } from '../helpers';

describe('EventFilters helpers', () => {
  const { eventGroups, eventsCalendarSettings } = eventFilterProps;
  const { filters } = eventsCalendarSettings;
  it('getGroups should return formatted groups from eventGroups', () => {
    const groups = getGroups({ eventGroups, filters });
    const eventManager = groups.find(g => g.name === 'eventManager');
    const { loading } = eventGroups.find(g => g.type === 'eventManager');
    expect(eventManager).toEqual(
      expect.objectContaining({
        isGroup: true,
        disabled: false,
        groupProps: expect.objectContaining({ loading }),
      })
    );
  });

  it('sortByOrder should return list sorted by order', () => {
    const order = ['a', 'b', 'c', 'd'];
    const list = [
      { name: 'D' },
      { name: 'TEST' },
      { name: 'b' },
      { name: 'c' },
      { name: 'a' },
    ];
    expect(sortByOrder(list, order)).toEqual([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'D' },
      { name: 'TEST' },
    ]);
  });
});
