import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from './index.module.css';

const FlagSwitch = ({
  disabled,
  input: { value, onChange },
  offProps,
  onProps,
  inputProps,
  valueOverride,
}) => {
  useEffect(() => {
    if (valueOverride) onChange(true);
  }, [valueOverride]);
  return (
    <List>
      <ListItem disableGutters classes={{ root: styles.listItem }}>
        <ListItemIcon>
          <Icon>{value ? onProps.icon : offProps.icon}</Icon>
        </ListItemIcon>
        <Tooltip title={value ? onProps.text : offProps.text}>
          <ListItemText
            classes={{ root: styles.listItemText }}
            primary={value ? onProps.label : offProps.label}
          />
        </Tooltip>
        <ListItemSecondaryAction>
          <FormControlLabel
            classes={{ root: styles.formControlLabel }}
            control={
              <Switch
                checked={!!value}
                disabled={disabled || valueOverride}
                value={value}
                onChange={e => onChange(e.target.checked)}
                {...inputProps}
              />
            }
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

FlagSwitch.propTypes = {
  input: PropTypes.object.isRequired,
  inputProps: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onProps: PropTypes.object.isRequired,
  offProps: PropTypes.object.isRequired,
  valueOverride: PropTypes.bool,
};

FlagSwitch.defaultProps = {
  disabled: false,
  valueOverride: false,
};

const FlagField = props => (
  <Field component={FlagSwitch} margin="normal" {...props} />
);

FlagField.propTypes = {
  name: PropTypes.string.isRequired,
  onProps: PropTypes.object,
  offProps: PropTypes.object,
};

FlagField.defaultProps = {
  onProps: {
    label: 'Toggle label ON',
    text: 'On',
    icon: 'done',
  },
  offProps: {
    label: 'Toggle label OFF',
    text: 'Off',
    icon: 'close',
  },
};

export default FlagField;
