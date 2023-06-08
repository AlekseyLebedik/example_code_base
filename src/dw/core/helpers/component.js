import { connect as _connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

export function connect(stateToProps, dispatchToProps, component, mergeProps) {
  return compose(
    withRouter,
    _connect(stateToProps, dispatchToProps, mergeProps)
  )(component);
}
