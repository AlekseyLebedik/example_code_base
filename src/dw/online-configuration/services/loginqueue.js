import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

export const getLoginQueueStatus = () =>
  axios.get(createApiUrl('loginqueue/all/status'));

export const getLoginQueueStatusTitleEnv = (titleId, env) =>
  axios.get(createApiUrl('loginqueue/all/status', titleId, env));

export const getLoginQueueVIPList = queueId =>
  axios.get(createApiUrl(`loginqueue/${queueId}/vips`));

export const getLoginQueueVIPListTitleEnv = (titleId, env, queueId) =>
  axios.get(createApiUrl(`loginqueue/${queueId}/vips`, titleId, env));

export const getLoginQueuePropagateTitleEnvs = () =>
  axios.get(createApiUrl('loginqueue/all/propagate'));

export const editLoginQueueSettings = (queueId, queue) =>
  axios.put(createApiUrl(`loginqueue/${queueId}/status`), { ...queue });

export const propagateLoginQueueVIPListTitleEnv = (
  targetTitleId,
  targetTitleEnv,
  targetQueueId,
  sourceTitleId,
  sourceTitleEnv,
  sourceQueueId
) =>
  axios.put(
    createApiUrl(
      `loginqueue/${targetQueueId}/propagate`,
      targetTitleId,
      targetTitleEnv
    ),
    {
      sourceQueueId,
      sourceTitleId,
      sourceTitleEnv,
    }
  );

export const editLoginQueueTitleSettings = maxCCU =>
  axios.put(createApiUrl(`loginqueue/all/status`), maxCCU);

export const editLoginQueueVIPList = (queueId, vipList) =>
  axios.patch(createApiUrl(`loginqueue/${queueId}/vips`), vipList);
