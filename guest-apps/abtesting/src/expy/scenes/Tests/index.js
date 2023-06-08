import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import CloseIcon from '@material-ui/icons/Close';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Table from '../Table';
import Preview from '../Preview';
import Metrics from './support/Metrics';

import { setOpenDrawer, setCloseDrawer } from './state/actions';

import { useStyles } from './styles';

export default function Tests() {
  const classes = useStyles();

  const history = useHistory();
  const { testId: activeTestId } = useParams();

  const [isDrawerFullScreen, setDrawerFullScreen] = useState(false);

  const isDrawerOpen = useSelector(state => state.Expy.drawer.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeTestId && !isDrawerOpen) dispatch(setOpenDrawer());
    if (!activeTestId && isDrawerOpen) dispatch(setCloseDrawer());
  }, [activeTestId]);

  return (
    <div className={classes.rootContainer}>
      <main className={classes.main}>
        <div
          className={cn(classes.content, {
            [classes.contentShift]: isDrawerOpen,
          })}
        >
          <div className={classes.headerContainer}>
            <h2 className={classes.title}>Test Catalog</h2>
            <Metrics />
          </div>
          <Table />
        </div>
        <Drawer
          className={cn(classes.drawer, {
            [classes.zIndex]: !isDrawerOpen,
          })}
          variant="persistent"
          anchor="right"
          open={isDrawerOpen}
          classes={{
            paper: isDrawerFullScreen
              ? classes.drawerPaperFullWidth
              : classes.drawerPaper,
          }}
        >
          <div style={{ position: 'relative' }}>
            <div className={classes.drawerBtnContainer}>
              <Button
                className={classes.expandBtn}
                variant="outlined"
                size="small"
                onClick={() => setDrawerFullScreen(!isDrawerFullScreen)}
              >
                <AspectRatioIcon />
              </Button>
              <Button
                className={classes.closeBtn}
                variant="outlined"
                size="small"
                onClick={() => {
                  history.push('/abtesting/expy/test-catalog');
                  setDrawerFullScreen(false);
                  dispatch(setCloseDrawer());
                }}
              >
                <CloseIcon />
              </Button>
            </div>
            {isDrawerOpen && <Preview />}
          </div>
        </Drawer>
      </main>
    </div>
  );
}
