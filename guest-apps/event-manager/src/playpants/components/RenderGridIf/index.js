import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const RenderGridIf = ({ check, renderFn, ...gridProps }) =>
  check ? <Grid {...gridProps}>{renderFn()}</Grid> : null;

RenderGridIf.propTypes = {
  check: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  renderFn: PropTypes.func.isRequired,
};
RenderGridIf.defaultProps = { check: false };

export default RenderGridIf;
