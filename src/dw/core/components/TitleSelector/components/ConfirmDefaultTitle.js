import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfirmDialog from 'dw/core/components/Confirm/';
import { defaultTitleEnvSelector } from 'dw/core/helpers/title-env-selectors';

class ConfirmDefaultTitle extends Component {
  static propTypes = {
    onSelectTitle: PropTypes.func.isRequired,
    defaultTitleEnv: PropTypes.object.isRequired,
    projects: PropTypes.arrayOf(PropTypes.object),
    currentEnv: PropTypes.object,
  };

  static defaultProps = {
    projects: [],
    currentEnv: {},
  };

  state = {
    // eslint-disable-next-line
    defaultTitleEnvID: null,
    confirmSetDefaultTitle: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { id: defaultTitleEnvID } = props.defaultTitleEnv;
    if (defaultTitleEnvID !== state.defaultTitleEnvID) {
      if (
        state.defaultTitleEnvID !== null &&
        defaultTitleEnvID !== props.currentEnv.id
      ) {
        return {
          ...state,
          defaultTitleEnvID,
          confirmSetDefaultTitle: true,
        };
      }
      return {
        ...state,
        defaultTitleEnvID,
      };
    }
    return null;
  }

  setDefaultTitle = () => {
    const { defaultTitleEnv, projects, onSelectTitle } = this.props;
    const { project, title, environment } = projects.find(
      p => p.environment.id === defaultTitleEnv.id
    );
    onSelectTitle(project, title, environment);
  };

  closeConfirm = () =>
    this.setState({
      confirmSetDefaultTitle: false,
    });

  render() {
    return (
      <ConfirmDialog
        key="confirm-dialog"
        title="Reload Title"
        content="The favorite title was changed. Would you like to navigate to it?"
        mainButtonLabel="Reload"
        open={this.state.confirmSetDefaultTitle}
        onHide={this.closeConfirm}
        onConfirm={this.setDefaultTitle}
      />
    );
  }
}

const stateToProps = state => ({
  defaultTitleEnv: defaultTitleEnvSelector(state),
});

export default connect(stateToProps)(ConfirmDefaultTitle);
