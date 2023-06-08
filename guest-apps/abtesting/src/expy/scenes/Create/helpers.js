import axios from 'dw/core/axios';
import { getUTCDate } from '../../helpers';

export const createTest = async ({ values }) => {
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
    const response = await axios.post('/expy/v1/tests/', {
      ...values,
      ...format,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
