import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import TextField from '@material-ui/core/TextField';

import {
  COLUMNS,
  GRID_OPTIONS,
  onFilterTextBoxChanged,
} from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/constants';
import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import * as actions from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/actions';
import * as selectors from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';
import * as styles from './index.module.css';

export const BuildTableBase = ({
  _onFetchBuildList,
  _onFetchBuildSchema,
  _onFetchDeploymentList,
  _onFetchTargetList,
  _onFetchUserParamsSchema,
  buildList,
  buildOptionHandlers,
  buildSchema,
  classes,
  currentProjectID,
  deployer,
  disabled,
  handleDeploy,
  isLoading,
  parsedBuildList,
  selectedActivity,
  targetList,
  unlockedDeployments,
  userParamsSchema,
  view,
}) => {
  const batchFetchThunderpants = () => {
    if (view !== '' && !isEmpty(deployer)) {
      const fetchParams = {
        projectID: currentProjectID,
        deployerID: deployer.id,
        view,
      };
      _onFetchBuildSchema(fetchParams);
      _onFetchUserParamsSchema(fetchParams);
      if (!disabled) {
        _onFetchBuildList(fetchParams);
        _onFetchDeploymentList(fetchParams);
        _onFetchTargetList(fetchParams);
      }
    }
  };

  useEffect(() => {
    batchFetchThunderpants();
  }, [selectedActivity.id]);

  useEffect(() => {
    batchFetchThunderpants(deployer, view);
  }, [view, disabled]);

  const columnDefs = COLUMNS(buildSchema, classes);

  const gridOptions = {
    ...GRID_OPTIONS,
    columnDefs,
    context: { targetList },
    detailCellRendererParams: {
      refreshStrategy: 'rows',
      buildOptionProps: {
        ...buildOptionHandlers,
        buildList,
        unlockedDeployments,
        userParamsSchema,
      },
      classes,
      disabled,
      handleDeploy,
      userParamsSchema,
    },
    rowData: parsedBuildList,
  };

  useEffect(() => {
    if (gridOptions.api)
      return isLoading
        ? gridOptions.api.showLoadingOverlay()
        : gridOptions.api.hideOverlay();
    return undefined;
  }, [isLoading]);

  return (
    <>
      <TextField
        helperText="Search table"
        disabled={false}
        label="Enter a search string"
        onChange={e => onFilterTextBoxChanged(e.target.value)}
        className={styles.search}
      />
      <div className={classNames(styles.table, 'ag-theme-material')}>
        <AgGridReact {...gridOptions} />
      </div>
    </>
  );
};

const makeMapStateToProps = () => {
  const activityDeployerSelector = selectors.makeActivityDeployerSelector();
  const parsedBuildListSelector = selectors.makeParsedBuildListSelector();
  const activityViewSelector = selectors.makeActivityViewSelector();
  const mapStateToProps = (state, props) => ({
    buildList: selectors.buildListSelector(state),
    buildSchema: selectors.buildSchemaSelector(state),
    currentProjectID: currentProjectIdSelector(state),
    deployer: activityDeployerSelector(state, props),
    isLoading: selectors.isThunderpantsLoadingSelector(state),
    parsedBuildList: parsedBuildListSelector(state, props),
    targetList: selectors.targetListSelector(state),
    unlockedDeployments: selectors.unlockedDeploymentsSelector(state),
    userParamsSchema: selectors.userParamsSchemaSelector(state),
    view: activityViewSelector(state, props),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  _onFetchBuildList: bindActionCreators(actions.fetchBuildList, dispatch),
  _onFetchBuildSchema: bindActionCreators(actions.fetchBuildSchema, dispatch),
  _onFetchDeploymentList: bindActionCreators(
    actions.fetchDeploymentList,
    dispatch
  ),
  _onFetchTargetList: bindActionCreators(actions.fetchTargetList, dispatch),
  _onFetchUserParamsSchema: bindActionCreators(
    actions.fetchUserParamsSchema,
    dispatch
  ),
});

export default connect(makeMapStateToProps, dispatchToProps, null, {
  forwardRef: true,
})(BuildTableBase);

BuildTableBase.propTypes = {
  _onFetchBuildList: PropTypes.func.isRequired,
  _onFetchBuildSchema: PropTypes.func.isRequired,
  _onFetchDeploymentList: PropTypes.func.isRequired,
  _onFetchTargetList: PropTypes.func.isRequired,
  _onFetchUserParamsSchema: PropTypes.func.isRequired,
  buildList: PropTypes.arrayOf(PropTypes.object).isRequired,
  buildOptionHandlers: PropTypes.object.isRequired,
  buildSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  currentProjectID: PropTypes.number.isRequired,
  deployer: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleDeploy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  parsedBuildList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedActivity: PropTypes.object.isRequired,
  targetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  unlockedDeployments: PropTypes.object.isRequired,
  userParamsSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  view: PropTypes.string.isRequired,
};
