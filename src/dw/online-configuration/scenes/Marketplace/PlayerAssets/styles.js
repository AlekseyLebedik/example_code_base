import { makeStyles } from '@material-ui/core/styles';

export const muiStyles = () => ({
  rootButton: { fontSize: '20px', zIndex: '1' },
  disabledButton: { color: 'gray' },
  hidenButton: { visibility: 'hidden' },
  rootCheckbox: { zIndex: '1' },
  actionButtonContainer: {
    width: '55px',
  },
});

export const useStyles = makeStyles(muiStyles);
