export const relatedObjectTransform = relatedObjects =>
  relatedObjects.map(item => {
    const returnObj = {};
    if (item.companyId !== null) {
      Object.assign(returnObj, {
        ...item,
        type: 'companies',
        name: item.companyName,
        id: item.companyId,
      });
    }
    if (item.userId !== null) {
      Object.assign(returnObj, {
        ...item,
        type: 'users',
        name: item.userEmail,
        id: item.userId,
      });
    }
    if (item.companyGroupId !== null) {
      Object.assign(returnObj, {
        ...item,
        type: 'groups',
        name: item.companyGroupName,
        id: item.companyGroupId,
      });
    }
    return returnObj;
  });
