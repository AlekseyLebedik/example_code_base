import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'tournaments';

export const getTournaments = params =>
  axios.get(createApiUrl(RESOURCE), { params });

export const getLobbies = params =>
  axios.get(`${createApiUrl(RESOURCE)}${params.tournamentID}/lobbies`);

// export { getTournaments } from './mock/tournamentSessionViewer';
// export { getLobbies } from './mock/tournamentSessionViewer';
