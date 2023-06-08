import React, { useState, useEffect } from 'react';

import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import PptxIcon from '../../../../icons/PptxIcon';
import PdfIcon from '../../../../icons/PdfIcon';
import LoadingImage from '../../../LoadingImage';
import Svg from '../../../Svg';

import { pdfFileType, pptxFileType, pptFileType } from '../../../../constants';
import { getImage, uploadImage, isValidExtension } from './helpers';

import { useStyles } from './styles';

const UploadImage = ({ setImgUrl, setImgName, imageName }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [localImageUrl, setLocalImageUrl] = useState();
  const [fileType, setFileType] = useState();

  const handleRemoveImage = e => {
    e.preventDefault();
    setLocalImageUrl();
    setFileType();
    setImgName('');
    setImgUrl('');
  };

  const fetchImage = async () => {
    if (localImageUrl) setLocalImageUrl();
    if (fileType) setFileType();

    if (imageName) {
      setIsLoading(true);

      try {
        const { type, data } = await getImage(imageName);
        setIsLoading(false);
        setFileType(type);
        setLocalImageUrl(data);
      } catch (err) {
        setIsLoading(false);
        setError(err.toString());
      }
    }
  };

  useEffect(() => {
    fetchImage();
  }, [imageName]);

  const handleUploadImage = async acceptedFiles => {
    if (isValidExtension(acceptedFiles)) {
      setIsLoading(true);
      setError();

      const data = new FormData();
      data.append('file', acceptedFiles[0]);

      try {
        const { name, url } = await uploadImage(data);

        setIsLoading(false);
        setImgName(name);
        setImgUrl(url);
      } catch (err) {
        setIsLoading(false);
        setError('Error uploading you file. Please try again');
      }
    } else {
      setError('Files must be .pdf, .pptx, .ppt, .jpeg, .png');
    }
  };

  const renderPdf = () => (
    <div className={classes.pdf}>
      <Svg size="illustration" icon={<PdfIcon />} />
      <p className={classes.pdfDescription}>{imageName.split(/_(.+)/)[1]}</p>
    </div>
  );

  const renderPowerpoint = () => (
    <div className={classes.pdf}>
      <Svg size="illustration" icon={<PptxIcon />} />
      <p className={classes.pdfDescription}>{imageName.split(/_(.+)/)[1]}</p>
    </div>
  );

  const renderImage = () => (
    <img className={classes.image} src={localImageUrl} alt="" />
  );

  const renderImageByFileType = () => {
    switch (fileType) {
      case pdfFileType:
        return renderPdf();
      case pptxFileType:
        return renderPowerpoint();
      case pptFileType:
        return renderPowerpoint();
      default:
        return renderImage();
    }
  };

  const renderDropped = () => (
    <div className={classes.imageContainer}>
      {fileType && renderImageByFileType()}
      <div className={classes.imageContainerBtn}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleRemoveImage}
          className={classes.deleteImage}
          startIcon={<DeleteOutlineRoundedIcon />}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  const renderDropzone = () => (
    <Dropzone
      noClick
      onDrop={acceptedFiles => handleUploadImage(acceptedFiles)}
    >
      {({ getRootProps, getInputProps, open }) => (
        <section>
          <div {...getRootProps({ className: classes.dropzone })}>
            {isLoading ? (
              <LoadingImage />
            ) : (
              <div>
                <input {...getInputProps()} />
                <Svg
                  color="placeholder"
                  size="xlarge"
                  icon={<CloudUploadOutlinedIcon />}
                />
                <p className={classes.heading}>
                  Drag n drop file to upload (.pdf, .pptx, .ppt, .jpeg, .png)
                </p>
                <p className={classes.description}>or</p>
                <Button
                  className={classes.browse}
                  onClick={open}
                  size="small"
                  variant="outlined"
                >
                  Browse computer
                </Button>
                <p className={classes.warning}>Maximum upload size: 3MB</p>
              </div>
            )}
          </div>
          {error && (
            <p className="label text-danger text-center mt-1">{error}</p>
          )}
        </section>
      )}
    </Dropzone>
  );

  return fileType ? renderDropped() : renderDropzone();
};

export default UploadImage;
