import { getRecentTaskType } from '../helpers';
import { DEFAULT_SELECTED_TAB } from '../constants';

describe('TaskMonitor', () => {
  describe('helpers', () => {
    describe('getRecentTaskType', () => {
      it('returns the tab type of most recently created', () => {
        const mockTasksData = [
          {
            type: 'testing',
            created_at: 1607468349,
          },
          { type: 'publishing', created_at: 1607468243 },
        ];
        const taskType = getRecentTaskType(mockTasksData);
        expect(taskType).toEqual('testing');
      });
      it('returns the default tab type if tasks data is empty', () => {
        const mockTasksData = [];
        const taskType = getRecentTaskType(mockTasksData);
        expect(taskType).toEqual(DEFAULT_SELECTED_TAB);
      });
    });
  });
});
