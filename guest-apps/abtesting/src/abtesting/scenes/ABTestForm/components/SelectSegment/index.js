import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import styles from './index.module.css';

import {
  selectedContextFormSelector,
  segmentsListFormSelector,
} from '../../selectors';
import SelectSegmentModal from '../SelectSegmentModal';
import * as actions from '../../actions';

const stateToProps = state => ({
  segmentsList: segmentsListFormSelector(state),
  selectedContext: selectedContextFormSelector(state),
});

const dispatchToProps = (dispatch, props) => {
  const selectSegmentModalName = `SEGMENT-${props.cohort.segmentID.input.name}`;
  return {
    fetchSegments: context => dispatch(actions.fetchSegments(context)),
    openSelectSegmentModal: () =>
      dispatch(ModalHandlers.open(selectSegmentModalName)),
    closeSelectSegmentModal: () =>
      dispatch(ModalHandlers.close(selectSegmentModalName)),
    selectSegmentModalName,
  };
};

class SelectSegmentComponent extends Component {
  state = {
    // eslint-disable-next-line
    selectedContext: undefined,
    // eslint-disable-next-line
    cohort: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.selectedContext && props.segmentsList === undefined) {
      props.fetchSegments(props.selectedContext);
    }
    if (props.selectedContext !== state.selectedContext) {
      return { selectedContext: props.selectedContext, segmentsList: null };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    const { selectedContext, cohort } = this.props;
    if (prevProps.selectedContext !== selectedContext) {
      const { input } = cohort.segmentID;
      input.onChange('');
    }
  }

  render() {
    const {
      segmentsList,
      cohort,
      disabled,
      openSelectSegmentModal,
      selectSegmentModalName,
      closeSelectSegmentModal,
      selectedContext,
    } = this.props;
    const {
      input,
      meta: { touched, error },
    } = cohort.segmentID;
    const segment =
      segmentsList && segmentsList.find(s => s.segmentID === input.value);
    const displayValue = segment && segment.name;

    return (
      <>
        <TextField
          value={displayValue || ''}
          error={Boolean(touched && error)}
          className={styles.segmentInput}
          disabled={disabled || !segmentsList}
          label="Select a segment"
          helperText={touched && error}
          onClick={openSelectSegmentModal}
          InputProps={{
            endAdornment: !disabled && segmentsList && (
              <InputAdornment position="end">
                <Tooltip title="Select Segment" placement="bottom">
                  <IconButton>
                    <Icon>list</Icon>
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        {segmentsList && (
          <SelectSegmentModal
            modalName={selectSegmentModalName}
            selectedSegment={segment}
            selectedContext={selectedContext}
            segmentsList={segmentsList}
            onAdd={s => input.onChange(s.segmentID)}
            onClose={() => {
              input.onBlur();
              closeSelectSegmentModal();
            }}
          />
        )}
      </>
    );
  }
}

SelectSegmentComponent.propTypes = {
  segmentsList: PropTypes.arrayOf(PropTypes.object),
  cohort: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  selectedContext: PropTypes.string,
  openSelectSegmentModal: PropTypes.func.isRequired,
  selectSegmentModalName: PropTypes.string.isRequired,
  closeSelectSegmentModal: PropTypes.func.isRequired,
  fetchSegments: PropTypes.func.isRequired,
};

SelectSegmentComponent.defaultProps = {
  segmentsList: undefined,
  disabled: false,
  selectedContext: undefined,
};

export default connect(stateToProps, dispatchToProps)(SelectSegmentComponent);
