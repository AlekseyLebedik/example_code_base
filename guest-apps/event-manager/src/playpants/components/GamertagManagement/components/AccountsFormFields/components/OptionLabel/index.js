import React from 'react';
import PropTypes from 'prop-types';

import StatusDot from 'playpants/components/StatusDot';

import styles from './index.module.css';

const OptionLabel = ({ label, group }) => {
  const [umbrella, ...accounts] = label;
  return (
    <div className={styles.optionRow}>
      <div className={styles.umbrellaHeader}>{umbrella}</div>
      {group && (
        <div className={styles.group}>
          <StatusDot
            iconClassName={styles.statusDot}
            statusText={`Member of group: ${group.name} (${group.id})`}
          />
        </div>
      )}
      <div className={styles.accounts}>
        {accounts.map(line => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </div>
  );
};

OptionLabel.propTypes = {
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
  group: PropTypes.object,
};
OptionLabel.defaultProps = { group: null };

export default OptionLabel;
