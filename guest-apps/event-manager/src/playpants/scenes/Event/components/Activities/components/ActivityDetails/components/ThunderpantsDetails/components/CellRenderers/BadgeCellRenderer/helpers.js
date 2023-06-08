export const removeFalseyCountValues = counts =>
  Object.entries(counts).reduce(
    (accum, [key, val]) => (val ? { ...accum, [key]: val } : accum),
    {}
  );

export const setTooltipText = key => {
  switch (key) {
    case 'live': {
      return 'Live Builds';
    }
    case 'deploy': {
      return 'Build Deployments';
    }
    case 'undeploy': {
      return 'Build Undeployments';
    }
    case 'modify': {
      return 'Modifications';
    }
    default: {
      return '';
    }
  }
};
