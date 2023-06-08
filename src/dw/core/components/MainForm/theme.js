import { createMuiTheme } from '@material-ui/core/styles';

export const FormTheme = defaultTheme =>
  createMuiTheme({
    ...defaultTheme,
    overrides: {
      ...defaultTheme.overrides,
      MuiFormControl: {
        root: {
          marginTop: 22,
        },
        fullWidth: {
          width: '97%',
        },
      },
    },
  });
