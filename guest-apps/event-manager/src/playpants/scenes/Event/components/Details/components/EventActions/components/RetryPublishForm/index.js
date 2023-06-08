import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'redux-form';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CustomCheckbox from './components/CustomCheckbox';
import styles from './styles';

const RetryPublishForm = props => {
  const { onSubmit, task, classes } = props;

  return (
    <Form onSubmit={onSubmit}>
      <List>
        {!isEmpty(task) && (
          <ListItem>
            <ListItemIcon>
              <Icon fontSize="small">info</Icon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  The task <b>{task.title}</b> has failed
                </Typography>
              }
            />
          </ListItem>
        )}
        <ListItem>
          <ListItemIcon>
            <Icon fontSize="small">flag</Icon>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography>
                Choose the settings you wish to apply on retry:
              </Typography>
            }
          />
        </ListItem>
        <ListItem classes={classes}>
          <Field
            name="skip_published_activities"
            component={CustomCheckbox}
            label="Skip activities that are already published"
          />
          <Field
            name="break_on_exception"
            component={CustomCheckbox}
            label="Stop publish process if any activity fails"
          />
        </ListItem>
      </List>
    </Form>
  );
};

RetryPublishForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.object,
};

RetryPublishForm.defaultProps = {
  task: {},
};

export default withStyles(styles)(RetryPublishForm);
