import React, { useState } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import MUIEditor, { MUIEditorState } from 'react-mui-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import { useStyles } from '../styles';

const editorConfig = {
  toolbar: { visible: false },
  draftEditor: { readOnly: true },
  editor: {
    wrapperElement: 'div',
    style: {
      padding: 0,
    },
  },
};

const CustomDisplay = ({ value, error, errorMsg }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(
    MUIEditorState.createWithContent(
      editorConfig,
      convertFromRaw(JSON.parse(value))
    )
  );
  return (
    <>
      <div className={error ? classes.error : ''}>
        <MUIEditor
          editorState={editorState}
          onChange={setEditorState}
          config={editorConfig}
        />
      </div>
      {error && <FormHelperText error>{errorMsg}</FormHelperText>}
    </>
  );
};

CustomDisplay.defaultProps = {
  error: false,
  errorMsg: null,
  value: null,
};

CustomDisplay.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default CustomDisplay;
