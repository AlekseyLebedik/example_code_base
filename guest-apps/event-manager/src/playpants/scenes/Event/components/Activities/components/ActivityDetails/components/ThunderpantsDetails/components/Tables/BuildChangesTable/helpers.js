import flatMap from 'lodash/flatMap';

const getObjectDiff = (oldObject, newObject, extraParam) => {
  const diffList = [];
  Object.entries(newObject).forEach(([key, value]) => {
    if (value !== oldObject[key]) {
      diffList.push({
        parameter: key,
        currentValue: oldObject[key],
        newValue: value,
        ...extraParam,
      });
    }
  });
  return diffList;
};

// Get diff of deployments. Expected object shape: { [server]: { want: bool, props: {} }}
const getDeploymentDiff = (oldDeployments, newDeployments, uid) =>
  flatMap(Object.entries(newDeployments), ([server, { want, props }]) => {
    const oldDeploymentBase = oldDeployments && oldDeployments[server];
    return [
      ...getObjectDiff(
        { want: oldDeploymentBase && oldDeploymentBase.want },
        { want },
        { server, uid }
      ),
      ...getObjectDiff(
        (oldDeploymentBase && oldDeploymentBase.props) || {},
        props,
        { server, uid }
      ),
    ];
  });

const extractBuildDiff = (buildList, scheduledBuilds) => {
  const diffList = flatMap(
    Object.entries(scheduledBuilds),
    ([uid, scheduledBuild]) => {
      const buildBase = buildList[uid];

      return [
        ...getObjectDiff(
          { description: buildBase.description },
          { description: scheduledBuild.description },
          { uid }
        ),
        ...getDeploymentDiff(
          buildBase.deployments,
          scheduledBuild.deployments,
          uid
        ),
      ];
    }
  );
  return diffList;
};

// Transform build array into object with uid as keys for faster access
const transformBuildArrayToObject = buildList => {
  const res = {};
  buildList.forEach(({ uid, ...restBuild }) => {
    res[uid] = restBuild;
  });
  return res;
};
export const parseBuildDifferences = (buildList, scheduledBuilds) => {
  const transformedBuildList = transformBuildArrayToObject(buildList);
  return extractBuildDiff(transformedBuildList, scheduledBuilds);
};
