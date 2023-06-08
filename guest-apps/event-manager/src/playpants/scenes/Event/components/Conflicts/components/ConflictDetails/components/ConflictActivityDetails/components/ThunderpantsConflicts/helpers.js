export const getThunderpantsConflicts = (activity, details) =>
  details.reduce((accum, detailEl) => {
    const matchingDeployment =
      activity[detailEl.type].find(({ uid }) => uid === detailEl.uid) &&
      detailEl;
    return matchingDeployment ? [...accum, matchingDeployment] : accum;
  }, []);
