import React from 'react';
import PropTypes from 'prop-types';

import UserLink from 'dw/online-configuration/components/UserLink';
import KeyValue from 'dw/core/components/KeyValue';
import SectionTitle from 'dw/core/components/SectionTitle';

import QuotaAllowanceDetailsEmpty from '../QuotaAllowanceDetailsEmpty';

import './presentational.css';

const QuotaAllowanceDetails = props => {
  const { selectedListItem, elementsOrder } = props.reduxProps;
  if (!selectedListItem) return <QuotaAllowanceDetailsEmpty />;
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
    <div className="details__container quota-allowance flex-rows-container">
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
QuotaAllowanceDetails.propTypes = {
  reduxProps: PropTypes.shape({
    selectedListItem: PropTypes.object,
    elementsOrder: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default QuotaAllowanceDetails;
