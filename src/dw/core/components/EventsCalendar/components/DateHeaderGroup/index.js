import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.module.css';

const DateHeaderGroup = props => {
  const {
    components: { headerGroupWrapper: HeaderGroupWrapper },
    group,
    onSelect,
  } = props;
  return (
    <HeaderGroupWrapper {...props}>
      <div
        className={classNames('rbc-date-header-group', styles.groupContainer)}
        onClick={e => onSelect && onSelect(group, e)}
        onContextMenu={e => e.preventDefault()}
        style={{ backgroundColor: group.color || '#938888' }}
      >
        <div
          className={classNames('rbc-date-header-group-name', styles.groupName)}
        >
          {group.name}
        </div>
      </div>
    </HeaderGroupWrapper>
  );
};

DateHeaderGroup.propTypes = {
  components: PropTypes.shape({
    headerGroupWrapper: PropTypes.node.isRequired,
  }).isRequired,
  group: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DateHeaderGroup;
