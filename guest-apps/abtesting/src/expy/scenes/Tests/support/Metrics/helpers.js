import axios from 'dw/core/axios';
import filter from 'lodash/filter';

export const getDataByYear = (data, date) =>
  filter(data, d => {
    const endDate = new Date(d.dateEnd).getFullYear();
    return endDate === date;
  });

export const getTestData = async year => {
  const response = await axios.get('/expy/v1/tests');
  const { data } = response;
  const liveData = filter(data, d => d.status === 'Live');
  const proposalData = filter(data, d => d.status === 'Proposal');
  const doneOriginal = filter(data, d => d.status === 'Done');
  const doneFiltered = getDataByYear(doneOriginal, year);
  return { liveData, proposalData, doneOriginal, doneFiltered };
};
