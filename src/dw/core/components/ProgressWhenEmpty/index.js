import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import './index.css';

const evaluate = props => {
  const isUndefinedOrEmpty = prop => {
    if (Array.isArray(prop)) {
      return prop.length === 0;
    }
    return prop === undefined || prop === null;
  };

  return props.every(isUndefinedOrEmpty);
};

const ProgressWhenEmpty = props => {
  const showProgress = evaluate(props.propsToEval);
  return showProgress ? (
    <CircularProgress
      className="progress-when-empty__container"
      size={props.size}
      thickness={props.thickness}
    />
  ) : (
    props.children
  );
};

ProgressWhenEmpty.propTypes = {
  propsToEval: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  children: PropTypes.node,
};

ProgressWhenEmpty.defaultProps = {
  children: undefined,
};

export default ProgressWhenEmpty;
