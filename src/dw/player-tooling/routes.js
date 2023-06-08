import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncPlayerAccounts = AsyncComponent(() =>
  import(
    /* webpackChunkName: "PlayerAccounts" */ 'dw/player-tooling/scenes/PlayerAccounts/'
  )
);
const AsyncGameData = AsyncComponent(() =>
  import(
    /* webpackChunkName: "GameData" */ 'dw/player-tooling/scenes/GameData/'
  )
);

export const ROUTES = {
  playerAccounts: {
    name: 'playerAccounts',
    title: 'Player Accounts Lookup',
    path: '/player/accounts/:id?',
    navPath: '/player/accounts',
    routePath: '/player/accounts/:id?',
    component: AsyncPlayerAccounts,
    mainRoute: true,
    default: true,
  },
  gameData: {
    name: 'gameData',
    title: 'Game Data',
    path: '/player/game-data/:id?',
    navPath: '/player/game-data',
    routePath: '/player/game-data/:id?',
    component: AsyncGameData,
    mainRoute: true,
  },
};
