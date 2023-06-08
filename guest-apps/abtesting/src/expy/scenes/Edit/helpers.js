import axios from 'dw/core/axios';
import { getUTCDate } from '../../helpers';
import {
  fetchEditTestPending,
  fetchEditTestSuccess,
  fetchEditTestError,
} from './state/actions';

export const fetchTest =
  ({ testId }) =>
  async dispatch => {
    dispatch(fetchEditTestPending());
    try {
      const response = await axios.get(`/expy/v1/tests/${testId}`);
      const { data } = response;
      dispatch(fetchEditTestSuccess({ data }));

      return { data, treatments: data.treatments };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Fetch tests error: ', err);
      return dispatch(
        fetchEditTestError({ error: 'Error: Cannot load tests.' })
      );
    }
  };

export const updateTest = async ({ values, testId }) => {
  const treatments = values.treatments || [];
  const format = {
    dateStart: values.dateStart
      ? getUTCDate(values.dateStart)
      : values.dateStart,
    dateEnd: values.dateEnd ? getUTCDate(values.dateEnd) : values.dateEnd,
    treatments: treatments.map(t => ({
      ...t,
      dateStart:
        t.dateStart && t.dateStart.length !== 0
          ? getUTCDate(t.dateStart)
          : null,
      dateEnd:
        t.dateEnd && t.dateEnd.length !== 0 ? getUTCDate(t.dateEnd) : null,
    })),
  };

  try {
    const response = await axios.put(`/expy/v1/tests/${testId}`, {
      ...values,
      ...format,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
