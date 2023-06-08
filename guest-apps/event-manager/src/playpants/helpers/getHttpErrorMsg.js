import first from 'lodash/first';
import {
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE,
  LOCKED,
  NOT_FOUND,
  BAD_REQUEST,
} from 'http-status-codes';

export default (status, data) => {
  switch (status) {
    case INTERNAL_SERVER_ERROR:
    case NOT_FOUND:
    case SERVICE_UNAVAILABLE:
      return data.error;
    case LOCKED:
      return { msg: data };
    case BAD_REQUEST:
      return data.error.invalid ? first(data.error.invalid) : data.error;
    default:
      return { msg: 'Unhandled error' };
  }
};
