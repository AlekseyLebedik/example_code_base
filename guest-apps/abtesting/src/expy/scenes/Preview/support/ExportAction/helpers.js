import axios from 'dw/core/axios';
import find from 'lodash/find';
import get from 'lodash/get';
import { createApiUrl } from 'dw/core/helpers/services';
import {
  getUnixTime,
  getUTCDate,
  getKPIServiceDate,
} from '../../../../helpers';
import { TEST_TITLES } from '../../../../constants';

const formatData = testValues => ({
  name: testValues.name,
  purpose: testValues.summary,
  creator: null,
  catchStart: getUnixTime(testValues.dateStart) / 1000,
  catchEnd: getUnixTime(testValues.dateEnd) / 1000,
  cohorts: [],
});

export const getTestTitle = ({ title }) => {
  const { id } = find(TEST_TITLES, { pretty_name: title });
  return id;
};

export const getDWTestUrl = ({ dwTestId, title }) => {
  if (process.env.NODE_ENV === 'production') {
    return `/abtesting/view/${title}/live/${dwTestId}`;
  }
  return `/abtesting/view/5682/dev/${dwTestId}`;
};

export const addDWTestId = async ({ testId, dwTestId }) =>
  axios.patch(`/expy/v1/tests/${testId}`, { dwTestId });

export const addDWTest = async testValues => {
  const id = getTestTitle({ title: testValues.title });
  const url =
    process.env.NODE_ENV === 'production'
      ? createApiUrl('abtesting/tests', id, 'live')
      : createApiUrl('abtesting/tests', 5682, 'dev');

  const newValues = formatData(testValues);
  const response = await axios.post(url, { ...newValues });
  const res = await addDWTestId({
    testId: testValues.id,
    dwTestId: response.data.testID,
  });
  return res.data.id;
};

const getExperimentBody = ({ test }) => {
  const body = {
    experiment_name: test.name,
    source_title_name: find(TEST_TITLES, { pretty_name: test.title }).name,
    source_title_id: find(TEST_TITLES, { pretty_name: test.title }).id,
    start_date: getKPIServiceDate(test.dateStart),
    end_date: getKPIServiceDate(test.dateEnd),
    start_timestamp: getUTCDate(test.dateStart) || null,
    end_timestamp: getUTCDate(test.dateEnd) || null,
    experiment_description: test.hypothesis,
  };

  const cohorts = test.treatments.map(c => ({
    cohort_name: c.name,
    cohort_size_percent: c.percentage,
    is_control: c.isControl,
    cohort_type: c.type,
  }));

  return {
    ...body,
    cohorts,
  };
};

export const addMatchmakingTest = async ({ test }) => {
  const body = getExperimentBody({ test });
  return axios.post(`/kpi-service-prod/experiments/create/matchmaking`, {
    ...body,
  });
};

export const addMachineLearningTest = async ({ test }) => {
  const body = getExperimentBody({ test });
  return axios.post(`/kpi-service-prod/experiments/create/machine_learning`, {
    ...body,
  });
};

export const addRecommenderTest = async ({ test }) => {
  const body = getExperimentBody({ test });
  return axios.post(`/kpi-service-prod/experiments/create/recommender`, {
    ...body,
  });
};

export const getInvalidFieldsErrorMsg = err => {
  const invalid = get(err, 'response.data.error.invalid', false);
  const mainMsg = get(err, 'response.data.error.msg', 'Error on create.');
  if (invalid && Array.isArray(invalid)) {
    const invalidMsgs = invalid.length > 3 ? invalid.slice(0, 3) : invalid;
    return [mainMsg, invalidMsgs.map(val => val.msg).join(' ')].join(' ');
  }
  return mainMsg;
};
