/* eslint-disable no-console */
import axios from 'dw/core/axios';
import {
  pdfFileType,
  pngFileType,
  jpegFileType,
  pptxFileType,
  pptFileType,
} from '../../../../constants';

export const getImage = async name => {
  try {
    const response = await axios.get(`/expy/v1/images/${name}`, {
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const data = URL.createObjectURL(new Blob([response.data]));
    return { type, data };
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

export const uploadImage = async data => {
  try {
    const response = await axios.post(`/expy/v1/upload`, data);
    return response.data;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

export const isValidExtension = acceptedFiles => {
  const fileExtension = acceptedFiles[0].type;
  const allowedExts = [
    pdfFileType,
    pngFileType,
    jpegFileType,
    pptxFileType,
    pptFileType,
  ];
  return allowedExts.includes(fileExtension);
};
