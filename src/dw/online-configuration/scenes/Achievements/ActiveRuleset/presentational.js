import React from 'react';
import PropTypes from 'prop-types';

import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import SectionTitle from 'dw/core/components/SectionTitle';

import styles from './presentational.module.css';

import { COLUMNS } from './constants';

const StatelessComponent = ({
  activeRuleset,
  onClickRulesetLabel,
  formatDateTime,
  onLoadData,
}) =>
  !activeRuleset ? null : (
    <div className={styles.container}>
      <SectionTitle
        titleGrow={false}
        extraContent={
          <div className={styles.rulesetInfo}>
            <a
              className={styles.rulesetLabel}
              onClick={() => onClickRulesetLabel(activeRuleset.label)}
            >
              {activeRuleset.label}
            </a>
            - Last updated on{' '}
            {formatDateTime(activeRuleset.lastUpdateTimestamp)}
          </div>
        }
      />
      <AsyncAGGrid
        columnDefs={COLUMNS}
        gridOptions={{ suppressContextMenu: true }}
        onLoadData={onLoadData}
        saveColumnStateName="achievements-active-ruleset"
      />
    </div>
  );

StatelessComponent.propTypes = {
  activeRuleset: PropTypes.shape({
    label: PropTypes.string,
    created: PropTypes.number,
    lastUpdateTimestamp: PropTypes.number,
  }),
  onClickRulesetLabel: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
};
StatelessComponent.defaultProps = {
  activeRuleset: null,
};

export default StatelessComponent;
