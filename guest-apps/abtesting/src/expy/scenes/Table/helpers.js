import axios from 'dw/core/axios';

import map from 'lodash/map';
import zipWith from 'lodash/zipWith';

import {
  fetchTestsPending,
  fetchTestsSuccess,
  fetchTestsError,
} from './state/actions';

export const fetchAllTests = () => async dispatch => {
  dispatch(fetchTestsPending());
  try {
    const allTestsResponse = await axios.get('/expy/v1/tests');
    const allTests = allTestsResponse.data;

    const promises = await map(allTests, async d => {
      const response = await axios.get(
        `/expy/v1/tests/${d.id}/approvers-statuses`
      );
      const { data } = response;
      const formatData = map(data, approver => ({
        testId: approver.testId,
        name: approver.name,
        approverId: approver.approverId,
        status: approver.status,
        input: approver.input,
        slackProfileImg: approver.slackProfileImg,
      }));
      return { approvers: formatData };
    });
    const approversWithStatuses = await Promise.all(promises);
    const merge = (arr1, arr2) => ({ ...arr1, ...arr2 });
    const allTestsData = zipWith(allTests, approversWithStatuses, merge);
    dispatch(fetchTestsSuccess(allTestsData));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Fetch tests error: ', err);
    dispatch(fetchTestsError('Error: Cannot load tests.'));
  }
};
