import { BYTE_TO_GB, MAX_ZIP_DOWNLOAD_GB_SIZE } from './constants';

export function normalizeObjects(objects) {
  return objects.reduce(
    (map, metadata) => ({ ...map, [metadata.name]: metadata }),
    {}
  );
}

export function filterObject(obj, callback) {
  return Object.entries(obj).reduce(
    (map, [key, value]) => ({
      ...map,
      [key]: callback(value) ? value : undefined,
    }),
    {}
  );
}

export const getFileData = action => {
  const { formData } = action;
  const { size } = formData.get('fileData');
  return { size, fileName: formData.get('fileName') };
};

export const canDownloadFileGroupSize = files => {
  const contentLength = files.reduce(
    (acc, f) => acc + parseInt(f.contentLength, 10),
    0
  );
  return contentLength < MAX_ZIP_DOWNLOAD_GB_SIZE * BYTE_TO_GB;
};
