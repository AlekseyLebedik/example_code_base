import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { required } from 'dw/core/components/FormFields/validation';
import Input from 'dw/core/components/FormFields/Input';
import keyPressAction from 'playpants/helpers/keyPressAction';

const NameField = ({ asyncValidating, onBlur }) => (
  <Field
    component={Input}
    required
    fullWidth
    label="Story Name"
    name="name"
    validate={[required]}
    onBlur={onBlur}
    onKeyDown={e => keyPressAction(e, () => e.target.blur())}
    InputProps={{
      endAdornment: (
        <InputAdornment>
          {asyncValidating && <CircularProgress thickness={10} size={16} />}
        </InputAdornment>
      ),
    }}
  />
);

NameField.propTypes = {
  asyncValidating: PropTypes.bool,
  onBlur: PropTypes.func,
};

NameField.defaultProps = {
  onBlur: undefined,
  asyncValidating: false,
};

export default NameField;
