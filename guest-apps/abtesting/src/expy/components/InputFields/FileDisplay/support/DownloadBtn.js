import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

const DownloadBtn = ({ url, title }) => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);

  const download = useCallback(() => {
    if (!url) {
      throw new Error('Resource URL not provided! You need to provide one');
    }
    setFetching(true);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.style = 'display: none';

        if (title && title.length) a.download = title;
        document.body.appendChild(a);
        a.click();
      })
      .catch(err => dispatch(nonCriticalHTTPError(err)));
  }, [url, setFetching, title]);

  return (
    <IconButton
      style={{ border: 'none', background: 'transparent' }}
      disabled={fetching}
      onClick={() => download()}
      aria-label="download"
      size="small"
    >
      <GetAppIcon fontSize="inherit" />
    </IconButton>
  );
};

DownloadBtn.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DownloadBtn;
