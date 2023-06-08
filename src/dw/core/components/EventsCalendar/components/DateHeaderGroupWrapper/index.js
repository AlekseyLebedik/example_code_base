import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

import {
  formatDateTime,
  printDurationFromSeconds,
  timezoneOrDefaultSelector,
} from 'dw/core/helpers/date-time';

const DateHeaderGroupWrapper = ({
  children,
  group: { name, start, timewarp_settings: timewarpSettings = {} },
  userTimezone,
}) => (
  <Tooltip
    placement="bottom"
    title={
      <>
        <small>{formatDateTime(start, undefined, userTimezone)}</small>
        <div>Group: {name}</div>
        <div>
          Timewarp Type:{' '}
          {timewarpSettings ? timewarpSettings.type : 'undefined'}
        </div>
        {timewarpSettings && timewarpSettings.type === 'offset' && (
          <div>
            Time Delta:{' '}
            {printDurationFromSeconds(timewarpSettings.time_delta) || 'N/A'}
          </div>
        )}
      </>
    }
  >
    <span>{children}</span>
  </Tooltip>
);

DateHeaderGroupWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.object.isRequired,
    timewarp_settings: PropTypes.object,
  }).isRequired,
  userTimezone: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userTimezone: timezoneOrDefaultSelector(state),
});

export default connect(mapStateToProps)(DateHeaderGroupWrapper);
