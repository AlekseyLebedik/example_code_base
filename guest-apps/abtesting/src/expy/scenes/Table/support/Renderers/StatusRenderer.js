import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../../../../components/Badge';

const StatusRenderer = props => (
  <Badge withBullet color={props.value.toLowerCase()}>
    {props.value}
  </Badge>
);

StatusRenderer.propTypes = {
  value: PropTypes.string,
};

StatusRenderer.defaultProps = {
  value: '',
};

export default StatusRenderer;
