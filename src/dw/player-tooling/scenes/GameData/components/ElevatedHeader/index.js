import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import UnoAccountSelector from 'dw/player-tooling/components/UnoAccountSelector';
import OptionsChipSelector from './components/OptionsChipSelector';
import GroupBySelector from './components/GroupBySelector';

function ElevationScroll({ children, target }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  target: PropTypes.object,
};
ElevationScroll.defaultProps = { target: undefined };

const useStyles = makeStyles(theme => ({
  header: {
    top: 'auto',
    backgroundColor: 'white',
    color: 'black',
    position: 'relative',
    paddingTop: '10px',
  },
  groupContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
  },
  optionsSelector: {
    textAlign: 'center',
  },
  collapseBtn: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4ac0f1',
    whiteSpace: 'nowrap',
  },
  [theme.breakpoints.down('sm')]: {
    accountSelector: {
      paddingTop: '14px !important',
      paddingBottom: '0 !important',
    },
  },
  [theme.breakpoints.up('md')]: {
    gridContainer: {
      display: 'flex',
      flexWrap: 'nowrap',
    },
    accountSelector: {
      maxWidth: 315,
    },
    optionsSelector: {
      maxWidth: 'none',
      flexBasis: '80%',
    },
    groupContainer: {
      maxWidth: 200,
    },
  },
}));

export default function ElevatedHeader({
  accountsServiceConfigId,
  expandAllSections,
  groupBy,
  highlightedOption,
  onSelectAccount,
  onToggleSections,
  selectedOptions,
  setGroupBy,
  setHighlightedOption,
  setSelectedOptions,
  target,
  unoUserData,
}) {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll target={target}>
        <AppBar className={classes.header}>
          <Toolbar>
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.gridContainer}
            >
              <Grid item xs={12} className={classes.accountSelector}>
                <UnoAccountSelector
                  accountsServiceConfigId={accountsServiceConfigId}
                  onSelectAccount={onSelectAccount}
                  unoUserData={unoUserData}
                  variant="outlined"
                />
              </Grid>
              {unoUserData?.accountID && (
                <>
                  <Grid item xs={8} className={classes.optionsSelector}>
                    <OptionsChipSelector
                      accountsServiceConfigId={accountsServiceConfigId}
                      groupBy={groupBy}
                      highlightedOption={highlightedOption}
                      selectedOptions={selectedOptions}
                      setHighlightedOption={setHighlightedOption}
                      setSelectedOptions={setSelectedOptions}
                      unoID={unoUserData.accountID}
                    />
                  </Grid>
                  <Grid item xs={4} className={classes.groupContainer}>
                    <GroupBySelector
                      groupBy={groupBy}
                      setGroupBy={setGroupBy}
                    />
                    <Button
                      className={classes.collapseBtn}
                      onClick={onToggleSections}
                    >
                      {!expandAllSections ? 'Open All' : 'Close All'}
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
}

ElevatedHeader.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  expandAllSections: PropTypes.bool.isRequired,
  groupBy: PropTypes.string.isRequired,
  highlightedOption: PropTypes.string.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
  onToggleSections: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  setGroupBy: PropTypes.func.isRequired,
  setHighlightedOption: PropTypes.func.isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  target: PropTypes.object,
  unoUserData: PropTypes.object,
};
ElevatedHeader.defaultProps = {
  target: undefined,
  unoUserData: {},
};
