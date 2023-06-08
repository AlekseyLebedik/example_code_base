import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUIEditor, { MUIEditorState } from 'react-mui-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';

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

const Summary = ({ content }) => {
  const [editorState, setEditorState] = useState(
    MUIEditorState.createWithContent(
      editorConfig,
      convertFromRaw(JSON.parse(content))
    )
  );
  return (
    <MUIEditor
      editorState={editorState}
      onChange={setEditorState}
      config={editorConfig}
    />
  );
};

Summary.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Summary;
