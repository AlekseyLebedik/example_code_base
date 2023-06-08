import axios from '../axios';

export const getContentTypes = () => axios.get('ctypes/');
