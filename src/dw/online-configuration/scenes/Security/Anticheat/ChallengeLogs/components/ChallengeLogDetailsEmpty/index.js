import React from 'react';
import Empty from 'dw/core/components/Empty';

import './index.css';

export default function ChallengeLogDetailsEmpty() {
  return (
    <div className="details-empty__container">
      <Empty>Select a Challenge Log to see more details</Empty>
    </div>
  );
}
