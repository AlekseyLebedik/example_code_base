import findAndReplaceEvent from 'playpants/helpers/findAndReplaceEvent';

describe('findAndReplaceEvent()', () => {
  let events;
  let action;
  it('finds event with matching id and project, and replaces', () => {
    events = [
      {
        id: 0,
        name: 'Event 1',
        project: 1,
      },
    ];
    action = {
      event: {
        id: 0,
        name: 'Event Replaced',
        project: 1,
      },
    };
    expect(findAndReplaceEvent(events, action.event)).toMatchObject([
      action.event,
    ]);
  });
  it('matching id, mismatched project returns original event', () => {
    events = [
      {
        id: 0,
        name: 'Event 1',
        project: 2,
      },
    ];
    expect(findAndReplaceEvent(events, action.event)).toMatchObject(events);
  });
  it('mismatched id, matching project returns original event', () => {
    events = [
      {
        id: 1,
        name: 'Event 1',
        project: 1,
      },
    ];
    expect(findAndReplaceEvent(events, action.event)).toMatchObject(events);
  });
  it('mismatched project, mismatched id returns original event', () => {
    events = [
      {
        id: 1,
        name: 'Event 1',
        project: 2,
      },
    ];
    expect(findAndReplaceEvent(events, action.event)).toMatchObject(events);
  });
});
