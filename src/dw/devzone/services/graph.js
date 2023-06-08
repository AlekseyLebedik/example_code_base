import axios from 'dw/core/axios';
import { createApiUrl } from 'dw/online-configuration/services/helpers';

export const getStatData = (stat, source, start, end, daily) => {
  const url = source.withTitleEnv
    ? createApiUrl(`${source.resource}/${stat}`)
    : `/${source.resource}/${stat}/`;
  return axios.get(url, {
    params: {
      start: start && Math.round(start / 1000),
      end: end && Math.round(end / 1000),
      daily,
    },
  });
};
