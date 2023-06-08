import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

import { RenderRoutes } from 'dw/core/helpers/routes';

import { NAVBAR_ENTRIES } from './routes';
import { HAS_CRASH_MSG } from './constants';

import './index.css';

const basePath = 'online-configuration';

class OnlineConfiguration extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    currentProjectId: PropTypes.number,
    currentTitleId: PropTypes.number,
    currentEnv: PropTypes.object,
    criticalError: PropTypes.string,
  };

  static defaultProps = {
    currentProjectId: undefined,
    currentTitleId: undefined,
    currentEnv: undefined,
    criticalError: undefined,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.crashedPath) {
      return { hasCrash: false, crashedPath: null };
    }

    return null;
  }

  state = {
    hasCrash: false,
    crashedPath: '',
  };

  componentDidCatch(error) {
    ReactGA.exception({
      description: error,
      fatal: true,
    });

    this.setState({
      hasCrash: true,
      crashedPath: this.props.location.pathname,
    });
  }

  render() {
    const { hasCrash } = this.state;
    const { currentProjectId, currentTitleId, currentEnv, criticalError } =
      this.props;

    const routesContainer = () => (
      <div
        className="OnlineConfiguration__main__row"
        key={`${currentProjectId}|${currentTitleId}|${currentEnv.id}`}
      >
        <RenderRoutes routes={NAVBAR_ENTRIES} basePath={basePath} />
      </div>
    );

    const error = msg => <h1 className="App__critical-error">{msg}</h1>;
    const content = () =>
      criticalError || hasCrash
        ? error(criticalError || HAS_CRASH_MSG)
        : routesContainer();

    return currentEnv && content();
  }
}

export default withRouter(OnlineConfiguration);
