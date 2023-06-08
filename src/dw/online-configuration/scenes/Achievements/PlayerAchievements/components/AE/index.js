import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import PlayerAchievements from './container';

export default contextAwareService(
  Services.AE,
  ServiceEndpoints.AE.getUserAchievements,
  [],
  { serviceDependsOnUser: true, platformOnly: true }
)(PlayerAchievements);

export const ClanAchievements = contextAwareService(
  Services.AE,
  ServiceEndpoints.AE.getClanAchievements
)(PlayerAchievements);
