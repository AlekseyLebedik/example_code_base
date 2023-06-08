import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import UserAchievements from './container';
import * as UserAchievementsActions from '../PlayerAchievements/components/AE/actions';
import * as UserAchievementsActionTypes from '../PlayerAchievements/components/AE/actionTypes';

export { UserAchievementsActions, UserAchievementsActionTypes };

export default contextAwareService(
  Services.AE,
  ServiceEndpoints.AE.getUserAchievements
)(UserAchievements);
