import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { Tab, Tabs } from 'dw/core/components/Tabs';
import Tooltip from '@material-ui/core/Tooltip';

import InvitationForm from '../InvitationForm';
import EntityObjectPermissionsForm from '../EntityObjectPermissionsForm';
import RelatedObjectPermission from '../RelatedObjectPermission';
import * as entityTypes from '../../entityTypes';

const styles = {
  closeIcon: {
    position: 'fixed',
    top: 0,
    right: 0,
    color: 'rgba(255, 255, 255, 0.87)',
  },
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  dialogPaper: {
    maxHeight: 500,
    minHeight: 320,
    backgroundColor: '#f3f3f3',
  },
  dialogTitle: {
    backgroundColor: 'white',
    paddingBottom: 0,
  },
  dialogContent: {
    padding: '36px 24px 0 24px',
    '&:first-child': {
      padding: 0,
    },
  },
  tab: {
    minWidth: 50,
  },
  tabLabel: {
    textTransform: 'capitalize',
  },
  tabTextColorPrimary: {
    color: '#aaaaaa',
  },
  tabTextColorSelected: {
    color: '#525252 !important',
  },
  dialogActions: {
    margin: '8px 6px',
    minHeight: 30,
    paddingTop: 4,
    paddingBottom: 4,
  },
};

const TABS = [
  {
    key: 'Invite',
    component: InvitationForm,
    componentProps: { form: 'InvitationForm' },
  },
  {
    key: 'Company',
    component: EntityObjectPermissionsForm,
    componentProps: {
      key: 'CompanyObjectPermissionForm',
      form: 'CompanyObjectPermissionForm',
      entityType: entityTypes.COMPANY,
    },
  },
  {
    key: 'Group',
    component: EntityObjectPermissionsForm,
    componentProps: {
      key: 'GroupObjectPermissionForm',
      form: 'GroupObjectPermissionForm',
      entityType: entityTypes.GROUP,
    },
  },
  {
    key: 'User',
    component: EntityObjectPermissionsForm,
    componentProps: {
      key: 'UserObjectPermissionForm',
      form: 'UserObjectPermissionForm',
      entityType: entityTypes.USER,
    },
  },
  {
    key: 'Displayed To',
    component: RelatedObjectPermission,
    componentProps: {
      key: 'RelatedObjectPermission',
    },
  },
];

export const TAB_KEYS = TABS.map(t => t.key);

class ObjectPermissionManager extends React.Component {
  state = {
    visible: this.props.visible,
    activeTab: this.props.activeTab,
  };

  toggleVisibility = (visible = true) => {
    this.setState({
      visible,
    });
  };

  handleShowDialog = () => {
    const { onDialogShow } = this.props;
    if (onDialogShow) {
      onDialogShow();
    }
    this.toggleVisibility(true);
  };

  handleCancelClick = () => {
    this.toggleVisibility(false);
  };

  handleTabChange = (e, value) => {
    this.setState({
      activeTab: value,
    });
  };

  render() {
    const { visible, activeTab } = this.state;
    const { ctypeId, objectId, classes, onSaveClick, children } = this.props;
    const tab = TABS.find(t => t.key === activeTab);
    const { component: FormComponent, componentProps } = tab;
    const formProps = {
      ...componentProps,
      ctypeId,
      objectId,
    };

    return (
      <>
        <Tooltip title="Manage Permissions">
          {children && typeof children === 'function' ? (
            children(this.handleShowDialog)
          ) : (
            <IconButton onClick={this.handleShowDialog}>
              <Icon>lock_open</Icon>
            </IconButton>
          )}
        </Tooltip>
        {visible && (
          <Dialog
            key={`${ctypeId}-${objectId}`}
            open
            fullWidth
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="lg"
            transitionDuration={500}
            TransitionComponent={Slide}
            onClose={this.handleCancelClick}
            classes={{
              paper: classes.dialogPaper,
            }}
            BackdropProps={{
              classes: { root: classes.backDrop },
            }}
          >
            <DialogTitle
              id="alert-dialog-slide-title"
              classes={{ root: classes.dialogTitle }}
            >
              <IconButton
                classes={{ root: classes.closeIcon }}
                onClick={this.handleCancelClick}
              >
                <Icon>close</Icon>
              </IconButton>
              <Tabs
                value={activeTab}
                variant="fullWidth"
                onChange={this.handleTabChange}
                indicatorColor="default"
              >
                {TABS.map(({ key }) => (
                  <Tab
                    key={key}
                    value={key}
                    label={key}
                    classes={{
                      root: classes.tab,
                      label: classes.tabLabel,
                      textColorPrimary: classes.tabTextColorPrimary,
                      selected: classes.tabTextColorSelected,
                    }}
                  />
                ))}
              </Tabs>
            </DialogTitle>
            <DialogContent
              classes={{
                root: classes.dialogContent,
              }}
            >
              <FormComponent {...formProps} />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={this.handleCancelClick}
                classes={{ root: classes.dialogActions }}
              >
                Cancel
              </Button>
              {activeTab === 'Displayed To' ? null : (
                <Button
                  variant="contained"
                  onClick={e => {
                    onSaveClick(e, FormComponent, formProps);
                    setTimeout(() => this.handleCancelClick(), 0);
                  }}
                  color="primary"
                  classes={{ root: classes.dialogActions }}
                >
                  {activeTab === 'Invite' ? 'Add' : 'Save'}
                </Button>
              )}
            </DialogActions>
          </Dialog>
        )}
      </>
    );
  }
}

ObjectPermissionManager.propTypes = {
  ctypeId: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  classes: PropTypes.object,
  visible: PropTypes.bool,
  activeTab: PropTypes.oneOf(TAB_KEYS),
  onDialogShow: PropTypes.func,
  onSaveClick: PropTypes.func,
  children: PropTypes.elementType,
};

ObjectPermissionManager.defaultProps = {
  classes: {},
  visible: false,
  activeTab: TAB_KEYS[0],
  onDialogShow: null,
  onSaveClick: null,
  children: undefined,
};

export default withStyles(styles)(ObjectPermissionManager);
