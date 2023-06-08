import { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { connect } from 'dw/core/helpers/component';

import { envsIdsSelector } from 'dw/core/helpers/title-env-selectors';
import { setTitleFromUnsafeSource } from 'dw/core/components/TitleSelector/actions';

import StatelessApp from './presentational';

class App extends Component {
  state = { contextContainer: null };

  componentDidMount() {
    this.setTitle();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match.params, this.props.match.params))
      this.setTitle();
  }

  setTitle = () => {
    const { titleId, env } = this.props.match.params;
    this.props.setTitleFromUnsafeSource(titleId, env);
  };

  setContextContainer = contextContainer => this.setState({ contextContainer });

  render() {
    const { contextContainer } = this.state;
    return StatelessApp({
      ...this.props,
      contextContainer,
      setContextContainer: this.setContextContainer,
    });
  }
}

App.propTypes = {
  ...StatelessApp.propTypes,
  setTitleFromUnsafeSource: PropTypes.func.isRequired,
};

const stateToProps = state => {
  // Refactor this
  const emptyProject =
    state.Components.TitleSelector.currentProject.id === undefined;
  const emptyTitle =
    state.Components.TitleSelector.currentTitle.id === undefined;
  const emptyEnv = state.Components.TitleSelector.currentEnv.id === undefined;

  return {
    currentProjectId: state.Components.TitleSelector.currentProject.id,
    currentTitleId: state.Components.TitleSelector.currentTitle.id,
    currentEnv: state.Components.TitleSelector.currentEnv,
    loading: emptyProject || emptyTitle || emptyEnv,
    envsIds: envsIdsSelector(state),
  };
};

const dispatchToProps = {
  setTitleFromUnsafeSource,
};

const AppConnected = connect(stateToProps, dispatchToProps, App);

export default AppConnected;
