import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

import { connect } from 'react-redux';

import './index.css';

function HijackPanel({ isHijacked, userName }) {
  if (!isHijacked) return null;
  return (
    <div className="hijack-panel__main-container">
      <div className="flex items-center">
        <Icon fontSize="small">warning</Icon>
        You are currently working on behalf of&nbsp;<strong>{userName}</strong>
      </div>
    </div>
  );
}

HijackPanel.propTypes = {
  isHijacked: PropTypes.bool,
  userName: PropTypes.string,
};
HijackPanel.defaultProps = {
  isHijacked: false,
  userName: '',
};

const stateToProps = state => ({
  isHijacked: state.user.profile.isHijacked,
  userName: state.user.profile.userName,
});

export default connect(stateToProps)(HijackPanel);
