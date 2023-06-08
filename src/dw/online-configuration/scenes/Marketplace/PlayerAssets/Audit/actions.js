import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { AUDIT_LOGS_PREFIX } from './constants';

const { Marketplace: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.Marketplace,
    endpoint,
  });

export const fetchAuditLogs = params => (dispatch, getState) => {
  const context = getContext(getState, endpoints.getPlayerAuditLogs);
  return dispatch(createFetch(AUDIT_LOGS_PREFIX, null, { ...params, context }));
};
