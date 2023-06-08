import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';

import { joinPath } from 'dw/core/helpers/path';
import { routes } from './routes';

import './index.css';

const ConnectionLogs = ({ match: { url } }) => {
  const rendered = [];
  routes.forEach(route => {
    const C = route.component;
    const path = joinPath(url, route.key);
    if (route.param) {
      rendered.push(
        <Route
          key={`${route.key}-with-param`}
          path={joinPath(path, route.param)}
          render={componentProps => <C {...componentProps} baseUrl={url} />}
        />
      );
    }
    rendered.push(
      <Route
        key={route.key}
        path={path}
        render={componentProps => <C {...componentProps} baseUrl={url} />}
      />
    );
  });
  const C = routes[0].component;
  rendered.push(
    <Route
      key="default"
      render={componentProps => <C {...componentProps} baseUrl={url} />}
    />
  );
  return (
    <section className="main-container flex-rows-container connection-logs">
      <Switch>{rendered}</Switch>
    </section>
  );
};

ConnectionLogs.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(ConnectionLogs);
