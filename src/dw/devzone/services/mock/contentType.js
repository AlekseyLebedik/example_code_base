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

export const getContentTypes = () =>
  new Promise(resolve => setTimeout(() => resolve(contentTypes), 2000));
