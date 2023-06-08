import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form } from 'redux-form';

import { MuiThemeProvider } from '@material-ui/core/styles';

import { FormTheme } from './theme';
import styles from './index.module.css';

const MainFormComponent = ({
  handleSubmit,
  onSubmit,
  children,
  containerClass,
}) => (
  <MuiThemeProvider theme={FormTheme}>
    <div className={classNames(styles.container, containerClass)}>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </Form>
    </div>
  </MuiThemeProvider>
);

MainFormComponent.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
};

MainFormComponent.defaultProps = {
  containerClass: '',
};

export default MainFormComponent;
