import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import find from 'lodash/find';
import filter from 'lodash/filter';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import * as actions from './actions';
import * as selectors from './selectors';

import {
  addBuildToActivityBuildList,
  isDeployerViable,
  parseDeployData,
  parseLockData,
  parseModifyData,
  parseModifyFormData,
} from './helpers';
import { THUNDERPANTS_PARAMS_FORM_NAME } from './components/Forms/ThunderpantsDeploymentForm/constants';
import { THUNDERPANTS_PASSWORD_CHECK_FORM_NAME } from './components/Forms/PasswordCheckForm/constants';
import { THUNDERPANTS_CONFIRM_ACTION_FORM_NAME } from './components/Forms/ConfirmActionForm/constants';

import ThunderpantsStateless from './presentational';

export const ThunderpantsDetailsBase = ({
  _onAddUnlockedDeployment,
  _onCheckDeploymentPassword,
  _disabled,
  _onClearFormData,
  _onClearThunderpantsActivity,
  _onClose,
  _onFetchDeploymentList,
  _onModifyLock,
  _onOpen,
  _onSetFormData,
  ...restProps
}) => {
  const { onUpdate, selectedActivity } = restProps;

  useEffect(() => {
    _onClearThunderpantsActivity();
  }, [selectedActivity.id]);

  /** Remove selected deployment from scheduled list.
   * @param {Object} data                   - Row data returned from Ag-Grid
   * @param {string} data.uid               - Unique ID of deployment
   * @param {string} data.source_name
   * @param {Object} data.base
   * @param {Object} data.properties        - Column definitions for Ag-Grid
   * @param {Object} data.ui_properties     - 'Folder', 'version'
   * @param {Object} data.badges            - Badge count for display on Ag-Grid
   */
  const handleDeploy = ({ data, targets, userParamsSchema }) => {
    const { uid } = data;
    _onSetFormData({
      formData: { build_uid: uid },
      formSchema: userParamsSchema,
      formSummaryData: data,
      formTargets: targets,
      formType: 'deploy',
      onSuccess: () => _onOpen(THUNDERPANTS_PARAMS_FORM_NAME),
    });
  };

  /** Remove selected deployment from scheduled list.
   * @param {Object} data                   - Row data returned from Ag-Grid
   * @param {string} data.uid               - Unique ID of deployment
   * @param {string} data.build_uid
   * @param {string} [data.view_name]
   * @param {string} data.target_name
   * @param {Object} data.user_params
   * @param {number} [data.last_timestamp]
   * @param {string} [data.status]
   * @param {string} [data.tp_client]
   * @param {Object} [data.tp]
   * @param {string} data.type              - 'Deploy' || 'Undeploy' || 'Live' || 'Modification'
   * @param {Object[]} list                 - List of builds
   */
  const handleModify = ({
    buildList,
    data,
    unlockedDeployments,
    userParamsSchema,
  }) => {
    const { lock } = data;
    _onSetFormData({
      formData: parseModifyFormData(data),
      formNext: THUNDERPANTS_PARAMS_FORM_NAME,
      formSchema: userParamsSchema,
      formSummaryData: find(buildList, build => build.uid === data.build_uid),
      formType: 'modify',
      onSuccess: () =>
        !unlockedDeployments[data.uid] && lock
          ? _onOpen(THUNDERPANTS_PASSWORD_CHECK_FORM_NAME)
          : _onOpen(THUNDERPANTS_PARAMS_FORM_NAME),
    });
  };

  /** Add new deployment into deploy list, modify a live deployment, or modify a scheduled deployment.
   * @param {Object} data                   - Row data returned from Ag-Grid
   * @param {string} data.build_uid         - ID of build
   * @param {string} data.deploymentType    - Type of deployment
   * @param {string} data.uid               - Unique ID of deployment
   * @param {string} data.target            - Name of specific target
   * @param {string} data.type              - Form type: 'deploy' || 'modify'
   * @param {...Object} data.user_params    - Remaining user params.
   * @param {boolean} error                 - If error occured during validation of form fields
   */
  const handleSubmit = ({
    data: {
      build_uid: buildUID,
      buildData,
      deploymentType,
      target,
      type,
      uid,
      userParams,
    },
    activityBuildList,
  }) => {
    const newActivityBuildList = addBuildToActivityBuildList({
      activityBuildList,
      build: buildData,
    });

    if (type === 'deploy') {
      const parsedDeployments = parseDeployData({
        buildData,
        buildUID,
        target,
        userParams,
      });
      const deploy = [
        ...selectedActivity.activity.deploy,
        ...parsedDeployments,
      ];
      onUpdate({
        ...selectedActivity,
        activity: {
          ...selectedActivity.activity,
          buildList: newActivityBuildList,
          deploy,
        },
      });
    } else {
      const translatedType = deploymentType === 'deploy' ? 'deploy' : 'modify';
      const scheduledType = {
        [translatedType]: [
          ...parseModifyData({
            buildData,
            buildUID,
            deployments: selectedActivity.activity[translatedType],
            target,
            uid,
            userParams,
          }),
        ],
      };
      onUpdate({
        ...selectedActivity,
        activity: {
          ...selectedActivity.activity,
          buildList: newActivityBuildList,
          ...scheduledType,
        },
      });
    }
    _onClearFormData();
    _onClose(THUNDERPANTS_PARAMS_FORM_NAME);
  };

  /**
   *
   * @param {*} data
   * @param {*} data.uid
   * @param {*} data.lock
   * @param {*} data.lock.comment
   * @param {*} data.lock.password
   * @param {*} data.deploymentType
   */
  const handlePasswordSubmit = ({
    currentProjectID,
    data,
    deployer,
    formNext,
    formType,
    onFailure,
    view,
  }) => {
    const { deployment, form } = data;
    const { uid, deploymentType } = deployment;
    const parsedFormData = parseLockData(form.lock);
    const params = {
      projectID: currentProjectID,
      deployerID: deployer.id,
      deploymentID: uid,
      view,
    };
    const parsedData =
      formType === 'setLock' ? { lock: parsedFormData } : parsedFormData;
    let wrapUp;
    // Handle password check
    if (!['setLock', 'unsetLock'].includes(formType)) {
      wrapUp = () => {
        _onClose(THUNDERPANTS_PASSWORD_CHECK_FORM_NAME);
        _onAddUnlockedDeployment({ uid, password: parsedFormData.password });
        _onOpen(formNext);
      };
      if (deploymentType !== 'deploy') {
        return _onCheckDeploymentPassword({
          params,
          data: parsedData,
          onSuccess: wrapUp,
          onFailure,
        });
      }
      return wrapUp();
    }

    // Handle modify lock
    wrapUp = () => {
      _onClose(THUNDERPANTS_PASSWORD_CHECK_FORM_NAME);
      _onClearFormData();
      _onFetchDeploymentList(params);
    };
    if (deploymentType !== 'deploy') {
      return _onModifyLock({
        params,
        data: parsedData,
        onSuccess: wrapUp,
        onFailure,
      });
    }
    const filteredList = selectedActivity.activity[deploymentType].map(el => {
      if (el.uid === uid) {
        if (formType === 'setLock') {
          return { ...el, ...parsedData };
        }
        const { lock, ...rest } = el;
        return rest;
      }
      return el;
    });
    onUpdate({
      ...selectedActivity,
      activity: {
        ...selectedActivity.activity,
        [deploymentType]: filteredList,
      },
    });
    return wrapUp();
  };

  const handleModifyLock = ({ lock, uid, type }, modifyType) => {
    _onSetFormData({
      formData: { lock, uid, deploymentType: type },
      formType: modifyType,
      onSuccess: () => _onOpen(THUNDERPANTS_PASSWORD_CHECK_FORM_NAME),
    });
  };

  /** Adds selected deployment into undeployment list.
   * @param {Object} data                   - Row data returned from Ag-Grid
   * @param {string} data.uid               - Unique ID of deployment
   * @param {string} data.build_uid
   * @param {string} data.view_name
   * @param {string} data.target_name
   * @param {Object} data.user_params
   * @param {number} data.last_timestamp
   * @param {string} data.status
   * @param {string} data.tp_client
   * @param {Object} data.tp
   * @param {string} data.type              - 'Deploy' || 'Undeploy' || 'Live' || 'Modification'
   */
  const handleUndeploy = ({ activityBuildList, build, data }) => {
    const payload = {
      ...data,
      tp: {
        ...data.tp,
        auto_tag: { ...data.tp.auto_tag, build },
      },
    };
    const undeploy = [...selectedActivity.activity.undeploy, payload];
    onUpdate({
      ...selectedActivity,
      activity: {
        ...selectedActivity.activity,
        buildList: addBuildToActivityBuildList({ activityBuildList, build }),
        undeploy,
      },
    });
  };

  /** Remove selected deployment from scheduled list.
   * Also remove build from build list if all relevant deployments are removed from this activity.
   * @param {Object} data                   - Row data returned from Ag-Grid
   * @param {string} data.uid               - Unique ID of deployment
   * @param {string} data.build_uid
   * @param {string} [data.view_name]
   * @param {string} data.target_name
   * @param {Object} data.user_params
   * @param {number} [data.last_timestamp]
   * @param {string} [data.status]
   * @param {string} [data.tp_client]
   * @param {Object} [data.tp]
   * @param {string} data.type              - 'Deploy' || 'Undeploy' || 'Live' || 'Modification'
   */
  const handleClear = ({ deployment: { build_uid: buildUID, type, uid } }) => {
    const clearedDeployment = {
      [type]: filter(
        selectedActivity.activity[type],
        deployment => deployment.uid !== uid
      ),
    };
    const activityUpdateValue = {
      ...selectedActivity.activity,
      ...clearedDeployment,
    };
    const { deploy, undeploy, modify } = activityUpdateValue;
    const combinedDeployments = [...deploy, ...undeploy, ...modify];

    // Remove build from build list if no more relevant deployments exist on this activity.
    const filteredBuildList = !find(
      combinedDeployments,
      el => el.build_uid === buildUID
    )
      ? filter(
          selectedActivity.activity.buildList,
          buildListEl => buildListEl.uid !== buildUID
        )
      : selectedActivity.activity.buildList;

    onUpdate({
      ...selectedActivity,
      activity: {
        ...selectedActivity.activity,
        ...clearedDeployment,
        buildList: filteredBuildList,
      },
    });
  };

  const handleConfirmAction = ({ actionType, data, unlockedDeployments }) => {
    const { lock, uid, type } = data;
    _onSetFormData({
      formData: { ...data, deploymentType: type },
      formNext: THUNDERPANTS_CONFIRM_ACTION_FORM_NAME,
      formType: actionType,
      onSuccess: () =>
        !unlockedDeployments[uid] && lock
          ? _onOpen(THUNDERPANTS_PASSWORD_CHECK_FORM_NAME)
          : _onOpen(THUNDERPANTS_CONFIRM_ACTION_FORM_NAME),
    });
  };

  const handleConfirmActionSubmit = ({
    activityBuildList,
    build,
    deployment,
    type,
  }) => {
    if (type === 'undeploy') {
      handleUndeploy({ activityBuildList, build, deployment });
    } else {
      handleClear({ deployment });
    }
    _onClose(THUNDERPANTS_CONFIRM_ACTION_FORM_NAME);
    _onClearFormData();
  };

  return (
    <ThunderpantsStateless
      {...restProps}
      disabled={_disabled}
      handleDeploy={handleDeploy}
      buildOptionHandlers={{
        handleConfirmAction,
        handleModify,
        handleModifyLock,
      }}
      modalFormHandlers={{
        handleConfirmActionSubmit,
        handlePasswordSubmit,
        handleSubmit,
      }}
    />
  );
};

