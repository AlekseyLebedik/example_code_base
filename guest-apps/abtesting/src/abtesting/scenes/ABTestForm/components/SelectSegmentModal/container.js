import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as actions from '../../actions';

import SelectSegmentModalPresentational from './presentational';

const stateToProps = (state, props) => {
  const { modalName } = props;
  return {
    isSelectSegmentModalVisible: ModalHandlers.isVisibleSelector(
      state,
      modalName
    ),
    modalName,
  };
};

const dispatchToProps = dispatch => ({
  deleteSegment: (context, segmentIDs) =>
    dispatch(actions.deleteSegments(context, segmentIDs)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  deleteSegment: segmentIDs =>
    dispatchProps.deleteSegment(ownProps.selectedContext, segmentIDs),
});

class SelectSegmentModal extends React.Component {
  state = {
    selectedRows: [],
  };

  onGridReady = params => {
    const { selectedSegment } = this.props;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.refreshCells(params);
    if (selectedSegment) {
      this.gridApi.forEachNode(node => {
        if (node.data.segmentID === selectedSegment.segmentID) {
          node.setSelected(true);
        }
      });
    }
  };

  onFilterTextboxChange = value => {
    this.gridApi.setQuickFilter(value);
  };

  onSelectionChanged = ({ api }) => {
    const selectedRows = api.getSelectedRows();
    this.setState({ selectedRows });
  };

  onAddRowSelection = () => {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      selectedRows.map(selected =>
        this.props.onAdd({
          segmentID: selected.segmentID,
          segmentName: selected.name,
        })
      );

      this.props.onClose();
    }
  };

  onRemove = removeItems => {
    const { deleteSegment } = this.props;
    deleteSegment(removeItems.map(item => item.segmentID));
    this.setState({ selectedRows: [] });
  };

  render() {
    const {
      onClose,
      isSelectSegmentModalVisible,
      segmentsList,
      selectedSegment,
      onAdd,
      selectedContext,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <SelectSegmentModalPresentational
        onGridReady={this.onGridReady}
        onAddRowSelection={this.onAddRowSelection}
        onSelectionChanged={this.onSelectionChanged}
        onFilterTextboxChange={this.onFilterTextboxChange}
        segmentsList={segmentsList}
        selectedSegment={selectedSegment}
        visible={isSelectSegmentModalVisible}
        onCancel={onClose}
        onAdd={onAdd}
        onRemove={this.onRemove}
        selectedRows={selectedRows}
        selectedContext={selectedContext}
      />
    );
  }
}

SelectSegmentModal.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isSelectSegmentModalVisible: PropTypes.bool.isRequired,
  segmentsList: PropTypes.arrayOf(PropTypes.object),
  selectedSegment: PropTypes.object,
  deleteSegment: PropTypes.func.isRequired,
  selectedContext: PropTypes.string.isRequired,
};

SelectSegmentModal.defaultProps = {
  segmentsList: [],
  selectedSegment: undefined,
};

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(SelectSegmentModal);
