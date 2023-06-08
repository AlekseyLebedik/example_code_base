import React from 'react';
import PropTypes from 'prop-types';

import UserLink from 'dw/online-configuration/components/UserLink';
import KeyValue from 'dw/core/components/KeyValue';
import SectionTitle from 'dw/core/components/SectionTitle';

import QuotaUsageDetailsEmpty from '../QuotaUsageDetailsEmpty';

import './presentational.css';

const QuotaUsageDetails = props => {
  const { selectedListItem, elementsOrder } = props.reduxProps;
  if (!selectedListItem) return <QuotaUsageDetailsEmpty />;
  const newElementsOrder = elementsOrder.map(column => {
    switch (column) {
      case 'userID':
        return {
          name: 'userID',
          key: column,
          formatter: userId => <UserLink userId={userId} />,
        };
      default:
        return column;
    }
  });
  return (
    <div className="details__container quota-usage flex-rows-container">
      <SectionTitle title={`${selectedListItem.userID}`} />
      <div className="scrollable-content">
        <KeyValue
          item={selectedListItem}
          elementsOrder={newElementsOrder}
          size={4}
        />
      </div>
    </div>
  );
};
QuotaUsageDetails.propTypes = {
  reduxProps: PropTypes.shape({
    userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    elementsOrder: PropTypes.arrayOf(PropTypes.string),
    selectedListItem: PropTypes.object,
  }).isRequired,
};

export default QuotaUsageDetails;
