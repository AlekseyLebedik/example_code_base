import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useCreateEditDefinition } from 'dw/online-configuration/scenes/gvs/graphql/hooks';
import { useSnackbar } from 'dw/core/hooks';
import { Formik } from 'formik';
import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import Select from 'dw/core/components/Select';
import ValidationField, { KeyField } from './components/ValidationField';
import { useHandleConflictError, useScopeURI } from '../../hooks';
import { TYPE_OPTIONS } from '../../constants';
import { validate } from './validation';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginTop: -theme.spacing(2),
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      maxWidth: '60%',
      '& > div': {
        marginTop: theme.spacing(2),
      },
    },
    '& > div:last-child': {
      marginLeft: theme.spacing(2),
      maxWidth: '40%',
    },
  },
  placeholder: {
    left: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const AddEditDefinition = ({
  gridApi,
  handleClose,
  setFilter,
  refetch,
  isEdit,
  definition,
}) => {
  const classes = useStyles();
  const scopeURI = useScopeURI();
  const [definitionMutation] = useCreateEditDefinition(scopeURI, isEdit);
  const snackbar = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const handleError = useHandleConflictError(true);

  const categories = useMemo(() => {
    if (!gridApi) return [];
    const result = new Set();
    gridApi.forEachLeafNode(({ data: d }) => {
      if (d.category) result.add(d.category);
    });
    return result;
  }, [gridApi]);
  const [addedCategories, setAaddedCategories] = useState(() => {
    return new Set();
  });
  const onAddCategory = category => {
    const result = Array.from(addedCategories);
    result.push(category);
    setAaddedCategories(new Set(result));
  };
  const categoriesOptions = useMemo(() => {
    const result = Array.from(
      new Set(Array.from(categories).concat(Array.from(addedCategories)))
    );
    result.sort();
    return result;
  }, [categories, addedCategories]);
  const validateForm = useMemo(() => {
    const keys = [];
    if (gridApi) {
      gridApi.forEachLeafNode(({ data: d }) => keys.push(d.key));
    }
    return validate(keys, isEdit);
  }, [gridApi, isEdit]);

  const ownerOptions = useMemo(() => {
    if (!gridApi) return [];
    const result = new Set();
    gridApi.forEachLeafNode(({ data: d }) => {
      if (d?.owner?.username) {
        result.add(d.owner.username);
      }
    });
    return Array.from(result);
  }, [gridApi]);

  const onSubmit = useCallback(
    async rawValues => {
      const {
        validation: { isList, ...rawValidation },
        ...def
      } = rawValues;
      const validation = {
        ...rawValidation,
        min: rawValidation.min || undefined,
        max: rawValidation.max || undefined,
      };
      if (isList) def.type = `list_${def.type}`;
      def.validation = JSON.stringify(validation);
      def.category = def.category || null;
      def.description = def.description || null;
      setSubmitting(true);
      setError(null);
      try {
        await definitionMutation(def);
        await refetch();
        setSubmitting(false);
        setFilter(def.key);
        snackbar.success(
          `Variable Definition has been successfuly ${
            isEdit ? 'updated' : 'added'
          }`
        );
        handleClose();
      } catch (err) {
        if (err.isCanceled) return;
        setSubmitting(false);
        setError(handleError(err));
      }
    },
    [setSubmitting, setError, gridApi, setFilter, snackbar, handleClose]
  );
  const [type, isList] = useMemo(() => {
    if (!definition) return [];
    if (definition.type.startsWith('list_')) {
      const [, t] = definition.type.split('list_');
      return [t, true];
    }
    return [definition.type, false];
  }, [definition]);
  return (
    <Formik
      initialValues={{
        ...pick(definition, ['key', 'owner', 'category', 'description']),
        type,
        validation: {
          ...JSON.parse(definition?.validation || '{}'),
          isList,
        },
        owner: definition?.owner?.username,
      }}
      onSubmit={onSubmit}
      validate={validateForm}
      validateOnBlur={false}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Dialog
          open
          aria-labelledby="form-dialog-title"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">
            {isEdit ? 'Update' : 'Add a new'} Variable Definition
          </DialogTitle>
          <DialogContent>
            {error && (
              <DialogContentText className={classes.error}>
                {error}
              </DialogContentText>
            )}
            <div className={classes.container}>
              <div>
                <KeyField isEdit={isEdit} />
                <Select
                  margin="dense"
                  id="type"
                  name="type"
                  label="Input Type"
                  onChange={handleChange}
                  value={values.type}
                  options={TYPE_OPTIONS}
                  variant="outlined"
                />
                <ValidationField />
                <AutocompleteGeneral
                  key="owner"
                  name="owner"
                  id="owner"
                  label="Ower"
                  options={ownerOptions}
                  onChange={v =>
                    handleChange({ target: { name: 'owner', value: v } })
                  }
                  defaultValue={values.owner}
                  size={null}
                  textFieldProps={{
                    variant: 'outlined',
                    margin: 'dense',
                  }}
                  classes={{ placeholder: classes.placeholder }}
                  // Creatable
                  onAdd={v =>
                    handleChange({ target: { name: 'owner', value: v } })
                  }
                  formatCreateLabel={v => `Use custom name "${v}"`}
                  createOptionPosition="first"
                  allowCreateWhileLoading
                />
                <AutocompleteGeneral
                  key="category"
                  name="category"
                  value={values.category}
                  defaultValue={values.category}
                  onChange={v =>
                    handleChange({ target: { name: 'category', value: v } })
                  }
                  options={categoriesOptions}
                  onAdd={onAddCategory}
                  placeholder="Select an existing category or type to add new"
                  label="Category"
                  size={null}
                  textFieldProps={{
                    variant: 'outlined',
                    margin: 'dense',
                  }}
                  classes={{ placeholder: classes.placeholder }}
                />
              </div>
              <div>
                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  onChange={handleChange}
                  value={values.description || ''}
                  multiline
                  rows={10}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={submitting}
            >
              {submitting ? 'Submitting ...' : 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

AddEditDefinition.propTypes = {
  gridApi: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  definition: PropTypes.object,
};

AddEditDefinition.defaultProps = {
  isEdit: false,
  definition: {
    key: '',
    type: 'char',
    validation: '{}',
    category: '',
    description: '',
  },
};

export default AddEditDefinition;
