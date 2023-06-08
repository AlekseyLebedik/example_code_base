import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import download from 'downloadjs';

import Empty from 'dw/core/components/Empty';
import Loading from 'dw/core/components/Loading';

import { MATCHMAKING_RULESETS_ACTIVATE } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import { makeHasFeaturesEnabledSelector } from 'dw/core/components/ConfigFeatureFlags/selectors';
import { sourceSelector } from 'dw/core/components/OCFeatureFlags/selectors';

import { fetchDetails, activateRuleset } from '../../actions';
import { selectedItemSelector, rulesetDetailsSelector } from '../../selectors';

import DetailsStateless from './presentational';

const stateToProps = (state, props) => {
  const hasFeatureFlagSelector = makeHasFeaturesEnabledSelector();
  const projectTitleSource = sourceSelector(state);
  return {
    rulesetDetails: rulesetDetailsSelector(state),
    selectedItem: selectedItemSelector(state, props),
    canActivate: hasFeatureFlagSelector(state, {
      configFeatureFlags: MATCHMAKING_RULESETS_ACTIVATE,
      isStaffAllowed: false,
      projectTitleSource,
    }),
  };
};

class DetailsComponent extends Component {
  state = {
    rulesetDetails: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id && props.rulesetDetails === undefined) {
      props.fetchDetails(props.match.params.id);
    }
    if (props.rulesetDetails !== state.rulesetDetails) {
      return { rulesetDetails: props.rulesetDetails };
    }
    return null;
  }

  onDownload = () => {
    download(
      this.props.rulesetDetails.source,
      `${this.props.rulesetDetails.name}.py`
    );
  };

  render() {
    if (!this.props.selectedItem) {
      if (!this.props.rulesetDetails) return <Loading />;
      if (!this.props.rulesetDetails.id) return <Empty>Item not found</Empty>;
    }
    return (
      <DetailsStateless
        rulesetDetails={{
          ...this.props.selectedItem,
          ...(this.state.rulesetDetails || {}),
        }}
        onActivate={this.props.activateRuleset}
        onDownload={this.onDownload}
        canActivate={this.props.canActivate}
      />
    );
  }
}

DetailsComponent.propTypes = {
  match: PropTypes.object.isRequired,
  canActivate: PropTypes.bool.isRequired,
  rulesetDetails: PropTypes.object,
  selectedItem: PropTypes.object,
  activateRuleset: PropTypes.func.isRequired,
  fetchDetails: PropTypes.func.isRequired,
};

DetailsComponent.defaultProps = {
  rulesetDetails: undefined,
  selectedItem: undefined,
};

export default connect(stateToProps, { fetchDetails, activateRuleset })(
  DetailsComponent
);
