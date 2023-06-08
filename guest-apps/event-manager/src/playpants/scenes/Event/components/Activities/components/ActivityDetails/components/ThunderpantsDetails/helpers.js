import { uuid } from '@demonware/devzone-core/helpers/uuid';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import sumBy from 'lodash/sumBy';
import unionWith from 'lodash/unionWith';

/**
 * Add a build to a build array without duplication.
 * @param {object[]} activityBuildList    - Array of builds
 * @param {{}} build                      - Single build
 */
export const addBuildToActivityBuildList = ({ activityBuildList, build }) =>
  unionWith(activityBuildList, [build], (l, r) => l.uid === r.uid);

/**
 *
 * @param {Object} deployment
 * @param {string} deployment.build_uid     - ID of build
 * @param {string} deployment.uid           - ID of deployment
 * @param {Object[]} type                   - Type of deployment ('modify' || 'undeploy')
 * @param {string} type.uid                 - ID of deployment
 */
export const isDeploymentInType = (deployment, type) =>
  some(type, typeEl => typeEl.uid === deployment.uid);

/**
 *
 * @param {Object} build
 * @param {Object[]} deploymentList         - List of deployments
 * @param {Object} scheduled                - Activity base
 * @param {Object[]} scheduled.undeploy     - List of undeployments
 * @param {Object[]} scheduled.modify       - List of modifications
 */
export const getLiveCount = (build, deploymentList, { undeploy, modify }) => {
  const liveDeployments = filter(
    deploymentList,
    deployment => build.uid === deployment.build_uid
  );
  return sumBy(liveDeployments, liveDeployment =>
    Number(
      !isDeploymentInType(liveDeployment, undeploy) &&
        !isDeploymentInType(liveDeployment, modify)
    )
  );
};

/**
 *
 * @param {Object} build
 * @param {Object[]} type       - List of deployment type ('undeploy' || 'modify')
 * @param {string} type.uid     - ID of deployment of type
 */
export const getTypeCount = (build, type) =>
  sumBy(type, typeEl => Number(typeEl.build_uid === build.uid));

/**
 * @param {Object} badges             - Map of badges
 * @param {number} badges.live        - # of live deployments
 * @param {number} badges.deploy      - # of scheduled deployments
 * @param {number} badges.undeploy    - # of scheduled undeployments
 * @param {number} badges.modify      - # of scheduled modifications
 */
export const sumBadgeWeights = badges =>
  Object.entries(badges).reduce((accum, [key, value]) => {
    if (key === 'deprecated') return accum;
    return key === 'live' ? accum + value : accum + value * 100;
  }, 0);

const parseBuildListByFilter = (buildList, scheduled, filterType) => {
  const buildsToDisplay = [];
  Object.values(scheduled).map(scheduledEl =>
    scheduledEl.forEach(({ build_uid: buildUID }) => {
      if (!includes(buildsToDisplay, buildUID)) {
        buildsToDisplay.push(buildUID);
      }
    })
  );
  return filterType !== 'default'
    ? filter(buildList, ({ uid }) => includes(buildsToDisplay, uid))
    : buildList;
};

/**
 * @param {Object[]} filteredDeployments
 * @param {Object} scheduled
 * @param {Object} scheduled.deploy           - Scheduled deployments
 * @param {Object} scheduled.undeploy         - Scheduled undeployments
 * @param {Object} scheduled.modify           - Scheduled modifications
 * @param {string} uid                        - ID of build
 */
export const formatBuildDetails = (
  filteredDeployments,
  { deploy, undeploy, modify },
  uid
) => {
  const parsedLive = filteredDeployments.reduce((accum, filteredEl) => {
    let payload;
    if (isDeploymentInType(filteredEl, undeploy)) {
      payload = { ...filteredEl, type: 'undeploy' };
    } else if (isDeploymentInType(filteredEl, modify)) {
      payload = {
        ...filteredEl,
        ...modify.find(modification => modification.uid === filteredEl.uid),
        type: 'modify',
      };
    } else {
      payload = { ...filteredEl, type: 'live' };
    }
    return [...accum, payload];
  }, []);

  const parsedDeployments = deploy.reduce(
    (accum, deployEl) =>
      deployEl.build_uid === uid
        ? [...accum, { ...deployEl, type: 'deploy' }]
        : accum,
    []
  );

  return [...parsedLive, ...parsedDeployments];
};

export const constructBuildList = ({
  buildList,
  deploymentList,
  filterType,
  scheduled,
}) => {
  const deprecatedBuildsFromLive = [
    ...deploymentList,
    ...scheduled.deploy,
    ...scheduled.undeploy,
    ...scheduled.modify,
  ].reduce(
    (accum, { build_uid: buildUID, tp: { auto_tag: { build } = {} } = {} }) =>
      buildList.length &&
      !buildList.find(buildEl => buildEl.uid === buildUID) &&
      !accum.find(accumEl => accumEl.uid === buildUID)
        ? [...accum, { ...build, deprecated: true }]
        : accum,
    []
  );
  const collatedBuildList = [...buildList, ...deprecatedBuildsFromLive];

  return parseBuildListByFilter(collatedBuildList, scheduled, filterType).map(
    build => ({
      ...build,
      badges: {
        deprecated: build.deprecated,
        live: getLiveCount(build, deploymentList, scheduled),
        deploy: getTypeCount(build, scheduled.deploy),
        undeploy: getTypeCount(build, scheduled.undeploy),
        modify: getTypeCount(build, scheduled.modify),
      },
      deployments: formatBuildDetails(
        filter(
          deploymentList,
          ({ build_uid: buildUID }) => buildUID === build.uid
        ),
        scheduled,
        build.uid
      ),
    })
  );
};

export const parseModifyFormData = ({
  build_uid: buildUID,
  lock,
  target_name: targetName,
  type,
  uid,
  user_params: userParams,
}) => ({
  ...userParams,
  build_uid: buildUID,
  lock,
  deploymentType: type,
  target: { [targetName]: true },
  uid,
});

const reduceUserParamValues = userParams =>
  Object.entries(userParams).reduce(
    (accum, [key, value]) => ({ ...accum, [key]: value.value }),
    {}
  );

export const parseLockData = lock =>
  Object.entries(lock).reduce(
    (accum, [key, val]) => ({ ...accum, [key]: val.value }),
    {}
  );

export const parseDeployData = ({ buildData, buildUID, target, userParams }) =>
  Object.entries(target.value).reduce(
    (accum, [name, value]) =>
      value
        ? [
            ...accum,
            {
              build_uid: buildUID,
              target_name: name,
              uid: `${uuid()}-${name}`,
              user_params: reduceUserParamValues(userParams),
              tp: {
                auto_tag: {
                  build: { ...buildData },
                },
              },
            },
          ]
        : accum,
    []
  );

export const parseModifyData = ({
  buildData,
  buildUID,
  deployments = [],
  target,
  uid,
  userParams,
}) => {
  const payload = {
    build_uid: buildUID,
    target_name: Object.keys(target.value)[0],
    uid,
    user_params: reduceUserParamValues(userParams),
    tp: {
      auto_tag: {
        build: { ...buildData },
      },
    },
  };

  const index = deployments.findIndex(
    deployment => deployment.uid === payload.uid
  );

  if (index >= 0) {
    deployments.splice(index, 1, payload);
  } else {
    deployments.push(payload);
  }

  return deployments;
};

export const isDeployerViable = ({ deployer, deployerList }) =>
  isEmpty(deployer) ||
  deployerList.some(deployerEl => deployerEl.id === deployer.id);
