import axios from 'dw/core/axios';
import { AUTH_CLIENT, COREVIZ_HOST } from '@demonware/devzone-core/config';
import {
  fetchActiveTestPending,
  fetchActiveTestSuccess,
  fetchActiveTestError,
} from './state/actions';
import { pdfFileType, pptxFileType, pptFileType } from '../../constants';

export const fetchActiveTest = testId => async dispatch => {
  dispatch(fetchActiveTestPending());
  try {
    const response = await axios.get(`/expy/v1/tests/${testId}`);
    if (response.status === 500) return dispatch(fetchActiveTestError());
    if (response.status === 204) return dispatch(fetchActiveTestError());

    const { data } = response;
    return dispatch(fetchActiveTestSuccess(data));
  } catch (err) {
    return dispatch(fetchActiveTestError());
  }
};

export const fetchTreatmentImage = async name => {
  try {
    const response = await axios.get(`/expy/v1/images/${name}`, {
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    if (type === pdfFileType) {
      const url = URL.createObjectURL(
        new Blob([response.data], { type: pdfFileType })
      );
      return { type, url };
    }

    if (type === pptxFileType) {
      const url = URL.createObjectURL(
        new Blob([response.data], {
          type: pptxFileType,
        })
      );
      return { type, url };
    }

    if (type === pptFileType) {
      const url = URL.createObjectURL(
        new Blob([response.data], { type: pptFileType })
      );
      return { type, url };
    }

    const url = URL.createObjectURL(new Blob([response.data]));
    return { type, url };
  } catch (err) {
    return err;
  }
};

export const getIframeUrl = ({ testName }) => {
  const token = JSON.parse(
    sessionStorage.getItem('devzone-auth-access-token')
  ).accessToken;
  const formatToken = token.replace('Bearer ', '');
  return `${COREVIZ_HOST}/embedded/queries/2425/visualizations/2792?experiment=${encodeURI(
    testName
  )}#accessToken=${formatToken}&clientId=${AUTH_CLIENT}`;
};
