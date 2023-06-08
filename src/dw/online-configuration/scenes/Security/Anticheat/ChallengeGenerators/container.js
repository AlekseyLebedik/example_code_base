import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import {
  fetchChallengeGenerators,
  addChallengeGenerator,
  deleteChallengeGenerator,
  updateChallengeGenerator,
} from './actions';
import { challengeGeneratorsSelector } from './selectors';
import ChallengeGeneratorsStatelessComponent from './presentational';
import { FORM_NAME as AddChallengeGeneratorFormName } from './components/AddChallengeGeneratorForm/constants';

const makeStateToProps = state => ({
  challengeGenerators: challengeGeneratorsSelector(state),
  isModalVisible: ModalHandlers.isVisibleSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchChallengeGenerators()),
  addOnRemoteSubmit: () => dispatch(submit(AddChallengeGeneratorFormName)),
  onAddChallengeGeneratorHandler: values =>
    new Promise((resolve, reject) =>
      dispatch(addChallengeGenerator(values, resolve, reject))
    ),
  deleteChallengeGenerator: generatorId =>
    dispatch(deleteChallengeGenerator(generatorId)),
  updateChallengeGenerator: values =>
    dispatch(updateChallengeGenerator(values)),
  openAddModal: () => dispatch(ModalHandlers.open()),
  closeAddModal: () => dispatch(ModalHandlers.close()),
});

class ChallengeGenerators extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    return (
      <ChallengeGeneratorsStatelessComponent
        addModalProps={{
          isModalVisible: this.props.isModalVisible,
          addOnRemoteSubmit: this.props.addOnRemoteSubmit,
          onAddChallengeGeneratorHandler:
            this.props.onAddChallengeGeneratorHandler,
          openAddModal: this.props.openAddModal,
          closeAddModal: this.props.closeAddModal,
        }}
        challengeGenerators={this.props.challengeGenerators}
        deleteChallengeGenerator={this.props.deleteChallengeGenerator}
        updateChallengeGenerator={this.props.updateChallengeGenerator}
      />
    );
  }
}

ChallengeGenerators.propTypes = {
  onLoad: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddChallengeGeneratorHandler: PropTypes.func.isRequired,
  deleteChallengeGenerator: PropTypes.func.isRequired,
  updateChallengeGenerator: PropTypes.func.isRequired,
  challengeGenerators: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
};

export default connect(makeStateToProps, dispatchToProps)(ChallengeGenerators);
