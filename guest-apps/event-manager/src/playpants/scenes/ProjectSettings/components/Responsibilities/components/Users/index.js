import React from 'react';
import PropTypes from 'prop-types';
import MasterDetailUserList from 'playpants/scenes/ProjectSettings/components/MasterDetailUserList';
import Detail from './components/Details';

export default function UsersBase(props) {
  return (
    <MasterDetailUserList
      classes={props.classes}
      renderDetails={detailsProps => <Detail {...detailsProps} />}
    />
  );
}

UsersBase.propTypes = {
  classes: PropTypes.object.isRequired,
};
