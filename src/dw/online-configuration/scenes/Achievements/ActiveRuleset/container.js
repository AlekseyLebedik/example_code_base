import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Loading from 'dw/core/components/Loading';
import { getReactBaseURL } from 'dw/online-configuration/selectors';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import { fetchActiveRuleset, fetchActiveRulesetAchievements } from './actions';
import ActiveRulesetStatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  loading: state.Scenes.Achievements.ActiveRuleset.loading,
  activeRuleset: state.Scenes.Achievements.ActiveRuleset.activeRuleset,
  nextPageToken: state.Scenes.Achievements.ActiveRuleset.nextPageToken,
  onClickRulesetLabel: label =>
    props.history.push(
      `${getReactBaseURL(state)}achievements/rulesets/${label}`
    ),
  formatDateTime: formatDateTimeSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchActiveRuleset());
  },
  onShowMore: (nextPageToken, params = {}) => {
    dispatch(
      fetchActiveRulesetAchievements({ ...params, nextPageToken }, true)
    );
  },
});

const ActiveRuleset = ({ onLoad, ...props }) => {
  useEffect(() => onLoad(), [onLoad]);

  return props.activeRuleset === undefined ? (
    <Loading />
  ) : (
    <ActiveRulesetStatelessComponent {...props} onLoadData={props.onShowMore} />
  );
};

ActiveRuleset.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  activeRuleset: PropTypes.object,
};
ActiveRuleset.defaultProps = {
  activeRuleset: undefined,
};

export default connect(stateToProps, dispatchToProps)(ActiveRuleset);
