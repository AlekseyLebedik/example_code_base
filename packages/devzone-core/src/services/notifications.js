import axios from '../axios';

export const getReleaseNotes = () => axios.get('release-notes/');
export const getMaintenance = endTime =>
  axios.get('/maintenance/', {
    params: {
      end_time: endTime,
      status: 'started',
    },
  });
export const getCriticalEvents = endTime =>
  axios.get('/critical-events/', {
    params: { endTime },
  });
