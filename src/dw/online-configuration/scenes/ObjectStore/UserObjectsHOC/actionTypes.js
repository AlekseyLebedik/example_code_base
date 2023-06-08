const RESOURCE = 'object-store';
const USER_OBJECTS = `${RESOURCE}/USER_OBJECTS`;
const POOLED_OBJECTS = `${RESOURCE}/POOLED_OBJECTS`;

/* USER OBJECTS */

export const USER_OBJECTS_FETCH = USER_OBJECTS;

export const USER_OBJECTS_DELETE = `${USER_OBJECTS}_DELETE`;
export const USER_OBJECTS_DELETE_SUCCESS = `${USER_OBJECTS_DELETE}_SUCCESS`;

export const USER_OBJECT_DOWNLOAD = `${USER_OBJECTS}_DOWNLOAD`;
export const USER_OBJECT_DOWNLOAD_SUCCESS = `${USER_OBJECT_DOWNLOAD}_SUCCESS`;

export const USER_OBJECT_RESTORE_BACKUP = `${USER_OBJECTS}_RESTORE_BACKUP`;

export const USER_OBJECTS_UNLOAD = `${USER_OBJECTS}_UNLOAD`;

export const USER_OBJECTS_UPLOAD = `${USER_OBJECTS}_UPLOAD`;

/* POOLED OBJECTS */

export const POOLED_OBJECTS_FETCH = POOLED_OBJECTS;
export const POOLED_OBJECTS_DELETE = `${POOLED_OBJECTS}_DELETE`;
export const POOLED_OBJECTS_DELETE_SUCCESS = `${POOLED_OBJECTS_DELETE}_SUCCESS`;
export const POOLED_OBJECTS_UNLOAD = `${POOLED_OBJECTS}_UNLOAD`;