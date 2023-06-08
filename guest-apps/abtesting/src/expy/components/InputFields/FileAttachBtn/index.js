import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const FileAttachBtn = ({
  className,
  btnText,
  btnIcon,
  onSetFiles,
  accept,
  isLoading,
}) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={e => onSetFiles(e.target.files)}
        accept={accept}
      />
      <Button
        className={className}
        variant="outlined"
        size="small"
        onClick={handleClick}
        startIcon={btnIcon}
      >
        {isLoading ? 'Attaching...' : btnText}
      </Button>
    </>
  );
};

FileAttachBtn.defaultProps = {
  className: '',
  isLoading: false,
};

FileAttachBtn.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  accept: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  btnIcon: PropTypes.node.isRequired,
  onSetFiles: PropTypes.func.isRequired,
};

export default FileAttachBtn;
