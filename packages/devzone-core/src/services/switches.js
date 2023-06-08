import axios from '../axios';

export const getFeatureSwitches = () => axios.get(`/feature-switches/`);
