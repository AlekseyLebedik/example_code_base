import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { eventActivitiesOnEndSelector } from 'playpants/scenes/Event/components/Activities/selectors';
import { eventIdSelector } from 'playpants/scenes/Event/selectors';
import { editEvent } from 'playpants/scenes/Event/actions';

const EndAdornment = props => (
  <InputAdornment position="end">
    <IconButton
      {...props}
      onClick={e => {
        e.persist();
        return props.onClick(e);
      }}
    >
      {props.children}
    </IconButton>
  </InputAdornment>
);

EndAdornment.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

const CustomEndAdornment = ({
  activitiesOnEnd,
  eventId,
  onClearValue,
  onSave,
}) =>
  isEmpty(activitiesOnEnd) ? (
    <EndAdornment onClick={onClearValue}>
      <Icon fontSize="small">clear</Icon>
    </EndAdornment>
  ) : (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <ConfirmActionComponent
        confirm={{
          title: 'Confirm End Date Clear',
          confirmMsg:
            'Clearing the end date will also remove all the end activities.',
          mainButtonLabel: 'Confirm',
          confirmOpen: false,
          destructive: true,
        }}
        component={EndAdornment}
        onClick={() => onSave(eventId)}
        color="secondary"
      >
        <Icon fontSize="small">clear</Icon>
      </ConfirmActionComponent>
    </div>
  );

CustomEndAdornment.propTypes = {
  activitiesOnEnd: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventId: PropTypes.number.isRequired,
  onClearValue: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  eventId: eventIdSelector(state),
  activitiesOnEnd: eventActivitiesOnEndSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onSave: eventId => dispatch(editEvent(eventId, { end_at: null })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomEndAdornment);
