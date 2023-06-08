import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

import './presentational.css';

const healthCheckComponent = (
  <div className="health-check__main-container">
    <span>
      <Icon>error</Icon> There are problems to connect with the API service.
    </span>
  </div>
);

const HealthCheckStateless = ({ visible }) => visible && healthCheckComponent;

HealthCheckStateless.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default HealthCheckStateless;
