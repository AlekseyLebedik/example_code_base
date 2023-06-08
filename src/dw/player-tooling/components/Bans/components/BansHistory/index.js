import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { uuid } from 'dw/core/helpers/uuid';
import KeyValue from 'dw/core/components/KeyValue';
import ShowMore from 'dw/player-tooling/components/ShowMore';

const useStyles = makeStyles(() => ({
  container: {
    paddingBottom: '10px',
  },
  key: {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  value: {
    padding: '0 !important',
  },
}));

const BansHistory = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const bansLength = data.length;
  const MIN = 2;
  const classes = useStyles();
  return useMemo(
    () => (
      <>
        {data.slice(0, !expanded ? MIN : bansLength).map(ban => (
          <div key={uuid()} className={classes.container}>
            <KeyValue classes={classes} item={ban} />
          </div>
        ))}
        {bansLength > MIN ? (
          <ShowMore
            key="show-more-bans-button"
            expanded={expanded}
            handleClick={setExpanded}
            lessMsg="Show Fewer Cross Platform Bans"
            moreMsg="Show More Cross Platform Bans"
          />
        ) : null}
      </>
    ),
    [data, expanded]
  );
};

BansHistory.propTypes = {
  data: PropTypes.array,
};

BansHistory.defaultProps = {
  data: [],
};

export default BansHistory;
