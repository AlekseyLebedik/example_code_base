import get from 'lodash/get';
import { masterWidth } from './constants';

export const getDrawerStyles =
  (extraNavbarHeight = null) =>
  theme => {
    const navbarHeight = get(theme, 'navigationBar.height', 40);
    const sideMargin = get(theme, 'navigationBar.sideMargin', 0);

    return {
      expander: {
        [theme.breakpoints.up('sm')]: {
          display: 'initial',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
        top: `${
          (extraNavbarHeight && navbarHeight + extraNavbarHeight) || -10
        }px !important`,
      },
      drawerPaper: {
        [theme.breakpoints.up('md')]: {
          marginLeft: sideMargin,
        },
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
        width: masterWidth,
        marginTop:
          (extraNavbarHeight && navbarHeight + extraNavbarHeight) ||
          navbarHeight,
        height: `calc(100% - ${
          (extraNavbarHeight && navbarHeight + extraNavbarHeight) ||
          navbarHeight
        }px)`,
        borderRight: 0,
        backgroundColor: '#f5f5f6',
      },
    };
  };
