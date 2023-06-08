import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm } from 'redux-form';
import { Row, Col } from 'antd';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from 'dw/core/components/FormFields/Input';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import Dialog from 'dw/core/components/Dialog';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import KeyValue from 'dw/core/components/KeyValue';
import {
  STORAGE_ADD_PUBLISHER_VARIABLES,
  STORAGE_DELETE_PUBLISHER_VARIABLES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import AGGridKeyValueField from '../AGGridKeyValueField';
import VariablesSetDetailsEmpty from '../VariablesSetDetailsEmpty';
import PropagateVariablesSetModal from '../PropagateVariablesSetModal';

import {
  IS_MAJOR_UPDATE_HELP,
  UPDATE_VARIABLES_SET_FORM_NAME,
} from './constants';

import './presentational.css';

const VariablesSetDetails = props => {
  const hasAddPermission = useCurrentEnvPermission(
    STORAGE_ADD_PUBLISHER_VARIABLES
  );
  const hasDeletePermission = useCurrentEnvPermission(
    STORAGE_DELETE_PUBLISHER_VARIABLES
  );
  const {
    selectedListItem,
    selectedListItemDetails,
    deleteVariablesSet,
    updateVariablesSet,
    validateVariablesSet,
    formValues,
    overwrittenVariablesDialogDisplay,
    cancelOverwrittenVariablesDialog,
    handleSubmit,
    pristine,
    submitting,
    variableMapping,
    propagateModalProps,
  } = props;
  const {
    isPropagateModalVisible,
    openPropagateModal,
    closePropagateModal,
    propagateOnRemoteSubmit,
    onPropagateVariablesSetHandler,
  } = propagateModalProps;
  const footerButtons = [
    <Button
      key="cancel"
      disabled={submitting}
      onClick={cancelOverwrittenVariablesDialog}
    >
      Cancel
    </Button>,
    <Button
      key="overwrite"
      disabled={submitting}
      color="primary"
      focusRipple
      onClick={() => {
        updateVariablesSet(formValues);
        cancelOverwrittenVariablesDialog();
      }}
    >
      {submitting ? 'Overwriting...' : 'Overwrite'}
    </Button>,
  ];
  const title = selectedListItem && (
    <>
      <div className="flex-grow">
        Namespace <strong>{selectedListItem.namespace}</strong>
      </div>
      <div className="flex-grow">
        Context <strong>{selectedListItem.context}</strong>
      </div>
      <div className="flex-grow">
        GroupID <strong>{selectedListItem.groupId}</strong>
      </div>
    </>
  );
  const Maincomponent = () => (
    <div className="details__container variables-sets flex-rows-container">
      <Form
        className="form-container"
        onSubmit={handleSubmit(validateVariablesSet)}
      >
        <SectionTitle title={title}>
          {!pristine && hasAddPermission && (
            <Tooltip title="Save">
              <div>
                <IconButton disabled={submitting} type="submit" color="inherit">
                  <Icon>save</Icon>
                </IconButton>
              </div>
            </Tooltip>
          )}
          {hasAddPermission && selectedListItemDetails && (
            <FeatureSwitchesCheck
              featureSwitches={[fs.PUBLISHER_VARIABLES_PROPAGATE_VARIABLE_SET]}
              isStaffAllowed={false}
            >
              <PropagateVariablesSetModal
                visible={isPropagateModalVisible}
                onCancel={closePropagateModal}
                onRemoteSubmit={propagateOnRemoteSubmit}
                onSubmit={onPropagateVariablesSetHandler}
                selectedListItemDetails={selectedListItemDetails}
              />
              <Tooltip title="Propagate">
                <IconButton color="inherit" onClick={openPropagateModal}>
                  <Icon>call_split</Icon>
                </IconButton>
              </Tooltip>
            </FeatureSwitchesCheck>
          )}
          {hasDeletePermission && (
            <ConfirmActionComponent
              container="details"
              component="IconButton"
              onClick={() => deleteVariablesSet(selectedListItem.variableSetId)}
              confirm={{
                title: 'Confirm Delete',
                confirmMsg:
                  'Are you sure you want to delete this Variables Set?',
                mainButtonLabel: 'Delete',
                destructive: true,
              }}
              tooltip="Delete"
              color="inherit"
            >
              delete
            </ConfirmActionComponent>
          )}
        </SectionTitle>
        {selectedListItemDetails && (
          <Row type="flex" justify="space-between" align="bottom">
            <Col lg={12} md={12} sm={12} xs={24}>
              <KeyValue
                item={selectedListItemDetails}
                elementsOrder={[
                  'namespace',
                  'context',
                  'groupId',
                  'majorVersion',
                  'minorVersion',
                ]}
                size={5}
              />
            </Col>
            {hasAddPermission && (
              <Col lg={12} md={12} sm={12} xs={24}>
                <Row
                  type="flex"
                  justify="space-around"
                  align="middle"
                  className="form-row"
                >
                  <Col span={24}>
                    <div className="flex items-center">
                      <Tooltip title={IS_MAJOR_UPDATE_HELP}>
                        <Icon>help_outline</Icon>
                      </Tooltip>
                      <Field
                        component={Checkbox}
                        name="isMajorUpdate"
                        label="Is Major Update"
                        labelPlacement="start"
                      />
                    </div>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24} className="form-input__container">
                    <Field
                      component={TextField}
                      name="majorVersion"
                      type="number"
                      label="New Major Version"
                      fullWidth
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24} className="form-input__container">
                    <Field
                      component={TextField}
                      className="form-input"
                      name="minorVersion"
                      type="number"
                      label="New Minor Version"
                      fullWidth
                    />
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        )}
        {selectedListItemDetails && (
          <Field
            name="variables"
            component={AGGridKeyValueField}
            variableMapping={variableMapping}
          />
        )}
        <Dialog
          title="Overwrite Changes"
          actions={footerButtons}
          modal
          open={overwrittenVariablesDialogDisplay}
          onRequestClose={cancelOverwrittenVariablesDialog}
          contentStyle={{ width: '500px' }}
        >
          This Publisher Variable has been changed since last page load. Your
          changes will overwrite them.
        </Dialog>
      </Form>
    </div>
  );

  return !selectedListItem ? <VariablesSetDetailsEmpty /> : Maincomponent();
};

const detailsPropType = PropTypes.shape({
  namespace: PropTypes.string,
  context: PropTypes.string,
  groupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  majorVersion: PropTypes.string,
  minorVersion: PropTypes.string,
  variables: PropTypes.object,
});

VariablesSetDetails.propTypes = {
  selectedListItem: PropTypes.shape({
    variableSetId: PropTypes.string,
    namespace: PropTypes.string,
    context: PropTypes.string,
    groupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  selectedListItemDetails: detailsPropType,
  deleteVariablesSet: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  updateVariablesSet: PropTypes.func.isRequired,
  validateVariablesSet: PropTypes.func.isRequired,
  formValues: PropTypes.object,
  overwrittenVariablesDialogDisplay: PropTypes.bool.isRequired,
  cancelOverwrittenVariablesDialog: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  propagateModalProps: PropTypes.shape({
    isPropagateModalVisible: PropTypes.bool,
    propagateOnRemoteSubmit: PropTypes.func,
    onPropagateVariablesSetHandler: PropTypes.func,
    openPropagateModal: PropTypes.func,
    closePropagateModal: PropTypes.func,
  }).isRequired,
  variableMapping: PropTypes.object.isRequired,
};

VariablesSetDetails.defaultProps = {
  selectedListItem: null,
  selectedListItemDetails: null,
  pristine: true,
  submitting: false,
  formValues: undefined,
};

export default reduxForm({
  form: UPDATE_VARIABLES_SET_FORM_NAME,
  enableReinitialize: true,
})(VariablesSetDetails);
