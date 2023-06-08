import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styles from './index.module.css';

export const CustomDrawerDropzoneBase = ({
  accept,
  classes,
  handleOnLoadComplete: onLoadComplete,
  customDropzoneMessage,
  isOpen,
  setOpen,
}) => {
  const [file, setFile] = useState();

  const handleOnClose = () => {
    setFile({});
    setOpen(false);
  };

  const handleOnLoadComplete = loadedFile => {
    onLoadComplete(
      loadedFile,
      () => setFile({}),
      () => setOpen(false)
    );
  };

  const handleOnDrop = droppedFiles => {
    const droppedFile = head(droppedFiles);
    setFile({
      fileName: droppedFile.name,
      contentType: droppedFile.type,
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      handleOnLoadComplete(droppedFile);
    };
    reader.readAsDataURL(droppedFile);
  };

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={handleOnClose}>
      {isEmpty(file) ? (
        <Dropzone
          onDrop={handleOnDrop}
          accept={accept}
          disableClick
          className={classNames(styles.container, classes.root)}
        >
          {({ open }) => (
            <>
              <Icon>cloud_upload</Icon>
              {customDropzoneMessage && (
                <p>
                  <b style={{ color: 'inherit' }}>{customDropzoneMessage}</b>
                </p>
              )}
              <p>Drag and drop file here</p>
              <p>or</p>
              <Button
                color="primary"
                className={classNames(classes.button)}
                variant="contained"
                onClick={() => open()}
              >
                Browse file
              </Button>
            </>
          )}
        </Dropzone>
      ) : (
        <div className={classNames(styles.container, styles.offsetGrid)}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={1}
          >
            <Grid item>
              <CircularProgress size={16} thickness={10} />
            </Grid>
            <Grid item>Uploading {file.fileName}</Grid>
          </Grid>
        </div>
      )}
    </Drawer>
  );
};

CustomDrawerDropzoneBase.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOnLoadComplete: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  customDropzoneMessage: PropTypes.string,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

CustomDrawerDropzoneBase.defaultProps = {
  accept: '.csv',
  customDropzoneMessage: undefined,
};

export default withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  error: {
    color: theme.palette.secondary.main,
  },
  container: {},
  button: {},
}))(CustomDrawerDropzoneBase);
