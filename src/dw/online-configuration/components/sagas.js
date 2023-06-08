import contextsSaga from 'dw/online-configuration/components/ContextSelector/saga';
import appSaga from './App/saga';
import sessionViewrSaga from './SessionViewer/saga';

export default [appSaga, sessionViewrSaga, contextsSaga];
