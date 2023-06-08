import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import queryString from 'query-string';

import { getReactBaseURL } from 'dw/core/helpers/title-env-selectors';
import { hasData } from 'dw/core/helpers/object';

const stateToProps = (state, { baseUrl, ...ownProps }) => ({
  baseUrl: getReactBaseURL(state, { baseUrl }),
  ownProps,
});

const RouteLink = ({
  baseUrl,
  ownProps: {
    routeName,
    routes = [],
    linkParams = {},
    queryParams = {},
    linkName,
    store,
    ...props
  },
}) => {
  const route = routes.find(r => r.name === routeName);
  if (!route) return linkName;
  const routePath = `${baseUrl}${route.routePath}`;
  let url = generatePath(routePath, linkParams);
  if (hasData(queryParams)) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }
  return (
    <Link {...props} to={url}>
      {linkName}
    </Link>
  );
};

RouteLink.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  ownProps: PropTypes.shape({
    routeName: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object),
    linkParams: PropTypes.object,
    queryParams: PropTypes.object,
    linkName: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
  }),
};

RouteLink.defaultProps = {
  ownProps: {},
};

export default connect(stateToProps)(RouteLink);
