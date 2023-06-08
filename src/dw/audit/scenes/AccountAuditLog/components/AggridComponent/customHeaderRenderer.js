import React, { useCallback, useEffect, useState } from 'react';

import Icon from '@material-ui/core/Icon';
import styles from './index.module.css';

const CustomHeaderRenderer = params => {
  const [allRowsExpanded, setAllRowsExpanded] = useState(false);

  const expandAllRows = useCallback(() => {
    setAllRowsExpanded(prevValue => !prevValue);
  }, []);

  useEffect(() => {
    params.api.forEachNode(node => {
      node.setExpanded(allRowsExpanded);
    });
  }, [allRowsExpanded]);

  return (
    <div className={styles.userIdColumnHeaderLeft}>
      <Icon className={styles.userIdExpandAllButton} onClick={expandAllRows}>
        {allRowsExpanded ? 'expand_more' : 'expand_less'}
      </Icon>
      <div>Event</div>
    </div>
  );
};

export default CustomHeaderRenderer;
