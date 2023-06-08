import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import {
  fetchIMPs,
  uploadToIMPHistory,
  openUploadToIMPHistoryModal,
  closeUploadToIMPHistoryModal,
} from './actions';
import { FORM_NAME } from './components/IMPHistoryForm/constants';
import IMPStateless from './presentational';

const stateToProps = state => ({
  data: state.Scenes.IMP.data,
  nextPageToken: state.Scenes.IMP.nextPageToken,
  impUploadModalVisible: state.Scenes.IMP.impUploadModalVisible,
  formatDateTime: formatDateTimeSelector(state),
  uploadFileFormName: FORM_NAME,
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchIMPs()),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchIMPs({ nextPageToken, q }, true)),
  onUploadFileHandler: values => dispatch(uploadToIMPHistory(values)),
  onOpenDialog: () => dispatch(openUploadToIMPHistoryModal()),
  onCloseDialog: () => dispatch(closeUploadToIMPHistoryModal()),
});

const initialState = ({ data }) => ({
  data,
  initialLoading: !data || data.length === 0,
});

class IMP extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // eslint-disable-next-line react/prop-types
    if (prevState.data !== nextProps.data) {
      // eslint-disable-next-line react/prop-types
      return { data: nextProps.data, initialLoading: false };
    }
    return null;
  }

  state = initialState(this.props);

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { data, initialLoading } = this.state;
    const props = {
      ...this.props,
      openUploadFileModalHandler: this.props.onOpenDialog,
      closeUploadFileModalHandler: this.props.onCloseDialog,
      uploadFileModalVisible: this.props.impUploadModalVisible,
      onUploadFileHandler: this.props.onUploadFileHandler,
      data,
      initialLoading,
    };
    return <IMPStateless {...props} />;
  }
}

IMP.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onOpenDialog: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onUploadFileHandler: PropTypes.func.isRequired,
  impUploadModalVisible: PropTypes.bool.isRequired,
};

export default connect(stateToProps, dispatchToProps)(IMP);
