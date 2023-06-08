import 'regenerator-runtime/runtime';
import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router-dom';

export const SectionTitleContext = createContext();

const getFindRouteFn = path => {
  const findRoute = items => {
    // eslint-disable-next-line
    for (const item of items) {
      if (item.items) {
        const route = findRoute(item.items.map(i => ({ ...i, parent: item })));
        if (route) {
          return typeof route === 'string'
            ? {
                section: (item.matchParentInstead && item.parent) || item,
                subSection: route,
              }
            : route;
        }
      } else {
        const match = matchPath(path, {
          path: item.path || item.url,
          exact: item.hasOwnProperty('exact') ? item.exact : false,
        });
        if (match) return item.title;
      }
    }
    return null;
  };
  return findRoute;
};

const SectionTitleWrapper = ({ routes, location, ...props }) => {
  const section = useMemo(
    () =>
      getFindRouteFn(location.pathname)(routes) || {
        section: { items: [], title: 'Devzone' },
      },
    [location, routes]
  );

  return <SectionTitleContext.Provider {...props} value={section} />;
};

SectionTitleWrapper.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object,
};

SectionTitleWrapper.defaultProps = {
  routes: [],
  location: {},
};

export default withRouter(SectionTitleWrapper);
