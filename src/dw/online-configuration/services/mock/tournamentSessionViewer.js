import range from 'lodash/range';
import random from 'lodash/random';
import uniqueId from 'lodash/uniqueId';

import { choice } from 'dw/core/helpers/random';

const createNewTournament = () => ({
  tournamentID: uniqueId('tournament_'),
  tournamentStart: 159999090999,
  tournamentKibanaLink: 'https://mm-kibana-prod.dw.net/search?q=01010101010',
});

const tournaments = range(10).map(() => createNewTournament());
const mockConnections = {
  data: {
    data: tournaments,
    nextPageToken: 'CAE',
  },
};

export const getTournaments = () =>
  new Promise(resolve => setTimeout(() => resolve(mockConnections), 2000));

// Original Data
// const createNewLobby = () => ({
//   thunderpantsUrl: null,
//   playlistId: null,
//   maxPlayers: null,
//   restrict: '',
//   gameMap: null,
//   gameId: null,
//   gameHasStarted: null,
//   id: 'None',
//   createdAt: null,
//   serverUserId: null,
//   listenServerInfo: null,
//   headers__type: null,
//   headers__datetime: '2019-08-08 07:03:29.339747',
//   timestamp_sec: 1565247809,
//   user_id: '0',
//   timestamp_millis: '1565247809339',
//   serverUserName: null,
//   roundId: 0,
//   gameMode: null,
//   gameIsInProgress: null,
//   lobbyHostOrder: [],
//   currentPlayerState: {},
//   isMergeSrc: null,
//   needForDedicatedServer: null,
//   datacenter: null,
//   minPlayers: null,
//   expectedPlayers: [],
//   teams: [],
//   isLobbyOpen: null,
//   tournamentId: ['5476875180417420961'],
//   isMergeDst: null,
//   buildName: null,
// });

// list = [
//   id,
//   isLobbyOpen,
//   serverUserId,
//   gameIsInProgress,
//   buildName,
//   currentPlayerState,
//   minPlayers,
//   needForDedicatedServer,
//   gameHasStarted,
//   createdAt,
//   gameMap,
//   restrict,
//   gameId,
// ];

// Session Viewer Data with Round
const createLobby = () => ({
  thunderpantsUrl: null,
  playlistId: '2147483647',
  maxPlayers: 4,
  restrict: 'test_tournamentState_1308597619',
  gameMap: null,
  gameId: null,
  gameHasStarted: null,
  id: `11925163806230787401${random(100)}`,
  createdAt: 1558049165914,
  roundId: 0,
  serverUserId: null,
  listenServerInfo: null,
  serverUserName: null,
  gameMode: null,
  gameIsInProgress: null,
  lobbyHostOrder: [],
  currentPlayerState: {
    '195985976531338014': 3,
    1234567890: 2,
    [`181906215561929883${random(100)}`]: 3,
    [`1082300582210228801${random(100)}`]: 3,
    [`1082300582210228801${random(100)}`]: 3,
    [`1082300582210228801${random(100)}`]: 3,
  },
  isMergeSrc: null,
  needForDedicatedServer: 'required',
  datacenter: null,
  minPlayers: 4,
  expectedPlayers: [
    '195985976531338014',
    '1234567890',
    '18190621556192988356',
    '10823005822102288010',
  ],
  teams: [[9096331856161337457], []],
  isLobbyOpen: choice([false, true]),
  isMergeDst: null,
  buildName: 'systemTestBuild',
});

const lobbyList = range(10).map(() => createLobby());

const mockLobbies = {
  data: {
    data: lobbyList,
    nextPageToken: 'CAI',
  },
};

export const getLobbies = () =>
  new Promise(resolve => setTimeout(() => resolve(mockLobbies), 2000));
