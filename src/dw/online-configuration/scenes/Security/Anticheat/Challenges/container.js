import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { hasData } from 'dw/core/helpers/object';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import { connect } from 'dw/core/helpers/component';

import {
  fetchChallenges,
  addChallenge,
  editChallenge,
  setCurrentChallenge,
} from './actions';

import { challengesFormattedSelector } from './selectors';
import ChallengesStatelessComponent from './presentational';
import { FORM_NAME as AddChallengeFormName } from './components/AddChallengeForm/constants';
import { FORM_NAME as EditChallengeFormName } from './components/EditChallengeForm/constants';
import { fetchMonitoringGroups } from '../actions';
import { monitoringGroupsSelector } from '../selectors';

const makeStateToProps = state => ({
  challenges: challengesFormattedSelector(state),
  isModalVisible: ModalHandlers.isVisibleSelector(state),
  monitoringGroups: monitoringGroupsSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchChallenges()),
  addOnRemoteSubmit: () => dispatch(submit(AddChallengeFormName)),
  onAddChallengeHandler: values =>
    new Promise((resolve, reject) =>
      dispatch(addChallenge(values, resolve, reject))
    ),
  editOnRemoteSubmit: () => dispatch(submit(EditChallengeFormName)),
  onEditChallengeHandler: values =>
    new Promise((resolve, reject) =>
      dispatch(editChallenge(values, resolve, reject))
    ),
  setCurrentChallenge: challenge => dispatch(setCurrentChallenge(challenge)),
  openModal: () => dispatch(ModalHandlers.open()),
  closeModal: () => dispatch(ModalHandlers.close()),
  fetchMonitoringGroups: () => dispatch(fetchMonitoringGroups()),
});

class Challenges extends React.Component {
  state = {
    currentModal: null,
  };

  componentDidMount() {
    if (!hasData(this.props.monitoringGroups)) {
      this.props.fetchMonitoringGroups();
    }

    const { onLoad } = this.props;
    onLoad();
  }

  openModal = type => {
    this.setState({ currentModal: type });
    this.props.openModal();
  };

  openEditModal = id => {
    this.props.setCurrentChallenge(id);
    this.openModal('edit');
  };

  closeModal = () => {
    this.setState({ currentModal: null });
    this.props.closeModal();
  };

  render() {
    return (
      <ChallengesStatelessComponent
        challenges={this.props.challenges}
        addModalProps={{
          isAddModalVisible:
            this.props.isModalVisible && this.state.currentModal === 'add',
          addOnRemoteSubmit: this.props.addOnRemoteSubmit,
          onAddChallengeHandler: this.props.onAddChallengeHandler,
          openAddModal: () => this.openModal('add'),
        }}
        editModalProps={{
          isEditModalVisible:
            this.props.isModalVisible && this.state.currentModal === 'edit',
          editOnRemoteSubmit: this.props.editOnRemoteSubmit,
          onEditChallengeHandler: this.props.onEditChallengeHandler,
          openEditModal: this.openEditModal,
        }}
        closeModal={this.closeModal}
      />
    );
  }
}

Challenges.propTypes = {
  onLoad: PropTypes.func.isRequired,
  challenges: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddChallengeHandler: PropTypes.func.isRequired,
  editOnRemoteSubmit: PropTypes.func.isRequired,
  onEditChallengeHandler: PropTypes.func.isRequired,
  setCurrentChallenge: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  monitoringGroups: PropTypes.object.isRequired,
  fetchMonitoringGroups: PropTypes.func.isRequired,
};

export default connect(makeStateToProps, dispatchToProps, Challenges);
