import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from 'dw/core/components/SectionTitle';
import KeyValue from 'dw/core/components/KeyValue';
import { COLUMNS } from '../../constants';
import ChallengeLogDetailsEmpty from '../ChallengeLogDetailsEmpty';

import './presentational.css';

const ChallengeLogDetails = ({ selectedChallengeLog }) => {
  if (!selectedChallengeLog) return <ChallengeLogDetailsEmpty />;
  return (
    <div className="details__container challenge-logs flex-rows-container">
      <SectionTitle title={selectedChallengeLog.logId} />
      <div className="scrollable-content">
        <KeyValue
          item={selectedChallengeLog}
          elementsOrder={COLUMNS.filter(c => c.searchOnly !== true)}
          size={4}
        />
      </div>
    </div>
  );
};
ChallengeLogDetails.propTypes = {
  selectedChallengeLog: PropTypes.object,
};
ChallengeLogDetails.defaultProps = {
  selectedChallengeLog: undefined,
};

export default ChallengeLogDetails;
