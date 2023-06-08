import { getNowTimestamp } from 'playpants/helpers/dateTime';
import { prettyPrint } from 'playpants/helpers/json';

// formats properties object needed for column layout and upload data needed for File Storage
export const formatPubObjectFormData = (
  { fileData, fileName, acl, expiresOn, category, groupID, checksumType },
  owner
) => {
  const properties = {
    acl,
    category,
    owner,
    groupID: groupID || '0',
    expiresOn: expiresOn || '0',
    created: getNowTimestamp(),
    modified: getNowTimestamp(),
    name: fileName || fileData.file.name,
    contentLength: fileData.file.size,
    extraData: null,
    checksumType,
  };
  const uploadData = {
    file: fileData.file,
    file_name: properties.name,
    type: 'publisher_objects',
    owner_id: properties.owner,
    uploaded_at: properties.created,
    properties: prettyPrint(properties),
  };

  const formData = new FormData();
  Object.entries(uploadData).forEach(([key, val]) => formData.append(key, val));
  return formData;
};

// adds data fileId and properties to update the current activity
export const formatActivityPayload = (data, currentActivity) => ({
  ...currentActivity,
  activity: prettyPrint({
    files: [...currentActivity.activity.files, data.id],
    objects: [...currentActivity.activity.objects, data.properties],
  }),
});
