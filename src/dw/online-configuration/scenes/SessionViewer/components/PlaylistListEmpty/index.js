import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

export default function PlaylistListEmpty(props) {
  const { loading } = props;

  return (
    <div className={`playlist-list-empty lobbies${loading ? ' beating' : ''}`}>
      <div className="no-elements text">
        {' '}
        {loading ? 'loading ...' : 'no results'}{' '}
      </div>
      <div className="no-elements list" />
      <div className="no-elements list" />
      <div className="no-elements list" />
    </div>
  );
}
PlaylistListEmpty.propTypes = {
  loading: PropTypes.bool,
};
PlaylistListEmpty.defaultProps = {
  loading: false,
};
