import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import styles from './index.module.css';

import {
  selectedContextFormSelector,
  configsListFormSelector,
} from '../../selectors';
import { FORM_NAME as ADD_CONFIG_FORM_NAME } from '../ConfigForm/Form/constants';
import { FORM_NAME as SELECT_CONFIG_FORM_NAME } from '../SelectConfigModal/constants';
import * as actions from '../../actions';
import ConfigForm from '../ConfigForm';
import SelectConfigModal from '../SelectConfigModal';

const stateToProps = state => ({
  configsList: configsListFormSelector(state),
  selectedContext: selectedContextFormSelector(state),
});

const dispatchToProps = (dispatch, props) => {
  const formName = `${ADD_CONFIG_FORM_NAME}-${props.name}`;
  const selectModal = `${SELECT_CONFIG_FORM_NAME}-${props.name}`;
  return {
    openAddConfigModal: () => dispatch(ModalHandlers.open(formName)),
    openSelectConfigModal: () => dispatch(ModalHandlers.open(selectModal)),
    fetchConfigs: context => dispatch(actions.fetchConfigs(context)),
    formName,
    selectModal,
  };
};

class AddConfigComponent extends Component {
  state = {
    // eslint-disable-next-line
    selectedContext: undefined,
    // eslint-disable-next-line
    configsList: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.selectedContext && props.configsList === undefined) {
      props.fetchConfigs(props.selectedContext);
    }
    if (props.selectedContext !== state.selectedContext) {
      return { selectedContext: props.selectedContext, configsList: null };
    }

    return null;
  }

  render() {
    const {
      openAddConfigModal,
      openSelectConfigModal,
      selectModal,
      selectedContext,
      configsList,
      fetchConfigs,
      selectedConfigIDs,
      onAdd,
      formName,
      isVisible,
      cohortName,
    } = this.props;

    return isVisible ? (
      <>
        {configsList ? (
          <>
            <Tooltip title="View/Select Config" placement="bottom">
              <IconButton onClick={openSelectConfigModal}>
                <Icon>list</Icon>
              </IconButton>
            </Tooltip>
            <SelectConfigModal
              formName={selectModal}
              selectedContext={selectedContext}
              fetchConfigs={fetchConfigs}
              selectedConfigIDs={selectedConfigIDs}
              configsList={configsList}
              onAdd={onAdd}
            />
          </>
        ) : (
          <IconButton disabled className={styles.button}>
            <Icon>list</Icon>
          </IconButton>
        )}
        <Tooltip title="Add Config">
          <div>
            <IconButton
              className={styles.button}
              onClick={openAddConfigModal}
              disabled={!selectedContext}
            >
              <Icon>playlist_add</Icon>
            </IconButton>
          </div>
        </Tooltip>
        <ConfigForm formName={formName} onAdd={onAdd} cohortName={cohortName} />
      </>
    ) : null;
  }
}

AddConfigComponent.propTypes = {
  openAddConfigModal: PropTypes.func.isRequired,
  selectedContext: PropTypes.string,
  configsList: PropTypes.arrayOf(PropTypes.object),
  selectedConfigIDs: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  cohortName: PropTypes.string,
  openSelectConfigModal: PropTypes.func.isRequired,
  fetchConfigs: PropTypes.func.isRequired,
  selectModal: PropTypes.string.isRequired,
};

AddConfigComponent.defaultProps = {
  selectedConfigIDs: [],
  selectedContext: undefined,
  configsList: undefined,
  isVisible: true,
  cohortName: undefined,
};

export default connect(stateToProps, dispatchToProps)(AddConfigComponent);
