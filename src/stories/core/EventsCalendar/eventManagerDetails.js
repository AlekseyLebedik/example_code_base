import React, { Component } from 'react';
import moment from 'moment-timezone';
import startCase from 'lodash/startCase';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './eventsCalendar.module.css';

export class EventManagerEventDetails extends Component {
  state = {
    visible: false,
  };

  toggleEventDetails = () => {
    this.setState(state => ({ visible: !state.visible }));
  };

  render() {
    const { event } = this.props;
    const { auto_tags, manual_tags, publish_at, status, title } = event;
    const { visible } = this.state;
    const publishDate = moment.unix(publish_at);

    return (
      <div>
        <div onClick={this.toggleEventDetails}>
          <div>
            {moment.unix(publish_at).format('hh:mm A')} {title}
          </div>
        </div>
        <Dialog fullWidth onClose={this.toggleEventDetails} open={visible}>
          <DialogTitle className={styles.calendarEventTitle}>
            <div className={styles.calendarEventTitleText}>{title}</div>
          </DialogTitle>
          <DialogContent className={styles.calendarEventContent}>
            <Tooltip placement="bottom-start" title="Publish Date">
              <div className={styles.calendarEventDetailRow}>
                <Icon fontSize="small">calendar_today</Icon>
                <span className={styles.calendarEventDetailRowText}>
                  {publishDate.format('LL')} {publishDate.format('LTS')}
                </span>
              </div>
            </Tooltip>
            <Tooltip placement="bottom-start" title="Status">
              <div className={styles.calendarEventDetailRow}>
                <Icon fontSize="small">thumbs_up_down</Icon>
                <span className={styles.calendarEventDetailRowText}>
                  {startCase(status)}
                </span>
              </div>
            </Tooltip>
            <Tooltip placement="bottom-start" title="Tags">
              <div className={styles.calendarEventDetailRow}>
                <Icon fontSize="small">label</Icon>
                <div className={styles.emTags}>
                  <Grid container spacing={2}>
                    {[...auto_tags, ...manual_tags].map(tag => (
                      <Grid item key={tag}>
                        <Chip label={tag} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
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
