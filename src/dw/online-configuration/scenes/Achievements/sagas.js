import activeRulesetSaga from './ActiveRuleset/saga';
import userAchievementsSaga from './PlayerAchievements/components/AE/saga';
import rulesetsSaga from './Rulesets/saga';

export const sagas = [activeRulesetSaga, userAchievementsSaga, rulesetsSaga];
