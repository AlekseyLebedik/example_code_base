import React from 'react';
import PropTypes from 'prop-types';
import Empty from 'dw/core/components/Empty';

const MainDetailsEmpty = ({ msg }) => (
  <div className="details-empty__container">
    <Empty className="details-empty__text">{msg}</Empty>
  </div>
);

MainDetailsEmpty.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default MainDetailsEmpty;
