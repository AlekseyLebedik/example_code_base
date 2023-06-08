import axios from 'dw/core/axios';

export const fetchNextUrl = next => axios.get(next);
