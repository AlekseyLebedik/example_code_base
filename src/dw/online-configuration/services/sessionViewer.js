import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'lobbies';
const PLAYLISTS_RESOURCE = 'playlists';
const SERVERS_RESOURCE = 'servers';

export const getLobbies = params =>
  axios.get(createApiUrl(RESOURCE), { params });

export const getPlaylists = () => axios.get(createApiUrl(PLAYLISTS_RESOURCE));

export const getThunderpantsLink = serverID =>
  axios.get(createApiUrl(`${SERVERS_RESOURCE}/${serverID}`));

/* Uncomment the following line to use the API mock */
// export { getLobbies } from './mock/sessionViewer';
// export { getPlaylists } from './mock/sessionViewer';
