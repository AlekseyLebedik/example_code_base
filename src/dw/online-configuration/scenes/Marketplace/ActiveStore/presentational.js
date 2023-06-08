import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from 'dw/core/components/SectionTitle';
import Tabs from './components/Tabs';
import styles from './presentational.module.css';

const ActiveStoreStateless = props => {
  const { activeStore, onClickStoreLabel } = props;

  return (
    <section className="main-container active-store flex-rows-container">
      <SectionTitle
        extraContent={
          <div className={styles.storeInfo}>
            Store{' '}
            <a
              className="store-label"
              onClick={() => onClickStoreLabel(activeStore.label)}
            >
              {activeStore.label}
            </a>{' '}
            (created: {activeStore.created})
          </div>
        }
        small
      />
      <Tabs />
    </section>
  );
};

ActiveStoreStateless.propTypes = {
  activeStore: PropTypes.shape({
    label: PropTypes.string,
    created: PropTypes.string,
    context: PropTypes.string,
  }),
  onClickStoreLabel: PropTypes.func.isRequired,
};
ActiveStoreStateless.defaultProps = {
  activeStore: {},
};

export default ActiveStoreStateless;
