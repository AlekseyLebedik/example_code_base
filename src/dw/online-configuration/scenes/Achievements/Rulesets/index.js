import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import Rulesets from './container';
import * as RulesetsActions from './actions';
import * as RulesetsActionTypes from './actionTypes';

export { RulesetsActions, RulesetsActionTypes };

export default contextAwareService(
  Services.AE,
  ServiceEndpoints.AE.getRulesets
)(Rulesets);
