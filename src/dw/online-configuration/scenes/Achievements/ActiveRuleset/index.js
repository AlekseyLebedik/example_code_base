import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import ActiveRuleset from './container';
import * as ActiveRulesetActions from './actions';
import * as ActiveRulesetActionTypes from './actionTypes';

export { ActiveRulesetActions, ActiveRulesetActionTypes };

export default contextAwareService(
  Services.AE,
  ServiceEndpoints.AE.getActiveRulesets
)(ActiveRuleset);
