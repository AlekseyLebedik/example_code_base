import React from 'react';
import Empty from 'dw/core/components/Empty';

import './index.css';

export default function AccountDetailsEmpty() {
  return (
    <div className="details-empty__container account">
      <Empty className="empty details-empty__text account">
        Select an Account to see more details
      </Empty>
    </div>
  );
}
