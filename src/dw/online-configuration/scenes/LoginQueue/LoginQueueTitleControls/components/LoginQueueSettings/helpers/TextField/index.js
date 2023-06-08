import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const TextFieldQueues = withStyles({
  root: {
    '& .MuiInputBase-root': {
      fontSize: '14px',
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255, 255, 255, 60%)',
    },
    '& .MuiInputBase-input': {
      color: 'rgb(255, 255, 255)',
    },
    '& .MuiInput-underline:before, .MuiInput-underline:hover:before, .MuiInput-underline:after':
      {
        borderBottomColor: 'rgba(255, 255, 255, 60%)',
        borderBottomStyle: 'solid',
      },
    '& .MuiFormHelperText-root, .MuiFormHelperText-root.Mui-disabled': {
      color: '#FF7474',
    },
  },
})(TextField);

export default TextFieldQueues;
