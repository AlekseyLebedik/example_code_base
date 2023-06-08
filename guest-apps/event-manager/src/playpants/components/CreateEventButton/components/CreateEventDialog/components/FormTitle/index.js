import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import styles from './index.module.css';

const FormTitle = ({
  defaultToInfo,
  disabled,
  displayInfoEvents,
  globalChecked,
  setGlobalCheckbox,
  setToggleTypeOn,
  title,
  toggleTypeOn,
}) => (
  <div className={styles.formTitleContainer}>
    {title}
    {displayInfoEvents && (
      <>
        <FormControlLabel
          className={styles.infoSwitch}
          control={
            <Switch
              checked={toggleTypeOn}
              onChange={e => setToggleTypeOn(e.target.checked)}
              color="primary"
            />
          }
          disabled={disabled}
          label="Informational"
        />

        {toggleTypeOn && (
          <FormControlLabel
            className={
              defaultToInfo ? styles.checkboxAutoMargin : styles.globalCheckbox
            }
            control={
              <Checkbox
                checked={globalChecked}
                onChange={setGlobalCheckbox}
                color="primary"
              />
            }
            label="Cross Project"
          />
        )}
      </>
    )}
  </div>
);

FormTitle.propTypes = {
  defaultToInfo: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  displayInfoEvents: PropTypes.bool.isRequired,
  globalChecked: PropTypes.bool.isRequired,
  setGlobalCheckbox: PropTypes.func.isRequired,
  setToggleTypeOn: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleTypeOn: PropTypes.bool.isRequired,
};

export default FormTitle;
