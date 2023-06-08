import React, { useState } from 'react';
import { connect } from 'react-redux';
import { submit, getFormValues } from 'redux-form';
import isEqual from 'lodash/isEqual';

import { fetchVariablesSetDetails as apiFetchVariablesSetDetails } from 'dw/online-configuration/services/storages';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';

import {
  deleteVariablesSet,
  updateVariablesSet as updateVariablesSetAction,
  propagateVariablesSet,
} from '../../actions';
import { PROPAGAT_VARIABLES_SET_FORM_NAME } from '../../constants';
import { UPDATE_VARIABLES_SET_FORM_NAME } from './constants';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => {
  const {
    selectedListItem,
    selectedListItemDetails,
    variableMapping = {},
  } = state.Scenes.Storage.PublisherVariables.VariablesSets;
  return {
    selectedListItem,
    selectedListItemDetails,
    reactProps: props,
    initialValues: selectedListItemDetails && {
      ...selectedListItemDetails,
      variables: Object.entries(selectedListItemDetails.variables)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([key, value]) => ({
          key,
          value,
        })),
      minorVersion: parseInt(selectedListItemDetails.minorVersion, 10) + 1,
      isMajorUpdate: false,
    },
    isPropagateModalVisible: ModalHandlers.isVisibleSelector(state),
    variableMapping,
    formValues: getFormValues(UPDATE_VARIABLES_SET_FORM_NAME)(state),
  };
};

const dispatchToProps = dispatch => ({
  deleteVariablesSet: variableSetId =>
    dispatch(deleteVariablesSet(variableSetId)),
  updateVariablesSet: (variableSetId, values) =>
    dispatch(updateVariablesSetAction(variableSetId, values)),
  openPropagateModal: () => dispatch(ModalHandlers.open()),
  closePropagateModal: () => dispatch(ModalHandlers.close()),
  propagateOnRemoteSubmit: () =>
    dispatch(submit(PROPAGAT_VARIABLES_SET_FORM_NAME)),
  onPropagateVariablesSetHandler: values =>
    new Promise((resolve, reject) =>
      dispatch(propagateVariablesSet(values, resolve, reject))
    ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selectedListItem } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    updateVariablesSet: values =>
      selectedListItem &&
      dispatchProps.updateVariablesSet(selectedListItem.variableSetId, values),
    propagateModalProps: {
      openPropagateModal: dispatchProps.openPropagateModal,
      closePropagateModal: dispatchProps.closePropagateModal,
      isPropagateModalVisible: stateProps.isPropagateModalVisible,
      propagateOnRemoteSubmit: dispatchProps.propagateOnRemoteSubmit,
      onPropagateVariablesSetHandler:
        dispatchProps.onPropagateVariablesSetHandler,
    },
  };
};

const VariablesSetDetailsComponent = props => {
  const [
    overwrittenVariablesDialogDisplay,
    setOverwrittenVariablesDialogDisplay,
  ] = useState(false);

  const cancellablePromise = useCancellablePromise();
  const snackbarActions = useSnackbar();
  const validateVariablesSet = () => {
    const {
      selectedListItem: { variableSetId },
      selectedListItemDetails,
      formValues,
      updateVariablesSet,
    } = props;
    const validate = async () => {
      try {
        const {
          data: { data },
        } = await cancellablePromise(
          apiFetchVariablesSetDetails,
          variableSetId
        );
        if (!isEqual(data, selectedListItemDetails)) {
          setOverwrittenVariablesDialogDisplay(true);
        } else {
          updateVariablesSet(formValues);
        }
      } catch (e) {
        if (e.isCanceled) return;
        const {
          response: { data },
        } = e;
        snackbarActions.error(data?.error?.msg);
      }
    };
    validate();
  };

  const cancelOverwrittenVariablesDialog = () =>
    setOverwrittenVariablesDialogDisplay(false);

  return (
    <StatelessComponent
      {...props}
      validateVariablesSet={validateVariablesSet}
      overwrittenVariablesDialogDisplay={overwrittenVariablesDialogDisplay}
      cancelOverwrittenVariablesDialog={cancelOverwrittenVariablesDialog}
    />
  );
};

VariablesSetDetailsComponent.propTypes = {
  ...StatelessComponent.propTypes,
};

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(VariablesSetDetailsComponent);
