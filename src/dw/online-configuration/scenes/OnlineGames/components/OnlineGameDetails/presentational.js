import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from 'dw/core/components/SectionTitle';
import KeyValue from 'dw/core/components/KeyValue';

import UserLink from 'dw/online-configuration/components/UserLink';

import OnlineGameDetailsEmpty from '../OnlineGameDetailsEmpty';

import './presentational.css';

const OnlineGameDetails = props => {
  const { selectedOnlineGame } = props;
  if (!selectedOnlineGame) return <OnlineGameDetailsEmpty />;
  const elementsOrder = props.elementsOrder.map(column => {
    switch (column) {
      case 'userID':
        return {
          name: 'userID',
          key: column,
          formatter: userId => <UserLink userId={userId} />,
        };
      case 'sessionHostAddr':
        return {
          name: column,
          key: column,
          formatter: hostAddr => {
            const values = hostAddr.addresses || [];
            return (
              <div>
                {values.map(value => {
                  const item = `${value.ip}:${value.port}`;
                  return <div key={item}>{item}</div>;
                })}
                {hostAddr.nat !== undefined && (
                  <small>NAT_TYPE = {hostAddr.nat}</small>
                )}
              </div>
            );
          },
        };
      default:
        return column;
    }
  });
  return (
    <div className="details__container online-game flex-rows-container">
      <SectionTitle
        title={`${
          selectedOnlineGame.sessionID || selectedOnlineGame.securityID
        }`}
      />
      <div className="scrollable-content">
        <KeyValue
          item={selectedOnlineGame}
          elementsOrder={elementsOrder}
          size={4}
        />
      </div>
    </div>
  );
};
OnlineGameDetails.propTypes = {
  selectedOnlineGame: PropTypes.object,
  elementsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
};
OnlineGameDetails.defaultProps = {
  selectedOnlineGame: undefined,
};

export default OnlineGameDetails;
