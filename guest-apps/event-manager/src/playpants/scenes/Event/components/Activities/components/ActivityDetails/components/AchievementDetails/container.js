import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { NEW_ACTIVITY_SETTINGS } from 'playpants/constants/activities';
import { ENVIRONMENT_SHORTTYPES } from 'playpants/scenes/Event/components/Activities/constants';
import { useDidUpdateEffect } from 'playpants/hooks';

import * as actions from './actions';
import * as selectors from './selectors';
import AchievementDetailsStateless from './presentational';

export const AchievementDetails = props => {
  const handleUpdate = ({
    onUpdate,
    selectedActivity,
    selectedRuleset: { codeSignature = '', ...restOfRuleset },
  }) =>
    onUpdate({
      ...selectedActivity,
      activity: {
        ruleset_to_activate: {
          ...restOfRuleset,
          code_signature: codeSignature,
        },
        ruleset_to_duplicate: '',
      },
    });

  const fetchWithContext =
    props.showContext &&
    !props.noContextSelected &&
    !isEmpty(props.contextList);

  const handleRulesetClear = (
    onClearRuleset,
    onUpdate,
    selectedActivity,
    selectedTitle
  ) => {
    onClearRuleset();
    const selectedRuleset = {
      ...NEW_ACTIVITY_SETTINGS.ae.ruleset_to_activate,
    };
    handleUpdate({
      onUpdate,
      selectedActivity,
      selectedTitle,
      selectedRuleset,
    });
  };

  const onAchievementUpdate = label => {
    const {
      eventData: { env_type: env },
      onClearRuleset,
      onFetchSelectedRuleset,
      selectedTitle,
      onUpdate,
      selectedActivity,
      showContext,
      contextList,
    } = props;

    if (selectedTitle) {
      if (!showContext) {
        return onFetchSelectedRuleset({
          env: ENVIRONMENT_SHORTTYPES[env],
          label,
          title: selectedTitle.id,
        });
      }
      if (fetchWithContext) {
        const selectedContext = contextList.find(
          context => selectedActivity.context === context.id
        );
        return onFetchSelectedRuleset({
          env: ENVIRONMENT_SHORTTYPES[env],
          label,
          title: selectedTitle.id,
          context: selectedContext.name,
        });
      }
    }
    return handleRulesetClear(
      onClearRuleset,
      onUpdate,
      selectedActivity,
      selectedTitle
    );
  };

  const checkRuleset = ({
    onClearRuleset,
    onUpdate,
    rulesetList,
    rulesetToActivateLabel,
    selectedActivity,
    selectedTitle,
  }) =>
    !find(rulesetList, { label: rulesetToActivateLabel }) &&
    handleRulesetClear(
      onClearRuleset,
      onUpdate,
      selectedActivity,
      selectedTitle
    );

  const checkDuplicatedRuleset = ({ rulesetToDuplicate, rulesetList }) =>
    find(rulesetList, { label: rulesetToDuplicate }) &&
    onAchievementUpdate(rulesetToDuplicate);

  const checkRulesetAgainstList = () => {
    const { rulesetToActivateLabel } = props;
    return rulesetToActivateLabel
      ? checkRuleset(props)
      : checkDuplicatedRuleset(props);
  };

  useEffect(() => {
    const {
      contextList,
      defaultContextOptions,
      disabled,
      eventData: { env_type: env },
      onClearAchievements,
      onFetchRulesetList,
      onUpdate,
      selectedActivity,
      selectedTitle,
      showContext,
      useDefaultFilterOptions,
    } = props;
    if (!disabled) {
      if (selectedTitle) {
        if (!showContext) {
          return onFetchRulesetList({
            env: ENVIRONMENT_SHORTTYPES[env],
            title: selectedTitle.id,
          });
        }
        const selectedContext = contextList.find(
          c => selectedActivity.context === c.id
        );
        if (fetchWithContext && selectedContext) {
          return onFetchRulesetList({
            env: ENVIRONMENT_SHORTTYPES[env],
            title: selectedTitle.id,
            context: selectedContext.name,
          });
        }
        if (selectedTitle.id && contextList.length && useDefaultFilterOptions) {
          const { title, any, other } = defaultContextOptions;
          const defaultContext = title || any || other;
          onUpdate({ ...selectedActivity, context: defaultContext.id });
        }
      } else {
        return onClearAchievements();
      }
    }
    return undefined;
  }, [
    props.selectedActivity.id,
    props.selectedActivity.title_envs,
    props.selectedActivity.context,
    props.contextList,
  ]);

  useDidUpdateEffect(() => {
    const { disabled, selectedTitle, isRulesetListLoading } = props;
    if (!disabled && !isRulesetListLoading && selectedTitle) {
      checkRulesetAgainstList(props);
    }
  }, [props.rulesetList]);

  useDidUpdateEffect(() => {
    const { disabled, selectedRuleset } = props;
    if (!disabled && !isEmpty(selectedRuleset)) {
      handleUpdate(props);
    }
  }, [props.selectedRuleset]);

  return (
    <AchievementDetailsStateless
      {...props}
      onAchievementUpdate={onAchievementUpdate}
    />
  );
};

const makeMapStateToProps = () => {
  const rulesetDetailsFormattedSelector =
    selectors.makeRulesetDetailsFormattedSelector();
  const rulesetToActivateLabelSelector =
    selectors.makeRulesetToActivateLabelSelector();
  const rulesetToDuplicateSelector = selectors.makeRulesetToDuplicateSelector();

  const mapStateToProps = (state, props) => ({
    isRulesetListLoading: selectors.rulesetListLoadingSelector(state),
    rulesetDetails: rulesetDetailsFormattedSelector(state, props),
    rulesetList: selectors.rulesetListSelector(state),
    rulesetToActivateLabel: rulesetToActivateLabelSelector(state, props),
    rulesetToDuplicate: rulesetToDuplicateSelector(state, props),
    selectedRuleset: selectors.selectedRulesetSelector(state),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  onFetchRulesetList: bindActionCreators(actions.fetchRulesetList, dispatch),
  onFetchSelectedRuleset: bindActionCreators(
    actions.fetchSelectedRuleset,
    dispatch
  ),
  onClearRuleset: bindActionCreators(actions.clearRuleset, dispatch),
  onClearAchievements: bindActionCreators(actions.clearAchievements, dispatch),
});

AchievementDetails.propTypes = {
  contextList: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  defaultContextOptions: PropTypes.shape({
    title: PropTypes.object,
    any: PropTypes.object,
    other: PropTypes.object,
  }).isRequired,
  eventData: PropTypes.object.isRequired,
  isRulesetListLoading: PropTypes.bool.isRequired,
  noContextSelected: PropTypes.bool.isRequired,
  onClearAchievements: PropTypes.func.isRequired,
  onClearRuleset: PropTypes.func.isRequired,
  onFetchRulesetList: PropTypes.func.isRequired,
  onFetchSelectedRuleset: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  rulesetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  rulesetToActivateLabel: PropTypes.string.isRequired,
  showContext: PropTypes.bool.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  selectedRuleset: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.arrayOf(PropTypes.object).isRequired,
  ]),
  selectedTitle: PropTypes.object,
  useDefaultFilterOptions: PropTypes.bool.isRequired,
};

AchievementDetails.defaultProps = {
  selectedRuleset: {},
  selectedTitle: undefined,
};

export default connect(
  makeMapStateToProps,
  dispatchToProps
)(AchievementDetails);
