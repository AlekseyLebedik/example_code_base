import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { submit } from 'redux-form';
import { connect } from 'react-redux';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import { FORM_NAME as AddFileScriptName } from './components/AddScriptForm/constants';
import LootGenStateless from './presentational';
import {
  scriptListSelector,
  selectedItemSelector,
  nextPageTokenSelector,
} from './selectors';
import {
  fetchScripts,
  uploadScript,
  openUploadModal,
  closeUploadModal,
} from './actions';

const stateToProps = (state, props) => ({
  items: scriptListSelector(state),
  baseUrl: props.match.params.id
    ? props.match.path.split(':id')[0]
    : props.match.path,
  formatDateTime: formatDateTimeSelector(state),
  nextPageToken: nextPageTokenSelector(state),
  selectedItem: selectedItemSelector(state, props),
  uploadModalVisible: state.Scenes.LootGen.Scripts.uploadModalVisible,
  uploading: state.Scenes.LootGen.Scripts.uploading,
});

const dispatchToProps = {
  uploadOnRemoteSubmit: () => submit(AddFileScriptName),
  onShowMore: nextPageToken => fetchScripts({ nextPageToken }),
  onUploadScript: uploadScript,
  onLoad: fetchScripts,
  openUploadModal,
  closeUploadModal,
};

const mapStateToProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,

  onUploadHandler: values => {
    const mergeScriptToBaseBranch = values.mergeScriptToBaseBranch || false;
    dispatchProps.onUploadScript({
      ...values,
      mergeScriptToBaseBranch,
    });
  },
});

class LootGen extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return <LootGenStateless {...this.props} />;
  }
}
LootGen.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

const LootGenConnected = connect(
  stateToProps,
  dispatchToProps,
  mapStateToProps
)(LootGen);

export default LootGenConnected;
