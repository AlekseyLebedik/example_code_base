export const relatedObjectTransform = relatedObjects =>
  relatedObjects.map(item => {
    const returnObj = {};
    if (item.companyId !== null) {
      Object.assign(returnObj, {
        ...item,
        type: 'company',
        name: item.companyName,
      });
    }
    if (item.userId !== null) {
      Object.assign(returnObj, { ...item, type: 'user', name: item.userEmail });
    }
    if (item.companyGroupId !== null) {
      Object.assign(returnObj, {
        ...item,
        type: 'group',
        name: item.companyGroupName,
      });
    }
    return returnObj;
  });
