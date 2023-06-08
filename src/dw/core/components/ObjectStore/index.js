import { lazy } from 'react';
import UploadAction from './UploadAction';
import * as constants from './UploadAction/components/AddFileForm/constants';

const ObjectsTable = lazy(() => import('./ObjectsTable'));

export { ObjectsTable, UploadAction, constants };
