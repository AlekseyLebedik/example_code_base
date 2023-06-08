import { makeStyles } from '@material-ui/core/styles';
import { NAVBAR_HEIGHT } from '@demonware/devzone-core/constants';
import { EXPY_HEADER_HEIGHT } from '../../constants';

export const useStyles = makeStyles({
  tableContainer: {
    height: `calc(100vh - ${NAVBAR_HEIGHT + EXPY_HEADER_HEIGHT}px)`,
    '& .ag-header-cell:first-of-type:not(.ag-header-cell-moving):hover': {
      backgroundColor: 'transparent',
    },
    '& .ag-header-cell:not(.ag-column-resizing) + .ag-header-cell:not(.ag-header-cell-moving):hover':
      {
        backgroundColor: 'transparent',
      },
    '& .ag-root-wrapper-body': {
      zIndex: 0,
    },
  },
});
