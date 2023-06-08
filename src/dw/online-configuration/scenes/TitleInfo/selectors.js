import get from 'lodash/get';

import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const getTitleInfoSelector = createSelector(
  state => state.Scenes.TitleInfo.titleInfo,
  formatDateTimeSelector,
  (titleInfo, formatDateTime) => {
    const { mmp } = titleInfo;
    if (!mmp) return titleInfo;
    return {
      ...titleInfo,
      mmp: {
        ...mmp,
        gitDate: formatDateTime(mmp.gitDate),
      },
    };
  }
);

const na = 'N/A';
const getVal = (obj, key) => get(obj, key, na);
const getStats = (stats, name) =>
  (stats && stats[name] && Number(stats[name]).toLocaleString()) || na;
const geVersion = obj => getVal(obj, 'version') || na;
const getEndpoint = (env, name) => getVal(env, name) || na;

export const getTitleInfoGridData = createSelector(
  getTitleInfoSelector,
  ({
    env,
    mmp,
    marketplace,
    stats,
    achievements,
    cluster,
    objectstore,
    matchmaking,
    socialservice,
  }) => {
    const servicesGroup = 'Services';
    const statisticsGroup = 'Statistics';
    const clusterGroup = 'Cluster/Endpoints';
    const gitGroup = 'Git/Python';
    let data = [
      {
        group: servicesGroup,
        name: 'AE',
        value: geVersion(achievements),
      },
      {
        group: servicesGroup,
        name: 'Auth',
        value:
          env &&
          env.authConnectionUrl &&
          env.authConnectionUrl.includes('auth3')
            ? 'auth3'
            : 'auth2',
      },
      {
        group: servicesGroup,
        name: 'Marketplace',
        value: geVersion(marketplace),
      },
      {
        group: servicesGroup,
        name: 'MMP',
        value: getVal(mmp, 'mmpVersion'),
      },
    ];
    if (objectstore && objectstore.configured) {
      data.push({
        group: servicesGroup,
        name: 'ObjectStore',
        value: geVersion(objectstore),
      });
    }
    data = data.concat([
      {
        group: servicesGroup,
        name: 'WebServices',
        value: getVal(mmp, 'wsVersion'),
      },
      {
        group: servicesGroup,
        name: 'Social Service',
        value: geVersion(socialservice),
      },
    ]);
    if (matchmaking && matchmaking.version) {
      data.push({
        group: servicesGroup,
        name: 'MMOptimizer',
        value: geVersion(matchmaking),
      });
    }
    data = data.concat([
      {
        group: statisticsGroup,
        name: 'Users Online',
        value: getStats(stats, 'onlineUserCount'),
      },
      {
        group: statisticsGroup,
        name: 'Games Online',
        value: getStats(stats, 'onlineGamesCount'),
      },
      {
        group: statisticsGroup,
        name: 'Registered Users',
        value: getStats(stats, 'userCount'),
      },
      {
        group: clusterGroup,
        name: 'Title Env Locked',
        value: getVal(env, 'locked') ? 'Yes' : 'No',
      },
      {
        group: clusterGroup,
        name: 'Cluster',
        value: getVal(cluster, 'name'),
      },
      {
        group: clusterGroup,
        name: 'LSG Subcluster',
        value: getVal(cluster, 'primaryLsg'),
      },
      {
        group: clusterGroup,
        name: 'Auth Cluster',
        value: getVal(cluster, 'primaryAuth'),
      },
      {
        group: clusterGroup,
        name: 'LSG Endpoint',
        value: getEndpoint(env, 'lsgConnectionUrl'),
      },
      {
        group: clusterGroup,
        name: 'Webservices Endpoint',
        value: getEndpoint(env, 'webserviceConnectionUrl'),
      },
      {
        group: clusterGroup,
        name: 'Title-Services Endpoint',
        value: getEndpoint(cluster && env, 'webzoneEndpointUrl'),
      },
      {
        group: clusterGroup,
        name: 'Login Queue Endpoint',
        value: getEndpoint(cluster && env, 'loginQueueUrl'),
      },
      {
        group: clusterGroup,
        name: 'Login Queue Webservice Endpoint',
        value: getEndpoint(cluster && env, 'loginQueueWebserviceUrl'),
      },
      {
        group: gitGroup,
        name: 'Git Revision',
        value: getVal(mmp, 'gitRevision'),
      },
      {
        group: gitGroup,
        name: 'Git Revision Time',
        value: getVal(mmp, 'gitDate'),
      },
      {
        group: gitGroup,
        name: 'Git Branch',
        value: getVal(mmp, 'gitBranch'),
      },
      {
        group: gitGroup,
        name: 'Python Branch',
        value: getVal(mmp, 'pythonBranch'),
      },
    ]);
    return data;
  }
);
