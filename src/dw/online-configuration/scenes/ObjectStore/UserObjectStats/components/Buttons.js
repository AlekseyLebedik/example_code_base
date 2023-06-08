import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Tooltip, IconButton, Icon } from '@material-ui/core';
import { downloadUserObject } from '../../UserObjectsHOC/actions';
import { extractNumFromString } from '../helpers';

export function EditStatisticsButton({ onClick }) {
  return (
    <Tooltip title="Modify Selected Statistics Value">
      <IconButton onClick={() => onClick()}>
        <Icon>edit</Icon>
      </IconButton>
    </Tooltip>
  );
}
EditStatisticsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export function DownloadButton({ params }) {
  const dispatch = useDispatch();
  return (
    <Tooltip title="Download" placement="top">
      <IconButton
        onClick={() => {
          const userId = extractNumFromString(params.data.metadata.owner);
          const { name } = params.data.metadata;
          dispatch(downloadUserObject(userId, name));
        }}
      >
        <Icon>file_download</Icon>
      </IconButton>
    </Tooltip>
  );
}

DownloadButton.propTypes = {
  params: PropTypes.object.isRequired,
};
