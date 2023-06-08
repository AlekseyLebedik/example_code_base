import { toolbarControlTypes } from 'react-mui-draft-wysiwyg';

export const config = {
  editor: {
    style: {
      border: 'none',
      boxShadow: 'none',
      padding: '0.5rem',
      background: '#f5f5f5',
    },
  },
  toolbar: {
    style: {
      boxShadow: 'none',
      borderRadius: 0,
      border: 'none',
      borderBottom: '1px solid #eaf1f6',
      background: '#f5f5f5',
    },
    controls: [
      toolbarControlTypes.bold,
      toolbarControlTypes.italic,
      toolbarControlTypes.underline,
      toolbarControlTypes.strikethrough,
      toolbarControlTypes.divider,
      toolbarControlTypes.linkAdd,
      toolbarControlTypes.linkRemove,
      toolbarControlTypes.divider,
      toolbarControlTypes.blockType,
      toolbarControlTypes.textAlign,
      toolbarControlTypes.divider,
      toolbarControlTypes.unorderedList,
      toolbarControlTypes.orderedList,
    ],
  },
};
