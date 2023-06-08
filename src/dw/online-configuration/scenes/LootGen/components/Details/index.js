import React from 'react';
import PropTypes from 'prop-types';

import KeyValue from 'dw/core/components/KeyValue';
import SectionTitle from 'dw/core/components/SectionTitle';

function Details({ selectedItem }) {
  if (!selectedItem) return null;

  const elementsOrder = [
    { name: 'ID', key: 'id' },
    { name: 'Status', key: 'status' },
    { name: 'Base branch', key: 'baseBranch' },
    { name: 'Job ID', key: 'jobId' },
  ];

  if (selectedItem.dockerTag) {
    elementsOrder.push({ name: 'Docker tag', key: 'dockerTag' });
  }

  if (selectedItem.failedTests) {
    elementsOrder.push({
      name: 'Failed tests',
      key: 'failedTests',
      formatter: value => <div>{JSON.stringify(value)}</div>,
    });
  }

  return (
    <div className="details__container flex-rows-container">
      <SectionTitle title={`${selectedItem.baseBranch} | ${selectedItem.id}`} />
      <div className="scrollable-content">
        <KeyValue size={2} item={selectedItem} elementsOrder={elementsOrder} />
      </div>
    </div>
  );
}

Details.propTypes = {
  selectedItem: PropTypes.object,
};

Details.defaultProps = {
  selectedItem: null,
};

export default Details;
