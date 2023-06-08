import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MUIEditor, { MUIEditorState } from 'react-mui-draft-wysiwyg';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { isJSON } from '../../../../../helpers';
import { config } from './MUIDefault';

import { useStyles } from './styles';

const CustomInput = ({ value, setParentValue }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    async function setState() {
      if (value && isJSON(value)) {
        const formatContent = JSON.parse(value);
        return setEditorState(
          MUIEditorState.createWithContent(
            config,
            convertFromRaw(formatContent)
          )
        );
      }
      return setEditorState(MUIEditorState.createEmpty());
    }
    setState();
  }, []);

  const saveContent = content => {
    const formatContent = JSON.stringify(convertToRaw(content));
    setParentValue(formatContent);
  };

  const onChange = newState => {
    const contentState = newState.getCurrentContent();
    saveContent(contentState);
    setEditorState(newState);
  };

  return (
    <>
      <div className={classes.wrapper}>
        {editorState && (
          <MUIEditor
            editorState={editorState}
            config={config}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
};

CustomInput.propTypes = {
  value: PropTypes.string,
  setParentValue: PropTypes.func,
};

CustomInput.defaultProps = {
  value: '',
  setParentValue: () => {},
};

export default CustomInput;
