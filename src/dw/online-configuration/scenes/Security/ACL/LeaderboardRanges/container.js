import React from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';

import ModalHandlers from 'dw/core/components/ModalHandlers';
import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';

import { connect } from 'dw/core/helpers/component';

import {
  fetchLeaderboardRanges,
  addLeaderboardRange,
  deleteLeaderboardRange as deleteLeaderboardRangeAction,
} from './actions';
import LeaderboardRangesStatelessComponent from './presentational';
import { FORM_NAME as AddLeaderboardRangeFormName } from './components/AddLeaderboardRangeForm/constants';

const makeStateToProps = state => ({
  leaderboardRanges:
    state.Scenes.Security.ACL.LeaderboardRanges.leaderboardRanges,
  isModalVisible: ModalHandlers.isVisibleSelector(state),
  selectedRowKeys: selectedRowKeysSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchLeaderboardRanges()),
  addOnRemoteSubmit: () => dispatch(submit(AddLeaderboardRangeFormName)),
  onAddLeaderboardRangeHandler: values => dispatch(addLeaderboardRange(values)),
  deleteLeaderboardRange: rangeId =>
    dispatch(deleteLeaderboardRangeAction(rangeId)),
  openAddModal: () => dispatch(ModalHandlers.open()),
  closeAddModal: () => dispatch(ModalHandlers.close()),
});

class LeaderboardRanges extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    return (
      <LeaderboardRangesStatelessComponent
        leaderboardRanges={this.props.leaderboardRanges}
        selectedRowKeys={this.props.selectedRowKeys}
        deleteLeaderboardRange={this.props.deleteLeaderboardRange}
        addModalProps={{
          isModalVisible: this.props.isModalVisible,
          addOnRemoteSubmit: this.props.addOnRemoteSubmit,
          onAddLeaderboardRangeHandler: this.props.onAddLeaderboardRangeHandler,
          openAddModal: this.props.openAddModal,
          closeAddModal: this.props.closeAddModal,
        }}
      />
    );
  }
}

LeaderboardRanges.propTypes = {
  onLoad: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddLeaderboardRangeHandler: PropTypes.func.isRequired,
  deleteLeaderboardRange: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  leaderboardRanges: PropTypes.array.isRequired,
  selectedRowKeys: PropTypes.array.isRequired,
};

export default connect(makeStateToProps, dispatchToProps, LeaderboardRanges);
