import React from 'react';
import PropTypes from 'prop-types';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadBtn from './support/DownloadBtn';
import { useStyles } from './styles';

const FileDisplay = ({ id, title, url, type, onDelete }) => {
  const classes = useStyles();

  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon htmlColor="#D0021B" />;
      default:
        return <PictureAsPdfIcon htmlColor="#D0021B" />;
    }
  };

  return (
    <div style={{ overflow: 'hidden' }} className={classes.container}>
      <div className={classes.name}>
        <span className={classes.icon}>{getIcon()}</span>
        {title}
      </div>
      <div className={classes.btnContainer}>
        <DownloadBtn url={url} title={title} />
        <IconButton
          onClick={() => onDelete({ fileId: id })}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

FileDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FileDisplay;
