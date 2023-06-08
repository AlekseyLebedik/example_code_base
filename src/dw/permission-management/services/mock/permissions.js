export const groups = {
  data: {
    nextPageToken: 'AABkAAAAAAAAAGQAAAAAAAAA',
    data: [
      {
        id: 1,
        name: 'acme-group-1',
        company: 1,
      },
      {
        id: 2,
        name: 'acme-group-2',
        company: 1,
      },
      {
        id: 3,
        name: 'acme-group-3',
        company: 1,
      },
    ],
  },
};

export const objectPermissionsGroups = {
  data: {
    nextPageToken: null,
    data: [
      {
        id: 1,
        permissionId: 100,
        contentTypeId: 1,
        objectPk: 10000,
      },
      {
        id: 4,
        permissionId: 100,
        contentTypeId: 1,
        objectPk: 10002,
      },
      {
        id: 5,
        permissionId: 100,
        contentTypeId: 1,
        objectPk: 10003,
      },
      {
        id: 2,
        permissionId: 100,
        contentTypeId: 2,
        objectPk: 10002,
      },
      {
        id: 3,
        permissionId: 199,
        contentTypeId: 2,
        objectPk: 10002,
      },
    ],
  },
};

export const contentTypes = {
  data: {
    nextPageToken: null,
    data: [
      {
        id: 1,
        appLabel: 'my-app',
        model: 'project',
        Links: {
          self: {
            href: '/ctypes/1/objects/',
          },
        },
      },
      {
        id: 2,
        appLabel: 'my-app2',
        model: 'titleenv',
        Links: {
          self: {
            href: '/ctypes/2/objects/',
          },
        },
      },
      {
        id: 3,
        appLabel: 'my-app3',
        model: 'dashboard',
        Links: {
          self: {
            href: '/ctypes/2/objects/',
          },
        },
      },
    ],
  },
};

export const contentTypeDetails = {
  data: {
    nextPageToken: null,
    data: [
      {
        id: 10000,
        name: 'Gran tourism Project',
        shortCode: 'GTR',
      },
      {
        id: 10002,
        name: 'Project 2',
        shortCode: 'GTR2',
      },
      {
        id: 10003,
        name: 'Project 3',
        shortCode: 'GTR3',
      },
      {
        id: 10004,
        name: 'Project 4',
        shortCode: 'GTR4',
      },
    ],
  },
};

export const permissions = {
  data: {
    nextPageToken: null,
    data: [
      {
        id: 100,
        name: 'Reset leaderboards',
        codename: 'reset_leaderboards',
        contentTypeId: 1,
        _links: {
          self: {
            href: '/permissions/1',
          },
        },
      },
      {
        id: 199,
        name: 'Admin Permissions',
        codename: 'admin_perm',
        contentTypeId: 2,
        _links: {
          self: {
            href: '/permissions/2',
          },
        },
      },
    ],
  },
};

export const fetchGroups = () =>
  new Promise(resolve => setTimeout(() => resolve(groups), 1));

export const getObjectPermissionsById = () =>
  new Promise(resolve => setTimeout(() => resolve(objectPermissionsGroups), 1));

export const getContentTypes = () =>
  new Promise(resolve => setTimeout(() => resolve(contentTypes), 1));

export const getContentTypeDetail = () =>
  new Promise(resolve => setTimeout(() => resolve(contentTypeDetails), 1));

export const getPermissionsByContentType = () =>
  new Promise(resolve => setTimeout(() => resolve(permissions), 1));
