import React, { Component } from 'react';
import moment from 'moment-timezone';
import startCase from 'lodash/startCase';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './eventsCalendar.module.css';

export class OtherEventDetails extends Component {
  state = {
    visible: false,
  };

  toggleEventDetails = () => {
    this.setState(state => ({ visible: !state.visible }));
  };

  render() {
    const { event } = this.props;
    const { end_at, publish_at, status, title } = event;
    const { visible } = this.state;
    const beginDate = moment.unix(publish_at);
    const endDate = moment.unix(end_at);

    return (
      <div>
        <div onClick={this.toggleEventDetails}>
          <div>
            {moment.unix(event.publish_at).format('hh:mm A')} {event.title}
          </div>
        </div>
        <Dialog fullWidth onClose={this.toggleEventDetails} open={visible}>
          <DialogTitle className={styles.calendarEventTitle}>
            <div className={styles.calendarEventTitleText}>{title}</div>
          </DialogTitle>
          <DialogContent className={styles.calendarEventContent}>
            <Tooltip placement="bottom-start" title="Begin Date">
              <div className={styles.calendarEventDetailRow}>
                <Icon fontSize="small">calendar_today</Icon>
                <span className={styles.calendarEventDetailRowText}>
                  {beginDate.format('LL')} {beginDate.format('LTS')}
                </span>
              </div>
            </Tooltip>
            <Tooltip placement="bottom-start" title="End Date">
              <div className={styles.calendarEventDetailRow}>
                <Icon fontSize="small">event_busy</Icon>
                <span className={styles.calendarEventDetailRowText}>
                  {endDate.format('LL')} {endDate.format('LTS')}
                </span>
              </div>
            </Tooltip>
            <Tooltip placement="bottom-start" title="Status">
              <div className={styles.calendarEventDetailRow}>
                <Icon fontSize="small">info</Icon>
                <span className={styles.calendarEventDetailRowText}>
                  {startCase(status)}
                </span>
              </div>
            </Tooltip>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleEventDetails}>Close</Button>
            <Button onClick={this.toggleEventDetails}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
