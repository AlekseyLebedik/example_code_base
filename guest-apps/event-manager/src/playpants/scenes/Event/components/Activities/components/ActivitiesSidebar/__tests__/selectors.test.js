import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

describe('ActivitySidebar selectors', () => {
  describe('activitySelectedTypeSelector', () => {
    it('selects an activity type', () => {
      const selectedActivityType =
        selectors.activitySelectedTypeSelector(mockState);
      expect(selectedActivityType).toEqual('all');
    });
  });

  describe('filteredActivitiesSelector', () => {
    it('filters the list of activities by selected activity type', () => {
      const newMockState = {
        ...mockState,
        Scenes: {
          ...mockState.Scenes,
          Event: {
            ...mockState.Scenes.Event,
            activity: {
              ...mockState.Scenes.Event.activity,
              selectedActivityType: 'motd',
            },
          },
        },
      };
      const testActivities = [
        {
          id: 13,
          type: 'motd',
          activity: {
            inputs: [
              {
                language: 'sp',
                text: 'Hola Amigo :D',
              },
            ],
          },
          title_envs: [1],
          publish_on: 'on_start',
          exec_order: 0,
          updated_by: {
            id: 1,
            name: 'Initial User',
          },
        },
      ];

      const selectedActivitiesList =
        selectors.filteredActivitiesSelector(newMockState);
      expect(selectedActivitiesList).toEqual(testActivities);
    });
  });
});
