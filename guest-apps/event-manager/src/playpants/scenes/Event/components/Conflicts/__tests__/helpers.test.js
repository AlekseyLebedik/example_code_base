import {
  conflictSortTestProps,
  eventConflictsProps,
} from 'playpants/testUtils/eventProps';

import * as helpers from '../helpers';

describe('Conflicts helpers', () => {
  describe('conflictQueryMatch', () => {
    it('returns true after finding a query string in a string', () => {
      expect(helpers.conflictQueryMatch('this is a test', 'test')).toEqual(
        true
      );
    });
    it('returns false after not finding a query string in a string', () => {
      expect(helpers.conflictQueryMatch('this is a test', 'cod')).toEqual(
        false
      );
    });
  });

  describe('filterConflicts', () => {
    const eventConflict = eventConflictsProps.conflictDetails;
    it('filters out conflicts by severity', () => {
      expect(
        helpers.filterConflicts([eventConflict], '', 'activity-title-overlap')
      ).toEqual([]);
      expect(
        helpers.filterConflicts([eventConflict], '', 'activity-title-conflict')
      ).toEqual([eventConflict]);
    });

    it('filters out conflicts by severity and searchQuery string', () => {
      expect(
        helpers.filterConflicts([eventConflict], 'Conflict', 'all')
      ).toEqual([]);
      expect(
        helpers.filterConflicts([eventConflict], 'Overlapping', 'all')
      ).toEqual([eventConflict]);
      expect(
        helpers.filterConflicts([eventConflict], 'pubvars', 'all')
      ).toEqual([]);
      expect(
        helpers.filterConflicts([eventConflict], 'pubstorage', 'all')
      ).toEqual([eventConflict]);
      expect(helpers.filterConflicts([eventConflict], '11111', 'all')).toEqual(
        []
      );
      expect(helpers.filterConflicts([eventConflict], '1', 'all')).toEqual([
        eventConflict,
      ]);
    });
  });

  describe('getPubVarsConflicts', () => {
    const variableSets = [
      {
        context: '1',
        group_id: '2',
        namespace: 'test',
        variables: {
          test: 'test',
        },
      },
      {
        context: '3',
        group_id: '4',
        namespace: 'another test',
        variables: {
          var: 'val',
        },
      },
    ];
    it('returns variable sets with conflicts', () => {
      expect(
        helpers.getPubVarsConflicts(variableSets, [
          {
            context: '1',
            group_id: '2',
            namespace: 'test',
            conflicting_variables: ['test'],
          },
        ])
      ).toEqual([
        {
          variable: 'test',
          value: 'test',
          context: '1',
          groupId: '2',
          namespace: 'test',
        },
      ]);

      expect(helpers.getPubVarsConflicts(variableSets, [])).toEqual([]);
    });
  });

  describe('getConflictEventInfo', () => {
    it('returns the string for the event list item', () => {
      expect(
        helpers.getConflictEventInfo({
          id: 1,
          title: 'Test Event',
        })
      ).toEqual('Event "Test Event" ID 1');
    });
  });

  describe('getConflictActivityInfo', () => {
    it('returns the string for the event activity list item', () => {
      expect(
        helpers.getConflictActivityInfo(
          { id: 1, type: 'pubvars' },
          { id: 2, type: 'pubvars' }
        )
      ).toEqual('pubvars 1 / pubvars 2');
    });
  });

  describe('isConflictingEventSelected', () => {
    it('returns true when given the selected Event ID', () => {
      expect(helpers.isConflictingEventSelected(1, 1)).toEqual(true);
    });

    it('returns false when given an ID different than the selected Event ID', () => {
      expect(helpers.isConflictingEventSelected(2, 1)).toEqual(false);
    });
  });

  describe('isConflictingActivitySelected', () => {
    it('returns true when given the selected Event and Activity ids', () => {
      expect(helpers.isConflictingActivitySelected(1, 2, 3, 1, 2, 3)).toEqual(
        true
      );
    });

    it('returns false when given ids different than the selected Event and Activity ids', () => {
      expect(helpers.isConflictingActivitySelected(1, 2, 3, 4, 5, 6)).toEqual(
        false
      );
    });
  });

  describe('splitConflictUrlId', () => {
    it('splits a conflict URL ID appropriately when there are event and activity ids', () => {
      expect(helpers.splitConflictUrlId('1,2,3')).toEqual([1, 2, 3]);
    });

    it('splits a conflict URL ID appropriately when there is just an event id', () => {
      expect(helpers.splitConflictUrlId('1')).toEqual([1]);
    });
  });

  describe('sortConflicts', () => {
    it('sorts event conflicts list by conflict severity and event and activity properties', () => {
      expect(helpers.sortConflicts(conflictSortTestProps)).toEqual([
        {
          conflicts: [
            {
              activity_type: 'pubstorage',
              details: [],
              event_activity: {
                id: 5,
                type: 'pubstorage',
                activity: '{"files":[4]}',
                title_envs: [1],
              },
              overlapping_event_activity: {
                id: 8,
                type: 'pubstorage',
                activity: '{"files":[4]}',
                title_envs: [1],
              },
              severity: 'activity-title-conflict',
            },
          ],
          conflicting_event: {
            id: 2,
            title: 'Conflicting Event',
            status: 'open',
            activities: [8],
            project: 1,
            publish_at: 1569870000,
            end_at: 1570212969,
          },
          severity: 'activity-title-conflict',
        },
        {
          conflicts: [
            {
              activity_type: 'pubstorage',
              details: [],
              event_activity: {
                id: 5,
                type: 'pubstorage',
                activity: '{"files":[4]}',
                title_envs: [1],
              },
              overlapping_event_activity: {
                id: 8,
                type: 'pubstorage',
                activity: '{"files":[4]}',
                title_envs: [1],
              },
              severity: 'activity-title-conflict',
            },
            {
              activity_type: 'ae',
              details: [],
              event_activity: {
                activity: '{"ruleset_to_activate":{"label":"stronghold-5"}}',
                id: 3,
                type: 'ae',
              },
              overlapping_event_activity: {
                activity: '{"ruleset_to_activate":{"label":"stronghold-5"}}',
                id: 2,
                type: 'ae',
              },
              severity: 'activity-title-overlap',
            },
          ],
          conflicting_event: {
            id: 1,
            title: 'Overlapping Event',
            status: 'open',
            activities: [8],
            project: 1,
            publish_at: 1569870000,
            end_at: 1570212969,
          },
          severity: 'activity-title-overlap',
        },
      ]);
    });
  });
});
