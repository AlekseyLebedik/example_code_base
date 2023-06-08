import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';

import ApprovedIcon from '../../../../icons/ApprovedIcon';
import PendingIcon from '../../../../icons/PendingIcon';
import DeniedIcon from '../../../../icons/DeniedIcon';

import Svg from '../../../../components/Svg';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    margin: '0.5rem 0',
  },
  avatar: {
    marginRight: '0.75rem',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  moreBtn: {
    marginLeft: '5px',
    borderRadius: '4px',
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.grey[300],
  },
  icon: {
    border: '2px solid #FFF',
    borderRadius: '50%',
    marginLeft: '-5px',
  },
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#FFF',
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}))(Tooltip);

const ApproverRenderer = props => {
  const classes = useStyles();

  const approvers = props.value;

  if (approvers.length === 0) return 'None';

  const numbSplit = 2;
  const visible = approvers.slice(0, numbSplit);
  const more = approvers.slice(numbSplit);

  const statusIcons = {
    approved: (
      <Svg
        className={classes.icon}
        size="medium"
        color="approved"
        icon={<ApprovedIcon />}
      />
    ),
    denied: (
      <Svg
        className={classes.icon}
        size="medium"
        color="denied"
        icon={<DeniedIcon />}
      />
    ),
    pending: (
      <Svg
        className={classes.icon}
        size="medium"
        color="pending"
        icon={<PendingIcon />}
      />
    ),
  };

  const renderApprovers = approver => (
    <div key={approver.name} className={classes.container}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={statusIcons[approver.status]}
      >
        <Avatar
          className={classes.avatar}
          alt={approver.name}
          src={approver.slackProfileImg}
        />
      </Badge>
    </div>
  );

  return (
    <div className={classes.container}>
      {visible.length !== 0 && visible.map(a => renderApprovers(a))}
      {more.length !== 0 && (
        <HtmlTooltip
          placement="right"
          title={more.map(a => renderApprovers(a))}
        >
          <div className={classes.moreBtn}>
            <MoreVertIcon />
          </div>
        </HtmlTooltip>
      )}
    </div>
  );
};

ApproverRenderer.propTypes = {
  value: PropTypes.array,
};

ApproverRenderer.defaultProps = {
  value: [],
};

export default ApproverRenderer;
