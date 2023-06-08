import { applyMiddleware as _applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

export function applyMiddleware(storeName, middlewares) {
  const composeEnhancers = composeWithDevTools({
    name: storeName,
    actionsBlacklist: ['HEALTH_'],
  });

  return composeEnhancers(_applyMiddleware(...middlewares));
}

export default applyMiddleware;
