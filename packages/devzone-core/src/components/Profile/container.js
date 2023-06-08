import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import ReactGA from 'react-ga';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import IconMenu from '../IconMenu';
import { withUserProfileActions } from '../../modules/user/HOC';
import { hasData } from '../../helpers/object';

import ProfilePopup from './presentational';

// TODO: improve UX when submitting form

const avatarStyle = {
  cursor: 'pointer',
  backgroundColor: 'var(--primary-color)',
};

class Profile extends Component {
  static propTypes = {
    // TODO: remove this params by making the profile popup unit friendly?
    enableProfilePopup: PropTypes.bool,
    avatarProps: PropTypes.object,
    user: PropTypes.shape({
      profile: PropTypes.object,
      actions: PropTypes.object,
    }),
  };

  static defaultProps = {
    user: {},
    enableProfilePopup: true,
    avatarProps: {},
  };

  state = {
    showProfilePopup: false,
  };

  toggleProfilePopup = () => {
    // Track when the user open the profile popup
    if (!this.state.showProfilePopup) {
      ReactGA.event({
        category: 'User',
        action: 'Clicked on Profile',
      });
    }

    this.setState(prevState => ({
      showProfilePopup: !prevState.showProfilePopup,
    }));
  };

  render() {
    const {
      user: { profile: data, actions },
      enableProfilePopup,
      avatarProps,
    } = this.props;
    const userInitial = data.userName && data.userName.charAt(0).toUpperCase();

    const getProfileOptions = onClose =>
      [
        <MenuItem key="loggedIn" disabled>
          Signed in as&nbsp;<strong>{data.userName}</strong>
        </MenuItem>,
        <Divider key="divider" />,
        enableProfilePopup && (
          <MenuItem
            key="profile"
            onClick={() => {
              onClose();
              this.toggleProfilePopup();
            }}
          >
            Your Profile
          </MenuItem>
        ),
      ].filter(i => i);

    const newAvatarProps = {
      size: 34,
      style: {
        ...avatarStyle,
        ...avatarProps.style,
      },
      color: 'primary',
      ...avatarProps,
    };

    return (
      <div className="profile__container">
        <IconMenu
          icon={<Avatar {...newAvatarProps}>{userInitial}</Avatar>}
          ButtonProps={{ style: { padding: 0 } }}
        >
          {onClose => getProfileOptions(onClose)}
        </IconMenu>
        {enableProfilePopup && hasData(data) && (
          <ProfilePopup
            onHide={this.toggleProfilePopup}
            open={this.state.showProfilePopup}
            data={data}
            onSubmit={actions.updateUserProfile}
            logoutUser={actions.logoutUser}
          />
        )}
      </div>
    );
  }
}

export default compose(withUserProfileActions)(Profile);
