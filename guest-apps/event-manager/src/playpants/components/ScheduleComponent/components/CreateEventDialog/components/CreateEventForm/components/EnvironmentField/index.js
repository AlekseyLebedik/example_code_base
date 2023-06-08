import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import upperCase from 'lodash/upperCase';

import CassetteSelect from 'playpants/components/FormFields/CassetteSelect';
import { allProjectTitlesEnvsTypesSelector } from 'playpants/components/App/selectors';
import { required } from 'dw/core/components/FormFields/validation';
import { DEFAULT_ENVS } from 'playpants/constants/environment';

const EnvironmentField = ({ disabled, envs, toggleTypeOn }) => {
  const options = [...envs]
    .sort((a, b) => DEFAULT_ENVS.indexOf(a) - DEFAULT_ENVS.indexOf(b))
    .map(env => ({ value: env, label: env }));
  if (toggleTypeOn)
    options.push({ value: 'Unknown', label: 'Cross Environment' });
  return (
    <Field
      avatarRenderer={env => (env === 'Unknown' ? 'X' : upperCase(env[0]))}
      component={CassetteSelect}
      disabled={disabled}
      data-cy="createEventEnvField"
      fullWidth
      label="Environment"
      name="eventEnvType"
      options={options}
      validate={[required]}
    />
  );
};

EnvironmentField.propTypes = {
  disabled: PropTypes.bool,
  envs: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleTypeOn: PropTypes.bool.isRequired,
};
EnvironmentField.defaultProps = { disabled: false };

const mapStateToProps = (state, props) => ({
  envs: props.globalChecked
    ? DEFAULT_ENVS
    : allProjectTitlesEnvsTypesSelector(state),
});

export default connect(mapStateToProps)(EnvironmentField);
