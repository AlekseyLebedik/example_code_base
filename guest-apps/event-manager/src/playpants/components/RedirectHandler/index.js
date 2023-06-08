import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import includes from 'lodash/includes';

const RedirectHandler = ({ matchParam, list, url, children }) =>
  includes(list, matchParam) ? Children.only(children) : <Redirect to={url} />;

RedirectHandler.propTypes = {
  matchParam: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
RedirectHandler.defaultProps = {
  matchParam: null,
};

export default RedirectHandler;
