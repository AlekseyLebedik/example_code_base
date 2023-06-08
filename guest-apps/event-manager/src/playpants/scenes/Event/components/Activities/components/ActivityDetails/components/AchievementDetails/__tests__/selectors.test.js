import mockState from 'playpants/testUtils/mockState';
import { achievementProps as props } from 'playpants/testUtils/eventProps';
import * as selectors from '../selectors';

describe('AchievementDetails selectors', () => {
  it('correctly selects achievements', () => {
    const data = selectors.achievementsSelector(mockState);
    expect(data).toEqual(mockState.Scenes.Event.activity.achievements);
  });

  it('correctly selects rulesetList', () => {
    const data = selectors.rulesetListSelector(mockState);
    expect(data).toEqual(
      mockState.Scenes.Event.activity.achievements.rulesetList.data
    );
  });

  it('correctly selects rulesetList loading', () => {
    const data = selectors.rulesetListLoadingSelector(mockState);
    expect(data).toEqual(
      mockState.Scenes.Event.activity.achievements.rulesetList.loading
    );
  });

  it('correctly selects rulesetToActivateSelector', () => {
    const expected = props.selectedActivity.activity.ruleset_to_activate;
    const data = selectors.rulesetToActivateSelector(mockState, props);
    expect(data).toEqual(expected);
  });

  it('correctly selects rulesetToActivateLabel', () => {
    const data = selectors.makeRulesetToActivateLabelSelector()(
      mockState,
      props
    );
    expect(data).toEqual(
      mockState.Scenes.Event.event.data.activities[2].activity
        .ruleset_to_activate.label
    );
  });

  it('correctly selets selectedRulesetSelector', () => {
    const data = selectors.selectedRulesetSelector(mockState, props);
    expect(data).toEqual(
      mockState.Scenes.Event.activity.achievements.selectedRuleset.data
    );
  });

  it('correctly selects ruleset details', () => {
    mockState.Scenes.Event.activity.selectedActivity = 1;
    const { code, ...expected } =
      mockState.Scenes.Event.event.data.activities[2].activity
        .ruleset_to_activate;
    const data = selectors.rulesetDetailsSelector(mockState, props);
    expect(data).toEqual(expected);
  });
});
