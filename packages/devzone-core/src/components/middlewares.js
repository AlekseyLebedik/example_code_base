import globalProgressMiddleware from './GlobalProgress/middleware';
import globalSnackBarMiddleware from './GlobalSnackBar/middleware';

const middlewares = [globalProgressMiddleware, globalSnackBarMiddleware];

export default middlewares;
