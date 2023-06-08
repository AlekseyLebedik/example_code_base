import axios from 'dw/core/axios';

export const fetchTags = () => axios.get('/tags/');

export const fetchNext = next => axios.get(next);
