import axios from 'dw/core/axios';

export const fetchConfiguredProjects = ({ userTitlesId }) =>
  axios.get(`playpants/project-setting-group/?project__in=${userTitlesId}`);
