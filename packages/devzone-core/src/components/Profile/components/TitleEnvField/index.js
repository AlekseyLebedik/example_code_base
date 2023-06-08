import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import InputLabel from '@material-ui/core/InputLabel';

import { connect } from '../../../../AppStore';
import { serviceEnabledEnvsListSelector } from '../../../../access/ServiceAvailability/selectors';
import { ProfileStyles, useStyles } from '../constants';

const { AutoComplete } = global;

const stateToProps = state => ({
  envsSelector: serviceEnabledEnvsListSelector(state),
});

const Option = props => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    disabled={props.isDisabled}
    component="div"
    style={props.getStyles('option', props)}
    {...props.innerProps}
  >
    {props.data.label}
  </MenuItem>
);

Option.propTypes = {
  data: PropTypes.object.isRequired,
  getStyles: PropTypes.func.isRequired,
  innerProps: PropTypes.object.isRequired,
  innerRef: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

const TitleEnvField = ({ formik, envsSelector }) => {
  const classes = useStyles();
  const environments = envsSelector();
  const envOptions = [];
  let lastGroup = {};
  environments.forEach(e => {
    const value = `project-${e.project.id}`;
    if (value !== lastGroup.value) {
      lastGroup = {
        value,
        label: e.project.name,
        options: [],
      };
      envOptions.push(lastGroup);
    }
    lastGroup.options.push({
      value: e.environment.id,
      label: `(${e.title.id}) ${e.title.name} ${e.title.platform} ${e.environment.shortType}`,
    });
  });
  const name = 'defaultTitleEnv';
  const label = 'Favourite Title';

  if (AutoComplete) {
    return (
      <AutoComplete
        styles={ProfileStyles}
        onChange={option => formik.setFieldValue(name, option)}
        defaultValue={
          envOptions
            ? envOptions.map(env =>
                env.options.find(
                  ({ value }) => value === formik.values.defaultTitleEnv
                )
              )
            : ''
        }
        name={name}
        label={label}
        fullWidth
        options={envOptions}
        isClearable={false}
        components={{ Option }}
      />
    );
  }

  const renderSelectGroup = env => {
    const items = env.options.map(({ value, label: optionLabel }) => (
      <MenuItem key={value} value={value}>
        {optionLabel}
      </MenuItem>
    ));
    return [
      <ListSubheader className={classes.groupHeading}>
        {env.label}
      </ListSubheader>,
      items,
    ];
  };
  return (
    <>
      <InputLabel className={classes.font}>{label}</InputLabel>
      <Select
        value={formik.values.defaultTitleEnv}
        onChange={formik.handleChange}
        name={name}
        fullWidth
      >
        {envOptions?.map(opt => renderSelectGroup(opt))}
      </Select>
    </>
  );
};

TitleEnvField.propTypes = {
  formik: PropTypes.object.isRequired,
  envsSelector: PropTypes.func.isRequired,
};

export default connect(stateToProps)(TitleEnvField);
