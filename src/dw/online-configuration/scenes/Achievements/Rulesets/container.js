import { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { submit } from 'redux-form';

import { joinQueryParam } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { getReactBaseURL } from 'dw/online-configuration/selectors';

import { FORM_NAME as UploadRulesetFormName } from './components/UploadRulesetForm/constants';

import { rulesetsFormattedSelector } from './selectors';
import * as A from './actions';
import RulesetsStatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  history: props.history,
  match: props.match,
  rulesets: rulesetsFormattedSelector(state),
  nextPageToken: state.Scenes.Achievements.Rulesets.nextPageToken,
  q: state.Scenes.Achievements.Rulesets.q,
  onSearch: payload =>
    props.history.push(
      `${getReactBaseURL(state)}achievements/rulesets/?q=${payload.q}`
    ),
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    if (query) {
      dispatch(A.fetchRulesets({ q: query }));
    } else {
      dispatch(A.fetchRulesets());
    }
  },
  onShowMore: (nextPageToken, q) =>
    dispatch(A.fetchRulesets({ nextPageToken, q }, true)),
  onClickListItem: ruleset => dispatch(A.rulesetsListItemClick(ruleset)),
  onResetSelectedRuleset: () => dispatch(A.resetSelectedRuleset()),
  onSearch: q => dispatch(A.fetchRulesets({ q })),
  uploadRulesetEvents: {
    openUploadRulesetModalHandler: () => dispatch(A.openUploadRulesetModal()),
    closeUploadRulesetModalHandler: () => dispatch(A.closeUploadRulesetModal()),
    uploadOnRemoteSubmit: () => dispatch(submit(UploadRulesetFormName)),
    onUploadRulesetHandler: values => dispatch(A.uploadRuleset(values)),
  },
  deleteRulesetEvents: {
    onDeleteRulesetHandler: (values, q) => dispatch(A.deleteRuleset(values, q)),
  },
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSearch: payload => {
    // partial search is not yet supported by AE
    const { history, match } = stateProps;
    const path = !payload.q
      ? match.url
      : joinQueryParam(match.url, 'q', payload.q);
    history.replace(path);
    dispatchProps.onSearch(payload.q);
  },
  deleteRulesetEvents: {
    ...dispatchProps.deleteRulesetEvents,
    onDeleteRulesetHandler: values => {
      dispatchProps.deleteRulesetEvents.onDeleteRulesetHandler(
        values,
        stateProps.q
      );
      if (
        stateProps.selectedRuleset &&
        values.includes(stateProps.selectedRuleset.label)
      ) {
        dispatchProps.onResetSelectedRuleset();
        const { history, match } = stateProps;
        const url = match.url.replace(match.params.id, '');
        history.replace(url);
      }
    },
  },
});

const Rulesets = props => {
  const { onLoad, history, match } = props;
  useEffect(() => {
    const { q } = queryString.parse(history.location.search);
    const label = match.params.id;

    if (!q && label) {
      onLoad(label);
    } else {
      onLoad(q);
    }
  }, [onLoad]);

  return RulesetsStatelessComponent(props);
};

Rulesets.propTypes = {
  ...RulesetsStatelessComponent.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, Rulesets, mergeProps);
