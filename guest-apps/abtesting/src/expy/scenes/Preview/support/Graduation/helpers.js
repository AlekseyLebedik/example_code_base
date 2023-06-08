import axios from 'dw/core/axios';
import filter from 'lodash/filter';
import get from 'lodash/get';

export const formatErrorMsg = err => {
  const msg = get(
    err,
    'response.data.message',
    'Error saving. Please try again.'
  );
  return msg;
};

export const updateSummary = async ({ testId, value }) => {
  const formatValue = JSON.stringify(value);
  try {
    const response = await axios.put(`/expy/v1/graduation/${testId}`, {
      summary: formatValue,
    });
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

export const uploadFile = async ({ data }) => {
  try {
    const response = await axios.post(`/expy/v1/upload`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateFiles = async ({ testId, files }) => {
  try {
    const response = await axios.put(`/expy/v1/graduation/${testId}`, {
      files,
    });
    return response.data.test.files;
  } catch (err) {
    return err;
  }
};

export const updateDeleteFile = async ({ testId, fileId, filesState }) => {
  const newState = filter(filesState, f => f.id !== fileId);
  const response = await axios.put(`/expy/v1/graduation/${testId}`, {
    files: newState,
  });
  return response.data.test.files;
};
