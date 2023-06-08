import { getSaga } from '../../helpers/sagas';

import * as tasksApi from '../../services/tasks';
import { actionTypes } from './index';

export default getSaga(
  actionTypes.FETCH_TASKS,
  tasksApi.fetchTasksList,
  'results'
);
