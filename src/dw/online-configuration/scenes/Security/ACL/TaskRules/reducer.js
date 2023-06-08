import * as AT from './actionTypes';

const INITIAL_STATE = {
  taskRules: [],
  serviceInfo: {},
  q: undefined,
  addModalVisible: false,
  addModalSubmitting: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.TASK_RULES_SEARCH:
      return {
        ...state,
        q: action.q,
      };
    case AT.TASK_RULES_FETCH_SUCCESS:
      return {
        ...state,
        taskRules: action.taskRules,
      };
    case AT.TASK_RULES_SERVICE_AND_TASK_INFO_FETCH_SUCCESS:
      return {
        ...state,
        serviceInfo: action.serviceInfo,
      };
    case AT.TASK_RULES_ADD_MODAL_OPEN:
      return {
        ...state,
        addModalVisible: true,
      };
    case AT.TASK_RULES_ADD_MODAL_CLOSE:
      return {
        ...state,
        addModalVisible: false,
      };
    case AT.TASK_RULES_ADD:
      return {
        ...state,
        addModalSubmitting: true,
      };
    case AT.TASK_RULES_ADD_SUCCESS: {
      const idx = state.taskRules.findIndex(
        item => item.id === action.taskRule.id
      );
      const deleteCount = idx === -1 ? 0 : 1;
      const newTaskRules = [...state.taskRules];
      newTaskRules.splice(idx, deleteCount, action.taskRule);
      return {
        ...state,
        taskRules: newTaskRules,
        addModalVisible: false,
        addModalSubmitting: false,
        q: {
          default: false,
          values: {
            service: action.taskRule.service,
            task: action.taskRule.task,
          },
        },
      };
    }
    case AT.TASK_RULES_ADD_FAILED:
      return {
        ...state,
        addModalVisible: false,
        addModalSubmitting: false,
      };
    case AT.TASK_RULES_DELETE_SUCCESS:
      return {
        ...state,
        taskRules: state.taskRules.filter(item => item.id !== action.taskId),
      };
    default:
      return state;
  }
};

export default reducer;
