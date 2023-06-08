import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from 'dw/core/components/IconButton';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

const CopyUrlToClipboard = () => {
  const dispatch = useDispatch();
  const toastMsg = (msg, type) =>
    dispatch(GlobalSnackBarActions.show(msg, type));
  const copyLinkToClipboard = () =>
    new Promise((resolve, reject) => {
      const text = window.location.href;
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (success) resolve();
      else reject();
    }).then(
      () => toastMsg('A URL has been copied to your clipboard', 'success'),
      err => toastMsg(`Could not copy text: ${err}`, 'error')
    );
  return (
    <IconButton
      icon="insert_link"
      onClick={copyLinkToClipboard}
      tooltip="Share URL Link"
    />
  );
};

export default CopyUrlToClipboard;
