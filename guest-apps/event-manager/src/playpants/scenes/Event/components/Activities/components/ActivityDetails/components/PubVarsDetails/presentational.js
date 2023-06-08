import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Fade from '@material-ui/core/Fade';

import { NO_TITLE_SELECTED } from 'playpants/scenes/Event/components/Activities/constants';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import { makeStyles } from '@material-ui/core';
import ActivityTitle from '../ActivityTitle';

import ChangedVarSets from './components/ChangedVarSets';
import CustomTitleComponent from './components/CustomTitleComponent';
import Namespace from './components/Namespace';
import RevertPubVarsDialog from './components/RevertNewPubVarsDialog';

import { hasNewVariables } from './helpers';

const useStyles = makeStyles(theme => ({
  saveButton: {
    position: 'absolute',
    right: `${theme.spacing(2)}px`,
    bottom: `${theme.spacing(2)}px`,
  },
  activityContainer: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    position: 'relative',
  },
  warning: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    color: theme.palette.warning.main,
    textAlign: 'center',
  },
}));

const PubVarsStateless = ({
  classes,
  clearVariable,
  createVariable,
  disabled,
  filterNamespaces,
  filterValues,
  hideChangedVarSets,
  modifyVariable,
  noTitleSelected,
  pubVarsActivity,
  selectedNamespace,
  selectedTitle,
  selectedValues,
  toggleChangedVarSets,
  hasChanges,
  onSaveActivity,
}) => {
  const styles = useStyles();
  return (
    <>
      <ActivityTitle
        customComponent={
          <CustomTitleComponent
            disabled={disabled || !selectedTitle}
            filterNamespaces={filterNamespaces}
            filterValues={filterValues}
            hideChangedVarSets={hideChangedVarSets}
            selectedValues={selectedValues}
            toggleChangedVarSets={toggleChangedVarSets}
          />
        }
        RevertDialog={
          hasNewVariables(pubVarsActivity) ? RevertPubVarsDialog : null
        }
      />
      {noTitleSelected ? (
        <MainDetailsEmpty msg={NO_TITLE_SELECTED} />
      ) : (
        <div
          className={cn(classes.activityContainer, styles.activityContainer)}
        >
          <Fade in={hasChanges} timeout={1000}>
            <div className={styles.warning}>
              Make sure you hit the <strong>Save</strong> button at the bottom
              to apply changes you&apos;ve made
            </div>
          </Fade>
          {!disabled && selectedNamespace && hideChangedVarSets && (
            <Namespace
              clearVariable={clearVariable}
              createVariable={createVariable}
              disabled={disabled}
              filterValues={filterValues}
              modifyVariable={modifyVariable}
              selectedNamespace={selectedNamespace}
            />
          )}
          {(disabled || !hideChangedVarSets) && (
            <ChangedVarSets
              clearVariable={clearVariable}
              disabled={disabled}
              modifyVariable={modifyVariable}
              pubVarsActivity={pubVarsActivity}
            />
          )}
        </div>
      )}
      <Fade in={hasChanges} timeout={1000}>
        <Fab
          color="primary"
          onClick={onSaveActivity}
          className={styles.saveButton}
          aria-label="save"
        >
          <Icon>save</Icon>
        </Fab>
      </Fade>
    </>
  );
};

PubVarsStateless.propTypes = {
  classes: PropTypes.object.isRequired,
  clearVariable: PropTypes.func.isRequired,
  createVariable: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  filterNamespaces: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired,
  hideChangedVarSets: PropTypes.bool.isRequired,
  modifyVariable: PropTypes.func.isRequired,
  noTitleSelected: PropTypes.bool.isRequired,
  pubVarsActivity: PropTypes.object.isRequired,
  selectedNamespace: PropTypes.object,
  selectedTitle: PropTypes.object,
  selectedValues: PropTypes.object.isRequired,
  toggleChangedVarSets: PropTypes.func.isRequired,
  hasChanges: PropTypes.bool.isRequired,
  onSaveActivity: PropTypes.func.isRequired,
};

PubVarsStateless.defaultProps = {
  selectedNamespace: null,
  selectedTitle: null,
};

export default PubVarsStateless;
