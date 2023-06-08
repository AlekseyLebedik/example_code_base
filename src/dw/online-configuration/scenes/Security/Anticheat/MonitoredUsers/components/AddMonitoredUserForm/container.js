import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { hasData } from 'dw/core/helpers/object';

import { FORM_NAME } from './constants';
import AddMonitoredUserFormStateless from './presentational';
import { fetchMonitoringGroups } from '../../../actions';
import { monitoringGroupsSelector } from '../../../selectors';

const stateToProps = state => ({
  monitoringGroups: monitoringGroupsSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchMonitoringGroups());
  },
});

class AddMonitoredUserFormBase extends React.Component {
  componentDidMount() {
    if (!hasData(this.props.monitoringGroups)) {
      this.props.onLoad();
    }
  }

  render() {
    return AddMonitoredUserFormStateless(this.props);
  }
}
AddMonitoredUserFormBase.propTypes = {
  monitoringGroups: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
};

const AddMonitoredUserForm = reduxForm({
  form: FORM_NAME,
})(AddMonitoredUserFormBase);

export default connect(stateToProps, dispatchToProps)(AddMonitoredUserForm);
