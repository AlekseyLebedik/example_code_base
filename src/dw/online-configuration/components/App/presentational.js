import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import CriticalError from 'dw/core/components/CriticalError';

import { ContextContainer } from 'dw/core/components/ContextSelector';

import NavigationBar from '../NavigationBar';

import OnlineConfiguration from '../../scenes';

import styles from './App.module.css';

function StatelessApp({
  loading,
  contextContainer,
  setContextContainer,
  ...other
}) {
  if (loading) {
    return (
      <CircularProgress className={styles.AppLoading} size={80} thickness={5} />
    );
  }

  return (
    <>
      <NavigationBar
        setContextContainer={setContextContainer}
        showAdminSettings
      />

      <main className={styles.App}>
        <CriticalError>
          {contextContainer && (
            <ContextContainer.Provider value={contextContainer}>
              <OnlineConfiguration {...other} />
            </ContextContainer.Provider>
          )}
        </CriticalError>
      </main>
    </>
  );
}

StatelessApp.propTypes = {
  loading: PropTypes.bool.isRequired,
  contextContainer: PropTypes.node,
  setContextContainer: PropTypes.func,
};
StatelessApp.defaultProps = {
  setContextContainer: () => {},
  contextContainer: null,
};

export default StatelessApp;
