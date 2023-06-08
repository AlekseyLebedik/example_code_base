// import uniqueId from 'lodash/uniqueId';
// import range from 'lodash/range';

// import { choice } from 'dw/core/helpers/random';

// const createContext = id =>
//   choice([
//     {
//       id,
//       name: 'ps4',
//       platform: 'ps4',
//       userSelectable: true,
//       description: 'PS4 context context context context context context - 54',
//       type: 'Platform',
//     },
//     {
//       id,
//       name: 'admin',
//       userSelectable: false,
//       description: 'Crossplay admin context',
//       type: 'Title',
//     },
//     {
//       id,
//       name: 'xbox',
//       platform: 'xbox',
//       userSelectable: true,
//       description: 'Xbox context',
//       type: 'Platform',
//     },
//     {
//       id,
//       name: 'pc-bnet',
//       platform: 'pc-bnet',
//       userSelectable: true,
//       description: 'Battle.net context',
//       type: 'Platform',
//     },
//   ]);

// const mockAvailableContexts = {
//   nextToken: null,
//   data: {
//     data: range(4).map(() => createContext(uniqueId())),
//   },
// };

export const fetchContextsForService = ({ titleId, env, service, eTag }) => {
  const mockedData = {
    nextToken: null,
    data: {
      data: [
        {
          id: 1,
          name: 'ps4',
          platform: 'ps4',
          userSelectable: true,
          description:
            'PS4 context context context context context context - 54',
          type: 'Platform',
        },
        {
          id: 2,
          name: 'admin',
          userSelectable: false,
          description: 'Crossplay admin context',
          type: 'Title',
        },
        {
          id: 3,
          name: 'xbox',
          platform: 'xbox',
          userSelectable: true,
          description: 'Xbox context',
          type: 'Platform',
        },
        {
          id: 4,
          name: 'pc-bnet',
          platform: 'pc-bnet',
          userSelectable: true,
          description: 'Battle.net context',
          type: 'Platform',
        },
      ],
    },
  };
  console.log(
    `Mocked data for TitleId ${titleId}, Environment ${env} and service ${service}, with eTag ${eTag}: `,
    mockedData
  );
  return new Promise(resolve => setTimeout(() => resolve(mockedData), 2000));
};
