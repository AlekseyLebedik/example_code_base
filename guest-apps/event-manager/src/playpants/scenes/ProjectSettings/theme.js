import { grey, lightBlue, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { getDrawerStyles } from 'dw/core/components/MasterDetail/helpers';

export const PLAYPANTS_PROJECT_SETTINGS_NAVBAR_HEIGHT = 96;

export const useStyles = makeStyles(theme => ({
  eventManager: {
    bg: {
      canDrop: lightBlue[100],
      chip: grey[300],
      chipHover: grey[400],
      isOver: yellow[100],
      row: grey[100],
      tableRowHover: grey[200],
    },
    colors: {
      border: grey[50],
      chipSpan: grey.A400,
      chipSvg: grey[600],
      text: grey.A400,
      userColumnToggleFilter: lightBlue[200],
    },
  },
  masterDetailExpander: {
    top: '-10px !important',
    '& button': {
      color: 'rgba(0, 0, 0, 0.54) !important',
    },
  },
  masterDetailDrawerPaper: getDrawerStyles(
    PLAYPANTS_PROJECT_SETTINGS_NAVBAR_HEIGHT
  )(theme).drawerPaper,
}));
