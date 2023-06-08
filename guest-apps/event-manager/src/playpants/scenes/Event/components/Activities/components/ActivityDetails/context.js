import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { activityContextValuesSelector } from './selectors';
import { updateActivity } from '../../actions';

const ActivityContext = createContext();

const useActivityContext = () => useContext(ActivityContext);

const ActivityProvider = ({ children, contextValues, onUpdate }) => (
  <ActivityContext.Provider value={{ ...contextValues, onUpdate }}>
    {children}
  </ActivityContext.Provider>
);

ActivityProvider.propTypes = {
  children: PropTypes.node.isRequired,
  contextValues: PropTypes.shape({
    activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
    noTitleSelected: PropTypes.bool.isRequired,
    selectedActivity: PropTypes.object.isRequired,
    selectedTitle: PropTypes.object,
    disabled: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { children, ...props }) => ({
  contextValues: activityContextValuesSelector(state, props),
  children,
});

const mapDispatchToProps = dispatch => ({
  onUpdate: bindActionCreators(updateActivity, dispatch),
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  ...propsFromState,
  ...propsFromDispatch,
  onUpdate: updatedActivity =>
    propsFromDispatch.onUpdate(
      updatedActivity || propsFromState.contextValues.selectedActivity,
      propsFromState.contextValues.eventId
    ),
});

const ConnectedActivityProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ActivityProvider);

export { ConnectedActivityProvider, useActivityContext };
