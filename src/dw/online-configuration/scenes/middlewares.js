import { middlewares as onlineGamesMiddlewares } from './OnlineGames/middlewares';
import { middlewares as accountsMiddlewares } from './Accounts/middlewares';

export default [...onlineGamesMiddlewares, ...accountsMiddlewares];
