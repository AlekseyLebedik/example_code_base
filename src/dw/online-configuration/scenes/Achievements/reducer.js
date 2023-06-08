import { combineReducers } from 'redux';
import { reducer as activeRulesetReducer } from './ActiveRuleset/reducer';
import { reducer as userAchievementsReducer } from './UserAchievements/reducer';
import { reducer as rulesetsReducer } from './Rulesets/reducer';

export const reducer = combineReducers({
  ActiveRuleset: activeRulesetReducer,
  UserAchievements: userAchievementsReducer,
  Rulesets: rulesetsReducer,
});
