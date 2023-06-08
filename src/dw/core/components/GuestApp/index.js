/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import Loading from 'dw/core/components/Loading';
import { Error500 } from 'dw/core/components/CriticalError';
import ErrorBoundary from 'dw/core/components/ErrorBoundary';
import { GUEST_APP_LOCATIONS } from 'dw/config';

import styles from './index.module.css';

const initState = props => {
  const { name } = props;
  const host = GUEST_APP_LOCATIONS[name];
  return {
    error: null,
    component: null,
    host,
  };
};

class GuestApp extends Component {
  state = initState(this.props);

  mounted = false;

  componentDidMount() {
    this.mounted = true;
    this.loadGuestApp();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadGuestApp = () => {
    const { name, document } = this.props;
    const { host } = this.state;
    const scriptId = `guest-app-script-${name}`;

    axios
      .get(`${host}/asset-manifest.json`)
      .then(({ data: { files } }) => {
        if (files['main.css']) {
          const css = document.createElement('link');
          css.id = `css-${scriptId}`;
          css.rel = 'stylesheet';
          css.crossOrigin = '';
          css.href = `${host}${files['main.css']}`;
          document.head.appendChild(css);
        }
        const runtimePath =
          files['runtime~main.js'] || files['runtime-main.js'];
        import(/* webpackIgnore: true */ `${host}${runtimePath}`)
          .then(() =>
            import(/* webpackIgnore: true */ `${host}${files['main.js']}`).then(
              () => this.renderGuestApp()
            )
          )
          .catch(e => console.error(e) || this.setState({ error: String(e) }));
      })
      .catch(e => console.error(e) || this.setState({ error: String(e) }));
  };

  renderGuestApp = () => {
    if (!this.mounted) return;
    const { name } = this.props;
    const component = window[`GUEST_APP_${name}`];
    if (component) {
      this.setState({ component });
    } else {
      const error = `Make sure you have assigned component to the window['GUEST_APP_${name}'] in your guest app entrypoint.`;
      this.setState(
        {
          error,
        },
        () => console.error(error)
      );
    }
  };

  render() {
    const { name } = this.props;
    const { component: GuestComponent, error, localEnabled, host } = this.state;
    if (error) {
      return (
        <>
          <Error500 error={{ message: String(error) }}>
            {localEnabled && (
              <div>
                Make sure you serve <strong>{name}</strong> application on{' '}
                <strong>{host}</strong>
              </div>
            )}
          </Error500>
        </>
      );
    }
    return GuestComponent ? (
      <div className={styles.container}>
        <GuestComponent {...this.props} />
      </div>
    ) : (
      <Loading />
    );
  }
}

GuestApp.propTypes = {
  name: PropTypes.string.isRequired,
  document: PropTypes.object,
  window: PropTypes.object,
};

GuestApp.defaultProps = {
  document,
  window,
};

export default props => (
  <ErrorBoundary>
    <GuestApp {...props} />
  </ErrorBoundary>
);
