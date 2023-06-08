import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const NavLink = ({ url, children, ...props }) => {
  let LinkComponent = RouterLink;
  let linkOptions = {
    to: url,
  };
  if (url.startsWith('http://') || url.startsWith('https://')) {
    LinkComponent = Link;
    linkOptions = {
      href: url,
    };
  }

  return (
    <LinkComponent {...linkOptions} {...props}>
      {children}
    </LinkComponent>
  );
};

NavLink.propTypes = {
  url: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
NavLink.defaultProps = {
  url: '#',
  children: <></>,
};

export default NavLink;
