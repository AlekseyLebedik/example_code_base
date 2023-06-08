import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as errors from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';
import {
  taskRulesSelector,
  searchParams,
  filteredTaskRules,
  formattedTaskRules,
} from '../selectors';

const q = 'blah';
const taskId = 1;
const data = [
  {
    task: 'writeServerValidatedStats',
    service: 'bdStatsService',
    source: 'default',
    clientType: '0',
    allow: true,
    id: taskId,
  },
  {
    task: 'writeServerMultipleValidatedStats',
    service: 'bdStatsService',
    source: 'default',
    clientType: '110',
    allow: true,
    id: 2,
  },
];
const payload = {
  data,
};

const serviceInfo = {
  bdStatsService: [
    '*',
    'deleteStatsEntry',
    'readEntitlementStats',
    'readEntitlementStatsBlob',
    'readLeaderBoardByMultipleRanks',
    'readLeaderBoardByPivot',
    'readLeaderBoardByRank',
  ],
};
const values = {
  service: 'bdACLService',
  task: '*',
  clientType: 1,
  allow: false,
};
const err = 'error';

describe('Security - ACL - TaskRules', () => {
  describe('Action Creators', () => {
    const dispatch = jest.fn();
    const nonCriticalHTTPErrorMock = jest.fn();
    const snackBarShowMock = jest.fn(() => 'show');

    it('TASK_RULES_SEARCH', () => {
      const action = actions.onSearch(q);
      expect(action).toHaveProperty('type', AT.TASK_RULES_SEARCH);
      expect(action).toHaveProperty('q', q);
    });

    it('TASK_RULES_FETCH', () => {
      const action = actions.fetchTaskRules();
      expect(action).toHaveProperty('type', AT.TASK_RULES_FETCH);
      expect(action).toHaveProperty('append', false);
    });

    it('TASK_RULES_FETCH_SUCCESS', () => {
      const action = actions.fetchTaskRulesSuccess(payload, false);
      expect(action).toHaveProperty('type', AT.TASK_RULES_FETCH_SUCCESS);
      expect(action).toHaveProperty('taskRules', data);
      expect(action).toHaveProperty('append', false);
    });

    it('fetchTaskRulesFailed', () => {
      const criticalErrorShowMock = jest.fn();
      CriticalErrorActions.show = criticalErrorShowMock;
      actions.fetchTaskRulesFailed()(dispatch);

      expect(criticalErrorShowMock).toHaveBeenCalled();
    });

    it('TASK_RULES_SERVICE_AND_TASK_INFO_FETCH', () => {
      expect(actions.fetchServiceAndTaskInfo()).toHaveProperty(
        'type',
        AT.TASK_RULES_SERVICE_AND_TASK_INFO_FETCH
      );
    });

    it('TASK_RULES_SERVICE_AND_TASK_INFO_FETCH_SUCCESS', () => {
      const action = actions.fetchServiceAndTaskInfoSuccess({
        data: serviceInfo,
      });
      expect(action).toHaveProperty(
        'type',
        AT.TASK_RULES_SERVICE_AND_TASK_INFO_FETCH_SUCCESS
      );
      expect(action).toHaveProperty('serviceInfo', serviceInfo);
    });

    it('fetchServiceAndTaskInfoFailed', () => {
      nonCriticalHTTPErrorMock.mockReset();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;
      actions.fetchServiceAndTaskInfoFailed(err)(dispatch);

      expect(nonCriticalHTTPErrorMock).toHaveBeenCalledWith(err);
    });

    it('TASK_RULES_ADD_MODAL_OPEN', () => {
      expect(actions.openAddModal()).toHaveProperty(
        'type',
        AT.TASK_RULES_ADD_MODAL_OPEN
      );
    });

    it('TASK_RULES_ADD_MODAL_CLOSE', () => {
      expect(actions.closeAddModal()).toHaveProperty(
        'type',
        AT.TASK_RULES_ADD_MODAL_CLOSE
      );
    });

    it('TASK_RULES_ADD', () => {
      const action = actions.addTaskRule(values);
      expect(action).toHaveProperty('type', AT.TASK_RULES_ADD);
      expect(action).toHaveProperty('values', values);
    });

    it('TASK_RULES_ADD_SUCCESS', () => {
      snackBarShowMock.mockReset();
      GlobalSnackBarActions.show = snackBarShowMock;
      const expectedAction = {
        type: AT.TASK_RULES_ADD_SUCCESS,
        taskRule: {
          id: taskId,
          ...values,
          source: 'devzone',
        },
      };

      dispatch.mockReset();
      actions.addTaskRuleSuccess({ taskId }, values)(dispatch);

      expect(dispatch.mock.calls[0]).toEqual([expectedAction]);
      expect(dispatch).toHaveBeenCalledWith(snackBarShowMock());
    });

    it('addTaskRuleFailed', () => {
      nonCriticalHTTPErrorMock.mockReset();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;
      actions.addTaskRuleFailed(err)(dispatch);

      expect(nonCriticalHTTPErrorMock).toHaveBeenCalledWith(err);
    });

    it('TASK_RULES_DELETE', () => {
      snackBarShowMock.mockReset();
      GlobalSnackBarActions.show = snackBarShowMock;
      const expectedAction = {
        type: AT.TASK_RULES_DELETE,
        taskId,
      };

      dispatch.mockReset();
      actions.deleteTaskRule(taskId)(dispatch);

      expect(dispatch.mock.calls[0]).toEqual([expectedAction]);
      expect(dispatch).toHaveBeenCalledWith(snackBarShowMock());
    });

    it('TASK_RULES_DELETE_SUCCESS', () => {
      const action = actions.deleteTaskRuleSuccess(taskId);
      expect(action).toHaveProperty('type', AT.TASK_RULES_DELETE_SUCCESS);
      expect(action).toHaveProperty('taskId', taskId);
    });

    it('deleteTaskRuleFailed', () => {
      nonCriticalHTTPErrorMock.mockReset();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;
      actions.deleteTaskRuleFailed(err)(dispatch);

      expect(nonCriticalHTTPErrorMock).toHaveBeenCalledWith(err);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle TASK_RULES_SEARCH', () => {
      expect(reducer(undefined, actions.onSearch(q))).toMatchSnapshot();
    });

    it('handle TASK_RULES_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchTaskRulesSuccess(payload, false))
      ).toMatchSnapshot();
    });

    it('handle TASK_RULES_SERVICE_AND_TASK_INFO_FETCH_SUCCESS', () => {
      expect(
        reducer(
          undefined,
          actions.fetchServiceAndTaskInfoSuccess({ data: serviceInfo })
        )
      ).toMatchSnapshot();
    });

    it('handle TASK_RULES_ADD_MODAL_OPEN', () => {
      expect(reducer(undefined, actions.openAddModal())).toMatchSnapshot();
    });

    it('handle TASK_RULES_ADD_MODAL_CLOSE', () => {
      expect(reducer(undefined, actions.closeAddModal())).toMatchSnapshot();
    });

    it('handle TASK_RULES_ADD', () => {
      expect(reducer(undefined, actions.addTaskRule(values))).toMatchSnapshot();
    });

    it('handle TASK_RULES_ADD_SUCCESS', () => {
      expect(
        reducer(undefined, {
          type: AT.TASK_RULES_ADD_SUCCESS,
          taskRule: { id: taskId, ...values, source: 'devzone' },
        })
      ).toMatchSnapshot();
    });

    it('handle TASK_RULES_ADD_FAILED', () => {
      expect(
        reducer(undefined, { type: AT.TASK_RULES_ADD_FAILED })
      ).toMatchSnapshot();
    });

    it('handle TASK_RULES_DELETE_SUCCESS', () => {
      const state = reducer(
        undefined,
        actions.fetchTaskRulesSuccess(payload, false)
      );
      expect(
        reducer(state, actions.deleteTaskRuleSuccess(taskId))
      ).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate taskRulesSelector', () => {
      const state = {
        Scenes: {
          Security: { ACL: { TaskRules: { taskRules: data } } },
        },
      };
      const expected = [
        {
          task: 'writeServerMultipleValidatedStats',
          service: 'bdStatsService',
          source: 'default',
          clientType: 110,
          allow: true,
          id: 2,
        },
        {
          task: 'writeServerValidatedStats',
          service: 'bdStatsService',
          source: 'default',
          clientType: 0,
          allow: true,
          id: taskId,
        },
      ];
      expect(taskRulesSelector(state)).toEqual(expected);
    });

    it('validate searchParams', () => {
      const state = {
        Scenes: {
          Security: { ACL: { TaskRules: { q: 'blah' } } },
        },
      };
      const expected = 'blah';

      expect(searchParams(state)).toBe(expected);
    });

    it('validate filteredTaskRules', () => {
      const state = {
        Scenes: {
          Security: { ACL: { TaskRules: { taskRules: data } } },
        },
      };
      const expected = [
        {
          task: 'writeServerMultipleValidatedStats',
          service: 'bdStatsService',
          source: 'default',
          clientType: 110,
          allow: true,
          id: 2,
        },
        {
          task: 'writeServerValidatedStats',
          service: 'bdStatsService',
          source: 'default',
          clientType: 0,
          allow: true,
          id: taskId,
        },
      ];
      expect(filteredTaskRules(state)).toEqual(expected);
    });

    it('validate filteredTaskRules with search params', () => {
      const state = {
        Scenes: {
          Security: {
            ACL: {
              TaskRules: {
                taskRules: data,
                q: { default: true, q: 'writeServerValidatedStats' },
              },
            },
          },
        },
      };
      const expected = [
        {
          task: 'writeServerValidatedStats',
          service: 'bdStatsService',
          source: 'default',
          clientType: 0,
          allow: true,
          id: taskId,
        },
      ];
      expect(filteredTaskRules(state)).toEqual(expected);
    });

    it('validate formattedTaskRules', () => {
      const state = {
        Scenes: {
          Security: { ACL: { TaskRules: { taskRules: data } } },
        },
      };
      const expected = [
        'bdStatsService',
        {
          task: 'writeServerMultipleValidatedStats',
          service: 'bdStatsService',
          source: 'default',
          clientType: 110,
          allow: true,
          id: 2,
        },
        {
          task: 'writeServerValidatedStats',
          service: 'bdStatsService',
          source: 'default',
          clientType: 0,
          allow: true,
          id: taskId,
        },
      ];
      expect(formattedTaskRules(state)).toEqual(expected);
    });
  });
});
