import { BASE_URL } from 'dw/config';
import axios from 'dw/core/axios';

const RESOURCE = 'healthcheck';

export const beat = () => axios.get(`${BASE_URL}/${RESOURCE}/`);
