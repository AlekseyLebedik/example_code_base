import navigationBarMiddleware from './NavigationBar/middleware';
import componentsMiddlewares from './components/middlewares';

const middlewares = [...componentsMiddlewares, navigationBarMiddleware];

export default middlewares;
