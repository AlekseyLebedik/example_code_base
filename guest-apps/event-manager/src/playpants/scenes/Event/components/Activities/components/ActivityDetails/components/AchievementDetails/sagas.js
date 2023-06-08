import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { event as api } from 'playpants/services';
import { handleLoadSaga } from 'playpants/components/FeedbackWrapper/sagas';
import * as AT from './actionTypes';

const handleLoadingAchievementSagas = handleLoadSaga([
  `${AT.FETCH_RULESET_LIST}_FETCH`,
  `${AT.FETCH_SELECTED_RULESET}_FETCH`,
]);

const fetchRulesetListSaga = getSaga(
  AT.FETCH_RULESET_LIST,
  params => api.fetchRulesetList(params),
  'rulesets'
);

const fetchRulesetSaga = getSaga(
  AT.FETCH_SELECTED_RULESET,
  params => api.fetchRuleset(params),
  null
);

export default [
  handleLoadingAchievementSagas,
  fetchRulesetListSaga,
  fetchRulesetSaga,
];
