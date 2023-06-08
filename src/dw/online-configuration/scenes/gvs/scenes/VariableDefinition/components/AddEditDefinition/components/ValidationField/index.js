import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { usePrevious } from 'dw/core/hooks';
import { BOOL, CHAR, INT } from '../../../../constants';

const useStyles = makeStyles(theme => ({
  rangeField: {
    maxWidth: '50%',
    marginLeft: theme.spacing(2),
    '&:first-child': {
      marginLeft: 0,
    },
  },
  label: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const ValidationField = () => {
  const name = 'validation';
  const classes = useStyles();
  const {
    values: { type },
    setFieldValue,
  } = useFormikContext();
  const prevType = usePrevious(type);
  useEffect(() => {
    if (!prevType || prevType === type) return;
    const validation = {};
    if (type === INT || type === CHAR) {
      validation.min = '';
      validation.max = '';
    }
    setFieldValue(name, validation);
  }, [prevType, type, setFieldValue]);
  const [minField, minMeta] = useField({ name: 'validation.min' });
  const [maxField, maxMeta] = useField({ name: 'validation.max' });
  const [isListField] = useField({
    name: 'validation.isList',
  });
  const [enumValuesField, enumValuesMeta] = useField({
    name: 'validation.enum',
  });
  if (type !== BOOL) {
    return (
      <div className="flex">
        <label className={classes.label}>Input Validation</label>
        <div className="flex flex-col flex-grow">
          <div className="flex flex-grow">
            <TextField
              {...minField}
              value={minField.value || ''}
              className={classes.rangeField}
              margin="dense"
              label="Min"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              error={Boolean(minMeta.error && minMeta.touched)}
              helperText={minMeta.touched && minMeta.error}
              fullWidth
            />
            <TextField
              {...maxField}
              value={maxField.value || ''}
              className={classes.rangeField}
              margin="dense"
              label="Max"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              error={Boolean(maxMeta.error && maxMeta.touched)}
              helperText={maxMeta.touched && maxMeta.error}
              fullWidth
            />
          </div>
          <div>
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  color="primary"
                  checked={isListField.value}
                  onChange={event =>
                    setFieldValue(isListField.name, event.target.checked)
                  }
                />
              }
              label="Is comma separated list"
              labelPlacement="end"
            />
            <TextField
              {...enumValuesField}
              value={enumValuesField.value || ''}
              onChange={event =>
                setFieldValue(
                  enumValuesField.name,
                  event.target.value || undefined
                )
              }
              margin="dense"
              label="Enum Values"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              error={Boolean(enumValuesMeta.error && enumValuesMeta.touched)}
              helperText={
                (enumValuesMeta.touched && enumValuesMeta.error) ||
                'Comma separated list of values'
              }
              fullWidth
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const KeyField = ({ isEdit }) => {
  const [keyField, keyMeta] = useField({ name: 'key' });
  return (
    <TextField
      {...keyField}
      autoFocus
      margin="dense"
      id="key"
      name="key"
      label="Name"
      placeholder="Type Variable Name"
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      error={Boolean(keyMeta.error && keyMeta.touched)}
      helperText={keyMeta.touched && keyMeta.error}
      disabled={isEdit}
    />
  );
};
KeyField.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default ValidationField;
