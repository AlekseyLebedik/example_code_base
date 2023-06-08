import axios from '../axios';

export const fetchNextUrl = next => axios.get(next);
