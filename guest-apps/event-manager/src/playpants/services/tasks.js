import axios from 'dw/core/axios';
import { joinPath } from 'dw/core/helpers/path';

const BASE_URL = 'playpants/tasks';

export function fetchTaskDetails(id) {
  return axios.get(joinPath(BASE_URL, id));
}
