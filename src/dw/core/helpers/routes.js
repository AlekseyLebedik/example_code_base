import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, generatePath } from 'react-router-dom';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import Error404 from 'dw/core/components/Error404';

const getRoutePath =
  (basePath, id, hideEnv) =>
  (route, params = null) => {
    const path = `/${basePath}/:${id}/${!hideEnv ? ':env/' : ''}${
      route.routePath || route.name
    }`;

    return params === null ? path : generatePath(path, params);
  };

export const RenderRoutes = ({ routes, basePath, id = 'titleId', hideEnv }) => {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { id: currentEnvID } = currentEnv || {
    id: undefined,
  };
  const routePath = getRoutePath(basePath, id, hideEnv);
  const rendered = routes.map(route => {
    if (typeof route.availabilityCheck === 'object') {
      const { target, fn } = route.availabilityCheck;
      let targetObj;
      switch (target) {
        case 'titleenv.current':
          if (!currentEnv) return true;
          targetObj = currentEnv;
          break;
        default:
      }
      if (targetObj && !fn(targetObj)) {
        return (
          <Route
            path={routePath(route)}
            component={Error404}
            key={route.parent ? `${route.parent}-${route.name}` : route.name}
          />
        );
      }
    }
    if (route.hasChilds) {
      return (
        <Route
          exact
          path={routePath(route)}
          render={({ match }) => {
            const firstChild = routes.find(r => r.parent === route.name);
            const redirectToRoute = {
              ...firstChild,
              routePath: firstChild.navPath || firstChild.routePath,
            };
            const redirectToPath = routePath(redirectToRoute, match.params);
            return <Redirect to={redirectToPath} />;
          }}
          key={route.parent ? `${route.parent}-${route.name}` : route.name}
        />
      );
    }
    const RenderComponent = route.component;
    return (
      <Route
        exact={route.exact || false}
        path={routePath(route)}
        render={props => {
          return <RenderComponent currentEnvID={currentEnvID} {...props} />;
        }}
        key={route.parent ? `${route.parent}-${route.name}` : route.name}
      />
    );
  });

  const defaultRoute = routes.find(r => r.default);
  if (defaultRoute !== undefined) {
    rendered.push(<Redirect to={routePath(defaultRoute)} key="default" />);
  }
  return <Switch>{rendered}</Switch>;
};

RenderRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
  id: PropTypes.string,
  hideEnv: PropTypes.bool,
};

RenderRoutes.defaultProps = {
  id: 'titleId',
  hideEnv: undefined,
};

export const renderRoutesSimple = routes =>
  Object.values(routes)
    .filter(route => route.component)
    .map(({ parent, ...route }) => <Route exact key={route.name} {...route} />);

export const routeTargetUrl = (route, id, envType, basePath) => {
  const urlTail =
    route.urlTail !== undefined
      ? route.urlTail
      : `${!route.navPath ? route.routePath || route.name : route.navPath}/`;
  return `/${basePath}/${id}/${envType ? `${envType}/` : ''}${urlTail}`;
};

export const RoutesContext = React.createContext({
  routes: [],
  basePath: null,
});
