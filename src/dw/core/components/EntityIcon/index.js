import React from 'react';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';

const ICONS = {
  groups: 'group',
  companies: 'domain',
  users: 'person',
};

const EntityIcon = ({ type }) => <Icon>{ICONS[type]}</Icon>;

export default EntityIcon;

EntityIcon.propTypes = {
  type: PropTypes.string,
};

EntityIcon.defaultProps = {
  type: '',
};
