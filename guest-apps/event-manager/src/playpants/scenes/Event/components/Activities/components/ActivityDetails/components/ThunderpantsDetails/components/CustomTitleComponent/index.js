import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { useDidUpdateEffect, useEMPermissionsResult } from 'playpants/hooks';

import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'dw/core/components/Select';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import { currentProjectIdSelector } from 'playpants/components/App/selectors';

import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { TPANTS_FILTER_OPTIONS } from './constants';
import * as styles from './index.module.css';

const CustomTitleComponent = ({
  _onDeleteDeployment,
  _onFetchDeployerList,
  _onFetchViewList,
  _onSetFilterType,
  currentProjectID,
  deployer,
  deployerList: _deployerList,
  deploymentList,
  disabled,
  eventData: { env_type: envType },
  filterType,
  isScheduledEmpty,
  onUpdate,
  selectedActivity,
  view,
  viewList,
}) => {
  const { wipPermission } = useEMPermissionsResult();
  const onFetchViewList = () =>
    !isEmpty(deployer) &&
    _onFetchViewList({
      projectID: currentProjectID,
      deployerID: deployer.id,
    });

  useEffect(() => {
    _onFetchDeployerList({ projectID: currentProjectID });
    onFetchViewList();
  }, [selectedActivity.id]);

  useDidUpdateEffect(() => {
    onFetchViewList();
  }, [deployer.id]);

  const deployerList =
    disabled || !isScheduledEmpty
      ? [{ environment: envType, name: deployer.name }]
      : _deployerList;

  const handleDeployerChange = ({ target: { value } }) => {
    onUpdate({
      ...selectedActivity,
      activity: {
        ...selectedActivity.activity,
        deployer: find(deployerList, ({ name }) => name === value),
      },
    });
  };

  const handleDeploymentDump = () => {
    const params = {
      projectID: currentProjectID,
      deployerID: deployer.id,
      view,
    };
    deploymentList.forEach(({ uid }) => _onDeleteDeployment({ uid, params }));
  };

  const handleFilterTypeChange = e => {
    _onSetFilterType(e.target.value);
  };

  const handleViewChange = ({ target: { value } }) => {
    onUpdate({
      ...selectedActivity,
      activity: {
        ...selectedActivity.activity,
        view: value,
      },
    });
  };

  return (
    <div className={styles.customTitleContainer}>
      <div className={styles.customTitleElement}>
        <Select
          data-cy="deployerSelect"
          disabled={disabled || !isScheduledEmpty}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Deployer</InputAdornment>
            ),
          }}
          onChange={handleDeployerChange}
          value={deployer.name}
        >
          <MenuItem value="" key="tpantsSelect-default" disabled>
            Select a Deployer
          </MenuItem>
          {deployerList
            .filter(({ environment }) => environment === envType)
            .map(({ name: elName }) => (
              <MenuItem
                key={`tpantsSelect-${elName}`}
                value={elName}
                data-cy="deployerSelectOption"
              >
                {elName}
              </MenuItem>
            ))}
        </Select>
      </div>
      <div className={styles.customTitleElement}>
        <Select
          data-cy="viewSelect"
          disabled={disabled || !isScheduledEmpty}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">View</InputAdornment>
            ),
          }}
          onChange={handleViewChange}
          value={view}
        >
          <MenuItem value="" key="tpantsSelect-default" disabled>
            Select a Title
          </MenuItem>
          {isEmpty(viewList) ? (
            <MenuItem key={`tpantsSelect-${view}`} value={view}>
              {view}
            </MenuItem>
          ) : (
            viewList.map(viewEl => (
              <MenuItem
                key={`tpantsSelect-${view}`}
                value={viewEl}
                data-cy="viewSelectOption"
              >
                {viewEl}
              </MenuItem>
            ))
          )}
        </Select>
      </div>
      <div className={styles.customTitleElement}>
        <Select
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Filter</InputAdornment>
            ),
          }}
          onChange={handleFilterTypeChange}
          value={filterType}
        >
          <MenuItem value="" disabled>
            Select a Title
          </MenuItem>
          {TPANTS_FILTER_OPTIONS.map(({ label, value }) => (
            <MenuItem key={`tpantsSelect/${value}`} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.customTitleElement}>
        {wipPermission && (
          <ConfirmActionComponent
            tooltip="Dump Deployments"
            confirm={{
              title: 'Confirm Deployment Dump',
              confirmMsg:
                'Are you sure you would like to delete all deployments? This is a destructive operation.',
              mainButtonLabel: 'Confirm',
            }}
            component="IconButton"
            onClick={handleDeploymentDump}
            color="secondary"
          >
            delete_sweep
          </ConfirmActionComponent>
        )}
      </div>
    </div>
  );
};

const makeMapStateToProps = () => {
  const activityDeployerSelector = selectors.makeActivityDeployerSelector();
  const activityViewSelector = selectors.makeActivityViewSelector();
  const mapStateToProps = (state, props) => ({
    currentProjectID: currentProjectIdSelector(state),
    deployer: activityDeployerSelector(state, props),
    deployerList: selectors.deployerListFilteredSelector(state),
    deploymentList: selectors.deploymentListSelector(state),
    filterType: selectors.filterTypeSelector(state),
    isScheduledEmpty: selectors.isScheduledEmptySelector(state, props),
    view: activityViewSelector(state, props),
    viewList: selectors.viewListSelector(state),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  _onDeleteDeployment: bindActionCreators(actions.deleteDeployment, dispatch),
  _onSetFilterType: bindActionCreators(actions.setFilterType, dispatch),
  _onFetchViewList: bindActionCreators(actions.fetchViewList, dispatch),
  _onFetchDeployerList: bindActionCreators(actions.fetchDeployerList, dispatch),
});

CustomTitleComponent.propTypes = {
  _onDeleteDeployment: PropTypes.func.isRequired,
  _onSetFilterType: PropTypes.func.isRequired,
  _onFetchViewList: PropTypes.func.isRequired,
  _onFetchDeployerList: PropTypes.func.isRequired,
  currentProjectID: PropTypes.number.isRequired,
  deployer: PropTypes.object.isRequired,
  deployerList: PropTypes.arrayOf(PropTypes.object).isRequired,
  deploymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  eventData: PropTypes.object.isRequired,
  filterType: PropTypes.string.isRequired,
  isScheduledEmpty: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  viewList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(
  makeMapStateToProps,
  dispatchToProps
)(CustomTitleComponent);
