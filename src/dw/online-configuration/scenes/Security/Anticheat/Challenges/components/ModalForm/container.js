import { connect } from 'react-redux';

import ModalHandlers from 'dw/core/components/ModalHandlers';

import ModalForm from './presentational';

const stateToProps = state => ({
  submitting: ModalHandlers.submittingSelector(state),
});

export default connect(stateToProps)(ModalForm);
