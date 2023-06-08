import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import KeyValue from 'dw/core/components/KeyValue';
import UserInputComponent from 'dw/core/components/AutocompleteGeneral';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import {
  NO_TITLE_SELECTED,
  NO_CONTEXT_SELECTED,
} from 'playpants/scenes/Event/components/Activities/constants';

import ActivityTitle from '../ActivityTitle';
import { DETAIL_FIELD_FORMATS } from './constants';

import styles from './presentational.module.css';

const AchievementDetailsStateless = props => {
  const {
    classes,
    disabled,
    isServiceConfigured,
    noContextSelected,
    noTitleSelected,
    onAchievementUpdate,
    rulesetDetails,
    rulesetList,
    rulesetToActivateLabel,
    showContext,
  } = props;
  return (
    <>
      <ActivityTitle />
      {noTitleSelected ||
      (showContext && noContextSelected && isServiceConfigured) ? (
        <MainDetailsEmpty
          msg={noTitleSelected ? NO_TITLE_SELECTED : NO_CONTEXT_SELECTED}
        />
      ) : (
        <div
          className={classnames(
            classes.activityContainer,
            styles.paddedContainer
          )}
        >
          <UserInputComponent
            defaultValue={rulesetToActivateLabel}
            fullWidth
            isDisabled={disabled}
            key={rulesetToActivateLabel}
            label="Ruleset to Activate"
            onChange={value => onAchievementUpdate(value)}
            options={rulesetList.map(ruleset => ruleset.label)}
            placeholder="Rulesets..."
          />
          {rulesetDetails && (
            <KeyValue
              customFormats={DETAIL_FIELD_FORMATS}
              item={rulesetDetails}
              size={4}
            />
          )}
        </div>
      )}
    </>
  );
};

AchievementDetailsStateless.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  isServiceConfigured: PropTypes.bool.isRequired,
  noContextSelected: PropTypes.bool.isRequired,
  noTitleSelected: PropTypes.bool.isRequired,
  onAchievementUpdate: PropTypes.func.isRequired,
  rulesetDetails: PropTypes.object,
  rulesetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  rulesetToActivateLabel: PropTypes.string.isRequired,
  showContext: PropTypes.bool.isRequired,
};

AchievementDetailsStateless.defaultProps = {
  rulesetDetails: {},
};

export default AchievementDetailsStateless;
