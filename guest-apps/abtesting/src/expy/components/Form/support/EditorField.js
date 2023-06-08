import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import MUIEditor, {
  MUIEditorState,
  toolbarControlTypes,
} from 'react-mui-draft-wysiwyg';
import { convertToRaw, convertFromRaw } from 'draft-js';
import FormLabel from '@material-ui/core/FormLabel';
import { useField, useFormikContext } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { isJSON } from '../../../helpers';

const useStyles = makeStyles(theme => ({
  wrapper: {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '4px',
  },
}));

const rawContent = text => ({
  blocks: [
    {
      data: {},
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [],
      text,
      type: 'unstyled',
    },
  ],
  entityMap: {},
});

const config = {
  editor: {
    style: {
      border: 'none',
      boxShadow: 'none',
      padding: '0.5rem',
    },
  },
  toolbar: {
    style: {
      boxShadow: 'none',
      borderRadius: 0,
      border: 'none',
      borderBottom: '1px solid #eaf1f6',
    },
    controls: [
      toolbarControlTypes.divider,
      toolbarControlTypes.bold,
      toolbarControlTypes.italic,
      toolbarControlTypes.underline,
      toolbarControlTypes.strikethrough,
      toolbarControlTypes.divider,
      toolbarControlTypes.linkAdd,
      toolbarControlTypes.linkRemove,
      toolbarControlTypes.divider,
      toolbarControlTypes.blockType,
      toolbarControlTypes.fontSize,
      toolbarControlTypes.fontFamily,
      toolbarControlTypes.textAlign,
      toolbarControlTypes.divider,
      toolbarControlTypes.unorderedList,
      toolbarControlTypes.orderedList,
    ],
  },
};

const EditorField = ({ name, label }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState();

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  useEffect(() => {
    async function setState() {
      if (field.value && isJSON(field.value)) {
        const formatContent = JSON.parse(field.value);
        return setEditorState(
          MUIEditorState.createWithContent(
            config,
            convertFromRaw(formatContent)
          )
        );
      }
      if (field.value && !isJSON(field.value)) {
        return setEditorState(
          MUIEditorState.createWithContent(
            config,
            convertFromRaw(rawContent(field.value))
          )
        );
      }
      return setEditorState(MUIEditorState.createEmpty());
    }
    setState();
  }, []);

  const saveContent = debounce(content => {
    const formatContent = JSON.stringify(convertToRaw(content));
    setFieldValue(field.name, formatContent);
  }, 1000);

  const onChange = newState => {
    const contentState = newState.getCurrentContent();
    saveContent(contentState);
    setEditorState(newState);
  };

  return (
    <>
      <FormLabel>{label}</FormLabel>
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

EditorField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

EditorField.defaultProps = {
  name: '',
  label: '',
};

export default EditorField;
