import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

export const RedBadge = withStyles(() => ({
  badge: { backgroundColor: '#b71c1c', color: '#fff' },
}))(Badge);

export const OrangeBadge = withStyles(() => ({
  badge: { backgroundColor: '#ff8f1f', color: '#fff' },
}))(Badge);
