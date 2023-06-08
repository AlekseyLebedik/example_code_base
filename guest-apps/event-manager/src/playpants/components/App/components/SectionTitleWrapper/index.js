import 'regenerator-runtime/runtime';
import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router-dom';
import capitalize from 'lodash/capitalize';

export const SectionTitleContext = createContext();

const getFindRouteFn = (path, baseUrl, routes) => {
  // eslint-disable-next-line
  for (const route of routes) {
    const match = matchPath(path, {
      path: `${baseUrl}/${route.routePath}`,
      exact: route.hasOwnProperty('exact') ? route.exact : false,
    });
    if (match) {
      const subSectionTitle = Object.values(match.params)
        .filter(v => v)
        .map(v => capitalize(v))
        .join(' | ');

      return { sectionTitle: route.name, subSectionTitle };
    }
  }
  return null;
};

const SectionTitleWrapper = ({ routes, location, match, ...props }) => {
  const section = useMemo(
    () =>
      getFindRouteFn(location.pathname, match.url, routes) || {
        sectionTitle: 'Devzone',
        subSectionTitle: '',
      },
    [location, routes]
  );

  return <SectionTitleContext.Provider {...props} value={section} />;
};

SectionTitleWrapper.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.object,
  match: PropTypes.object,
};

SectionTitleWrapper.defaultProps = {
  routes: [],
  location: {},
  match: {},
};

export default withRouter(SectionTitleWrapper);
