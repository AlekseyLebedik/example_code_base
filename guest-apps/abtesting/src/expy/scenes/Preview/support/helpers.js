import axios from 'dw/core/axios';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import filter from 'lodash/filter';

import { setActiveTestApprovers } from '../state/actions';

export const fetchSlackUsers = async () => {
  try {
    const response = await axios.get('/expy/v1/slack/user');
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getSelectedIds = ({ options, selected }) => {
  const users = flatten(map(selected, s => filter(options, o => o.name === s)));
  const formatUsers = map(users, u => ({ slackId: u.slackId, name: u.name }));
  return formatUsers;
};

export const sendNotify = async ({ options, selected, testId }) => {
  const promises = map(getSelectedIds({ options, selected }), async r => {
    try {
      const response = await axios.post(
        `/expy/v1/tests/${testId}/slack/notify`,
        { recipientId: r.slackId, recipientName: r.name }
      );
      return response.data;
    } catch (err) {
      return { status: 'error', details: err };
    }
  });
  const results = await Promise.all(promises);
  return results;
};

export const sendApproval = async ({ options, selected, testId }) => {
  const promises = map(getSelectedIds({ options, selected }), async r => {
    try {
      const response = await axios.post(
        `/expy/v1/tests/${testId}/slack/approval`,
        { recipientId: r.slackId, recipientName: r.name }
      );
      return response.data;
    } catch (err) {
      return { status: 'error', details: err };
    }
  });
  const results = await Promise.all(promises);
  return results;
};

export const getApproversStatuses = async ({ testId }) => {
  try {
    const response = await axios.get(
      `/expy/v1/tests/${testId}/approvers-statuses`
    );
    const { data } = response;
    return data;
  } catch (err) {
    return { status: 'error', details: err };
  }
};
export const updateActiveTestApprovers =
  ({ testId }) =>
  async dispatch => {
    try {
      const response = await axios.get(
        `/expy/v1/tests/${testId}/approvers-statuses`
      );
      const { data } = response;
      return dispatch(setActiveTestApprovers({ data }));
    } catch (err) {
      return { status: 'error', details: err };
    }
  };
