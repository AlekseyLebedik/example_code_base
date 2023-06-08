import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  useParams,
  useLocation,
  useHistory,
  generatePath,
  withRouter,
} from 'react-router-dom';

import orderBy from 'lodash/orderBy';

import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputAdornment from '@material-ui/core/InputAdornment';

import { usePrevious } from 'dw/core/hooks';
import Loading from 'dw/core/components/Loading';
import Empty from 'dw/core/components/Empty';

import { useEvents } from 'dw/online-configuration/scenes/gvs/graphql/hooks';
import {
  SCENES,
  gvsUrlPattern,
} from 'dw/online-configuration/scenes/gvs/constants';
import { useSelector } from 'react-redux';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { useDrafts } from '../../hooks';
import { CurrentDraftContext } from '../../../../context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflowY: 'auto',
  },
  listContainer: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listSubheader: {
    paddingLeft: '6px',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  listItemText: {
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  listItemPrimary: {
    fontSize: 14,
  },
  listItemSecondary: {
    position: 'absolute',
    right: -theme.spacing(6),
    bottom: '-14px',
    fontSize: 11,
  },
  badge: {
    height: '22px',
    width: '22px',
    '&> span': {
      height: '15px',
      minWidth: '15px',
      fontSize: '9px',
      borderRadius: '8px',
    },
  },
  new: {
    backgroundColor: '#f79401',
  },
  empty: { width: '0px !important' },
  tags: {
    position: 'absolute',
    fontSize: '9px',
    top: '4px',
    '& span': {
      border: '1px solid rgba(0, 0, 0, 0.35)',
      borderRadius: '2px',
      padding: '0 5px',
      marginRight: '5px',
    },
  },
  search: {
    flexGrow: 1,
    margin: `${theme.spacing(1)}px 0`,
  },
  sortButton: {
    height: '24px',
    marginRight: -theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const LongItemTooltip = ({ title, ...props }) => {
  const Component = title.length > 40 ? Tooltip : Fragment;
  const componentProps =
    title.length > 40
      ? {
          ...props,
          title: title.length > 35 ? title : undefined,
        }
      : props;
  return <Component {...componentProps} />;
};
LongItemTooltip.propTypes = {
  title: PropTypes.string.isRequired,
};

const MasterBase = ({
  match,
  paramName,
  items,
  componentName,
  TagsComponent,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { [paramName]: itemId } = useParams();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const filtered = useMemo(() => {
    if (!items) return [];
    const lst = items.filter(
      d => !query || d.name.toLowerCase().includes(query.toLowerCase())
    );
    if (match.params.scene === SCENES.DRAFTS) {
      return orderBy(lst, sortBy, sortBy === 'createdAt' ? 'desc' : 'asc');
    }
    return lst;
  }, [items, query, sortBy]);
  const [, setCurrentDraft] = useContext(CurrentDraftContext);
  const onChange = useCallback(
    newItemId => {
      history.push({
        pathname: generatePath(match.path, {
          ...match.params,
          [paramName]: newItemId,
        }),
        search: location.search,
      });
      if (paramName === 'draftId') {
        setCurrentDraft(newItemId);
      }
    },
    [history, location, match.path, match.params, setCurrentDraft]
  );
  const formatDateTime = useSelector(formatDateTimeSelector);
  useEffect(() => {
    if (
      items &&
      itemId &&
      items.find(d => String(d.id) === itemId) === undefined
    )
      onChange(null);
  }, [items, itemId, onChange]);
  const onTabChange = useCallback(
    (_, value) => {
      history.push(
        generatePath(gvsUrlPattern, {
          ...match.params,
          scene: value,
        })
      );
    },
    [match.params]
  );
  return (
    <>
      <Tabs
        value={match.params.scene || SCENES.DRAFTS}
        onChange={onTabChange}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
      >
        <Tab label="Drafts" value={SCENES.DRAFTS} />
        <Tab label="Events" value={SCENES.EVENTS} />
      </Tabs>
      <div className="flex items-center">
        <TextField
          onChange={e => setQuery(e.target.value)}
          value={query}
          placeholder={`Search ${componentName}`}
          InputLabelProps={{ shrink: true }}
          className={classes.search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <Tooltip title="Clear Search">
                  <IconButton onClick={() => setQuery('')}>
                    <Icon>clear</Icon>
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : undefined,
          }}
        />
        {match.params.scene === SCENES.DRAFTS && (
          <Tooltip
            title={`Sort by ${
              sortBy === 'createdAt' ? 'Name' : 'Creation Date'
            }`}
          >
            <IconButton
              className={classes.sortButton}
              onClick={() =>
                setSortBy(old => (old === 'createdAt' ? 'name' : 'createdAt'))
              }
              size="small"
            >
              <Icon fontSize="inherit">sort</Icon>
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div className={classes.listContainer}>
        <List className={classes.root} subheader={<li />}>
          <ul className={classes.ul}>
            {filtered.map(d => (
              <Fragment key={d.id}>
                <ListItem
                  selected={String(d.id) === itemId}
                  onClick={() => onChange(d.id)}
                  button
                >
                  {TagsComponent && (
                    <div className={classes.tags}>
                      <TagsComponent item={d} />
                    </div>
                  )}
                  <LongItemTooltip title={d.name}>
                    <ListItemText
                      primary={d.name}
                      secondary={d.createdAt && formatDateTime(d.createdAt)}
                      classes={{
                        root: classes.listItemText,
                        primary: classes.listItemPrimary,
                        secondary: classes.listItemSecondary,
                      }}
                    />
                  </LongItemTooltip>
                  <Badge
                    badgeContent={
                      d?.removed?.length > 0 ? `-${d.removed.length}` : 0
                    }
                    className={cn(classes.badge, {
                      [classes.empty]: d?.removed?.length === 0,
                    })}
                    color="secondary"
                  />
                  <Badge
                    badgeContent={
                      d?.added?.length > 0 ? `+${d.added.length}` : 0
                    }
                    className={cn(classes.badge, {
                      [classes.empty]: d?.added?.length === 0,
                    })}
                    color="primary"
                  />
                </ListItem>
                <Divider component="li" />
              </Fragment>
            ))}
          </ul>
        </List>
      </div>
    </>
  );
};

MasterBase.propTypes = {
  match: PropTypes.object.isRequired,
  paramName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  TagsComponent: PropTypes.elementType,
};
MasterBase.defaultProps = {
  TagsComponent: undefined,
};

const Drafts = props => {
  const { draftId } = useParams();
  const location = useLocation();
  const refreshKey = usePrevious(location.state);
  const fetchPolicy = useMemo(
    () =>
      location.state && location.state !== refreshKey
        ? 'network-only'
        : undefined,
    [refreshKey, location.state]
  );
  const { loading, error, drafts, updateCache } = useDrafts({ fetchPolicy });
  useEffect(() => {
    if (!drafts) return;
    const draft = drafts.find(d => d.id === draftId);
    if (!draft) return;
    if (draft.added.length > 0 || draft.removed.length > 0) {
      setTimeout(() => updateCache([draft]), 1000);
    }
  }, [draftId, drafts, updateCache]);
  if (loading) return <Loading />;
  if (error) return <Empty>Something gone wrong. See logs for details</Empty>;
  return (
    <MasterBase
      {...props}
      paramName="draftId"
      componentName="Drafts"
      items={drafts}
    />
  );
};

const EventTags = ({ item }) =>
  item.scopes.map(s => <span key={s.scopeName}>{s.scopeName}</span>);

const Events = props => {
  const { loading, error, events } = useEvents('network-only');
  const items = useMemo(() => {
    if (!events) return [];
    return events.map(e => ({
      id: e.eventID,
      name: e.eventName || e.eventDraft?.name || `Draft ${e.eventDraft?.id}`,
      createdAt: e.createdAt,
      scopes: e.scopes,
    }));
  }, [events]);
  if (loading) return <Loading />;
  if (error) return <Empty>Something gone wrong. See logs for details</Empty>;
  return (
    <MasterBase
      {...props}
      paramName="eventId"
      componentName="Events"
      items={items}
      TagsComponent={EventTags}
    />
  );
};

const Master = ({ match }) => {
  const {
    params: { scene },
  } = match;
  if (scene === SCENES.DRAFTS) return <Drafts match={match} />;
  if (scene === SCENES.EVENTS) return <Events match={match} />;
  return <>Coming Soon!!!</>;
};
Master.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(Master);
