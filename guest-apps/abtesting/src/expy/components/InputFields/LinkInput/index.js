import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import SubmitBtn from '../_support/SubmitBtn';
import CancelBtn from '../_support/CancelBtn';

import { useStyles } from './styles';

const LinkInput = ({ onSave, onCancel, error, errorMsg }) => {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSave = e => {
    e.preventDefault();
    onSave({ url, title });
    setUrl('');
    setTitle('');
  };

  const handleCancel = e => {
    e.preventDefault();
    onCancel(e);
    setUrl('');
    setTitle('');
  };

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <FormLabel id="form-url">Url</FormLabel>
          <TextField
            autoFocus
            id="form-url"
            placeholder="https://example.com"
            size="small"
            variant="outlined"
            fullWidth
            value={url}
            error={error}
            type="url"
            onChange={e => setUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel id="form-title">Title</FormLabel>
          <TextField
            id="form-title"
            placeholder="enter description"
            size="small"
            variant="outlined"
            fullWidth
            error={error}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>
        {error && <FormHelperText error>{errorMsg}</FormHelperText>}
      </Grid>
      <div className={classes.btnContainer}>
        <SubmitBtn
          id="submit-btn"
          disabled={url.length === 0 || title.length === 0}
          onClick={e => handleSave(e)}
        >
          Link
        </SubmitBtn>
        <CancelBtn id="cancel-btn" onClick={e => handleCancel(e)}>
          Cancel
        </CancelBtn>
      </div>
    </form>
  );
};

LinkInput.defaultProps = {
  error: false,
  errorMsg: null,
};

LinkInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default LinkInput;
