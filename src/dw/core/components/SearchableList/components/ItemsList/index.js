import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './index.module.css';

const ItemsList = ({
  items,
  getItem,
  showMore,
  onShowMore,
  infiniteScroll,
}) => {
  const itemsList = items ? items.map(getItem) : [];
  return (
    <div id="scrollableContainer" className="items-list flex-initial">
      {infiniteScroll ? (
        <InfiniteScroll
          dataLength={items.length}
          next={onShowMore}
          hasMore={showMore}
          loader={
            <span className={styles.loading}>
              <CircularProgress size={28} />
            </span>
          }
          scrollableTarget="scrollableContainer"
          scrollThreshold={1}
        >
          {itemsList}
          {showMore ? (
            <div className={styles.loadingContainer}>&nbsp;</div>
          ) : null}
        </InfiniteScroll>
      ) : (
        itemsList
      )}
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ),
  getItem: PropTypes.func.isRequired,
  showMore: PropTypes.bool.isRequired,
  onShowMore: PropTypes.func,
  infiniteScroll: PropTypes.bool,
};
ItemsList.defaultProps = {
  items: undefined,
  onShowMore: undefined,
  infiniteScroll: false,
};

export default ItemsList;
