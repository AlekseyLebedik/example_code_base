import React from 'react';
import PropTypes from 'prop-types';
import { ReactHighstock } from 'dw/core/helpers/highcharts';

const GraphsStatelessComponent = ({ getRef, config }) => (
  <ReactHighstock config={config} ref={getRef} />
);

GraphsStatelessComponent.propTypes = {
  getRef: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

export default GraphsStatelessComponent;
