import range from 'lodash/range';
import random from 'lodash/random';

const createNewConnectionLog = () => ({
  username: 'whatever',
  updateTime: random(1554126425, 1554196425),
  success: Math.round(random(0, 1)),
  connectionID: random('2735811413659257221', '2735811413669257221'),
  userID: random('7565529357460614737', '7565529357460614737'),
  consoleID: random('327370', '357370'),
  internalAddr: '138.182.201.15',
  externalAddr: '36.121.104.165',
});
const connectionList = range(200).map(() => createNewConnectionLog());
const mockConnections = {
  data: {
    nextPageToken: null,
    data: connectionList,
  },
};

export const getConnectionLogsByUser = () =>
  new Promise(resolve => setTimeout(() => resolve(mockConnections), 2000));
