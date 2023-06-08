import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset, submit } from 'redux-form';

import { addUserKey, openAddKeyModal, closeAddKeyModal } from './actions';
import TabUserKeysStateless from './presentational';
import { dedicationSelector } from './selectors';
import { formName as AddKeyFormName } from './components/AddKeyForm';

const stateToProps = state => ({
  userKeys: dedicationSelector(state),
  addKeyModal: {
    addKeyModalVisible:
      state.Scenes.Accounts.Tabs.TabUserKeys.addKeyModalVisible,
    addKeyModalLoading:
      state.Scenes.Accounts.Tabs.TabUserKeys.addKeyModalLoading,
  },
});

const dispatchToProps = dispatch => ({
  openAddKeyModalHandler: () => dispatch(openAddKeyModal()),
  closeAddKeyModalHandler: () => dispatch(closeAddKeyModal()),
  addKeyFormRemoteSubmitHandler: () => dispatch(submit(AddKeyFormName)),
  addKeyFormSubmitHandler: values => {
    dispatch(addUserKey(values));
    dispatch(reset(AddKeyFormName));
  },
});

TabUserKeysStateless.propTypes = {
  ...TabUserKeysStateless.propTypes,
  openAddKeyModalHandler: PropTypes.func,
};

export default connect(stateToProps, dispatchToProps)(TabUserKeysStateless);