const makeMapStateToProps = () => {
  const activityDeployerSelector = selectors.makeActivityDeployerSelector();
  const mapStateToProps = (state, props) => ({
    _disabled:
      props.disabled ||
      !isDeployerViable({
        deployer: activityDeployerSelector(state, props),
        deployerList: selectors.deployerListFilteredSelector(state),
      }),
  });
  return mapStateToProps;
};

const dispatchToProps = dispatch => ({
  _onAddUnlockedDeployment: bindActionCreators(
    actions.addUnlockedDeployment,
    dispatch
  ),
  _onCheckDeploymentPassword: bindActionCreators(
    actions.checkDeploymentPassword,
    dispatch
  ),
  _onClearFormData: bindActionCreators(actions.clearFormData, dispatch),
  _onClose: form => dispatch(ModalHandlers.close(form)),
  _onClearThunderpantsActivity: bindActionCreators(
    actions.clearThunderpantsActivity,
    dispatch
  ),
  _onFetchDeploymentList: bindActionCreators(
    actions.fetchDeploymentList,
    dispatch
  ),
  _onModifyLock: bindActionCreators(actions.modifyLock, dispatch),
  _onOpen: form => dispatch(ModalHandlers.open(form)),
  _onSetFormData: bindActionCreators(actions.setFormData, dispatch),
});

export default connect(
  makeMapStateToProps,
  dispatchToProps
)(ThunderpantsDetailsBase);

ThunderpantsDetailsBase.propTypes = {
  _disabled: PropTypes.bool.isRequired,
  _onAddUnlockedDeployment: PropTypes.func.isRequired,
  _onCheckDeploymentPassword: PropTypes.func.isRequired,
  _onClearFormData: PropTypes.func.isRequired,
  _onClearThunderpantsActivity: PropTypes.func.isRequired,
  _onClose: PropTypes.func.isRequired,
  _onFetchDeploymentList: PropTypes.func.isRequired,
  _onModifyLock: PropTypes.func.isRequired,
  _onOpen: PropTypes.func.isRequired,
  _onSetFormData: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
};
