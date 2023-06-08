import moment from 'moment';

// Date Helper Functions
export const getPrettyDate = date => moment(date).format('MMM Do YYYY, hh:mma');
export const getDate = date => moment(date).format('MM/DD/YYYY');
export const getKPIServiceDate = date => moment(date).format('YYYY-MM-DD');
export const getUTCDate = date => moment(date).format();
export const getUnixTime = date => moment(date).valueOf();

export const isJSON = str => {
  if (typeof str !== 'string') {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
