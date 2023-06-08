import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { ACTIVITY_TYPES } from 'playpants/constants/activities';
import * as actions from 'playpants/scenes/Event/components/Activities/actions';
import { CONTEXTS_ENDPOINT_MAP } from './constants';

import StatelessContextSelector from './presentational';

export const ContextSelectorBase = ({
  allowMultiTitles,
  contextList,
  contextType,
  disabled,
  eventId,
  fetchContexts,
  fetchTitleEnvironment,
  onUpdate,
  selectedActivity,
  useDefaultFilterOptions,
  selectedTitle: { id: selectedTitleId, env },
}) => {
  const {
    activity,
    context,
    title_envs: selectedTitles,
    type,
  } = selectedActivity;
  // fetch context list and title environment settings when title is selected
  useEffect(() => {
    const endpoint = CONTEXTS_ENDPOINT_MAP[type];
    if (selectedTitleId && endpoint) {
      fetchTitleEnvironment(env.id);
      fetchContexts(selectedTitleId, env.shortType, endpoint);
    }
  }, [selectedTitleId]);

  const isContextSelectorDisabled = () => {
    if (!allowMultiTitles && !isEmpty(selectedTitles) && !!context) {
      if (type === ACTIVITY_TYPES.PUBLISHER_VARIABLES) {
        return !isEmpty(
          activity.variable_sets.filter(set => !isEmpty(set.variables))
        );
      }
      if (type === ACTIVITY_TYPES.ACHIEVEMENTS_ENGINE) {
        return false;
      }
      return !isEmpty(activity[Object.keys(activity)[0]]);
    }
    return false;
  };
  // set context key on activity to context id
  const onContextChange = ({ target: { value } }) =>
    onUpdate({ ...selectedActivity, context: value }, eventId);

  const filteredContextList = contextList.filter(
    ({ userSelectable, type: currentContextType }) => {
      if (useDefaultFilterOptions) {
        return !userSelectable;
      }
      return (
        userSelectable &&
        [contextType, 'any'].find(
          matchType => currentContextType.toLowerCase() === matchType
        )
      );
    }
  );

  return (
    <StatelessContextSelector
      value={context}
      onContextChange={onContextChange}
      disabled={
        disabled ||
        !selectedTitleId ||
        isContextSelectorDisabled() ||
        useDefaultFilterOptions
      }
      contextList={filteredContextList}
      tooltipProps={{
        enabled: useDefaultFilterOptions,
        msg: 'No user selectable contexts available',
      }}
    />
  );
};

ContextSelectorBase.propTypes = {
  allowMultiTitles: PropTypes.bool,
  contextList: PropTypes.arrayOf(PropTypes.object).isRequired,
  contextType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  eventId: PropTypes.number.isRequired,
  fetchContexts: PropTypes.func.isRequired,
  fetchTitleEnvironment: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  selectedTitle: PropTypes.object,
  useDefaultFilterOptions: PropTypes.bool.isRequired,
};
ContextSelectorBase.defaultProps = {
  allowMultiTitles: false,
  selectedTitle: {},
};

const mapDispatchToProps = dispatch => ({
  fetchContexts: bindActionCreators(actions.fetchContexts, dispatch),
  fetchTitleEnvironment: bindActionCreators(
    actions.fetchTitleEnvironment,
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(ContextSelectorBase);
