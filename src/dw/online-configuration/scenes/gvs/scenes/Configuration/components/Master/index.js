import React, { Fragment, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import capitalize from 'lodash/capitalize';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import {
  ABTESTING_EDIT_GROUPS,
  GVS_EDIT_CONFIGURATION,
  OBJECT_STORE_EDIT_GROUPS,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import Select from 'dw/core/components/Select';

import {
  usePopulationsDisplayValues,
  usePopulations,
  usePopulationType,
} from '@gvs/graphql/hooks';
import { POPULATION_TYPE_OPTIONS, PLAYER } from '@gvs/constants';

import SkeletonProgress from 'dw/core/components/SearchableList/components/SkeletonProgress';
import AddPopulationButton from './components/AddPopulation';
import AddGroupButton from './components/AddGroup';

import {
  useConnectedPopulations,
  useDraftPopulations,
  useFormatPopulations,
} from './hooks';
import {
  DeletePopulationButton,
  DeletePopulationModal,
} from './components/DeletePopulation';

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
  listSection: {
    backgroundColor: 'inherit',
  },
  listItemSize: {
    fontSize: 14,
  },
  listItem: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    marginRight: -theme.spacing(2),
    '&:after': {
      content: '"•"',
      fontSize: 35,
      lineHeight: '1px',
      marginRight: theme.spacing(1),
    },
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listSubheader: {
    paddingLeft: '6px',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  selectedPopulation: {
    color: '#d0861b',
    fontWeight: 'bolder',
  },
  selectedGlobal: {
    color: '#393939',
    fontWeight: 'bolder',
  },
  parentPopulation: {
    color: '#de86b6',
    fontWeight: 'bolder',
  },
  error: { color: theme.palette.error.main, padding: theme.spacing(1) },
  draft: {
    '&:after': {
      color: theme.palette.text.disabled,
      content: '"edited"',
      position: 'absolute',
      fontSize: '10px',
      padding: '0 5px',
      bottom: '2px',
      right: '2px',
      fontWeight: 'normal',
    },
  },
  filters: {
    position: 'relative',
    display: 'flex',
    marginTop: theme.spacing(2),
    alignItems: 'center',
  },
  info: {
    color: 'rgba(0, 0, 0, 0.35)',
    cursor: 'default',
  },
}));

const Master = ({ onChange, allEdits }) => {
  const { scopeURI, population } = useParams();
  const [deletePopulation, handleDeletePopulationClick] = useState();
  const editConfigurationPermission = useCurrentEnvPermission([
    GVS_EDIT_CONFIGURATION,
  ]);
  const editObjectStorePermission = useCurrentEnvPermission([
    OBJECT_STORE_EDIT_GROUPS,
  ]);
  const editABTestingGroups = useCurrentEnvPermission([ABTESTING_EDIT_GROUPS]);
  const createGroupPermission =
    editObjectStorePermission || editABTestingGroups;
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [showDraftOnly, setShowDraftOnly] = useState(false);

  const [addedPopulations, setAddedPopulations] = useState([]);
  useEffect(() => {
    setAddedPopulations([]);
  }, [scopeURI]);

  const { populations: rawPopulations, loading, error } = usePopulations();
  const populationType = usePopulationType(population);
  const draftPopulations = useDraftPopulations(allEdits);
  useEffect(() => setShowDraftOnly(false), [draftPopulations]);
  const extraPopulationsRaw = useMemo(() => {
    if (!rawPopulations) return [];
    return draftPopulations
      .filter(
        dp =>
          !rawPopulations.find(p => p.type === dp.type && p.value === dp.value)
      )
      .map(({ type, value }) => ({ type, value }));
  }, [draftPopulations, rawPopulations]);
  const { populations: extraPopulations } =
    usePopulationsDisplayValues(extraPopulationsRaw);
  const allPopulations = useMemo(() => {
    if (!rawPopulations) return [];
    const result = rawPopulations.concat(extraPopulations || []);
    addedPopulations.forEach(p => {
      if (!result.find(r => r.type === p.type && r.value === p.value)) {
        result.push(p);
      }
    });
    return result.filter(p => p.type !== 'global' || p.value === PLAYER);
  }, [addedPopulations, rawPopulations, extraPopulations]);
  const { grouped, groups } = useFormatPopulations({
    allPopulations:
      populationType === PLAYER
        ? allPopulations
        : [{ type: 'global', value: populationType }],
    draftPopulations,
    showDraftOnly,
    query,
    populationType,
  });
  const connectedPopulations = useConnectedPopulations();
  if (error) {
    // eslint-disable-next-line
    console.log(error);
  }
  if (loading) return <SkeletonProgress />;
  return (
    <>
      {error && (
        <div className={classes.error}>
          Something went wrong, when querying populations. The list might be
          incomplete. See console logs for more details.
        </div>
      )}
      {deletePopulation && (
        <DeletePopulationModal
          open
          handleClose={() => handleDeletePopulationClick(null)}
          deletePopulation={deletePopulation}
        />
      )}
      <Select
        value={`global:${populationType}`}
        options={POPULATION_TYPE_OPTIONS}
        onChange={e => onChange(e.target.value)}
        InputProps={
          populationType === PLAYER
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      title={
                        <span>
                          Players refers to:
                          <br />
                          <br />
                          Players
                          <br />
                          Free Players
                          <br />
                          Broadcast Relays
                          <br />
                          Headless Clients
                          <br />
                          QOS Servers
                          <br />
                          Services
                        </span>
                      }
                    >
                      <Icon
                        color="disabled"
                        className={classes.info}
                        fontSize="small"
                      >
                        info
                      </Icon>
                    </Tooltip>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
      {populationType === PLAYER && (
        <div className={classes.filters}>
          <TextField
            onChange={e => setQuery(e.target.value)}
            value={query}
            placeholder="Search Players / Player Groups"
            InputLabelProps={{ shrink: true }}
            className="flex-grow"
            InputProps={{
              endAdornment: (
                <>
                  {draftPopulations.length > 0 && !showDraftOnly ? (
                    <Tooltip title="Show only affected populations">
                      <IconButton
                        onClick={() => {
                          setShowDraftOnly(true);
                        }}
                        size="small"
                      >
                        <Icon fontSize="inherit">filter_list</Icon>
                      </IconButton>
                    </Tooltip>
                  ) : null}
                  {query || showDraftOnly ? (
                    <InputAdornment position="end">
                      <Tooltip title="Clear filters">
                        <IconButton
                          onClick={() => {
                            setQuery('');
                            setShowDraftOnly(false);
                          }}
                          size="small"
                        >
                          <Icon fontSize="inherit">cancel</Icon>
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ) : null}
                </>
              ),
            }}
          />
        </div>
      )}
      <div className={classes.listContainer}>
        <List className={classes.root} subheader={<li />}>
          {groups.map(group => (
            <li key={`section-${group}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader
                  classes={{ root: classes.listSubheader }}
                  disableGutters
                >
                  {capitalize(group)}

                  {group.toLowerCase() === 'user' &&
                  editConfigurationPermission ? (
                    <ListItemSecondaryAction>
                      <AddPopulationButton
                        setAddedPopulations={setAddedPopulations}
                      />
                    </ListItemSecondaryAction>
                  ) : null}
                  {group.toLowerCase() === 'groups' && createGroupPermission ? (
                    <ListItemSecondaryAction>
                      <AddGroupButton />
                    </ListItemSecondaryAction>
                  ) : null}
                </ListSubheader>
                {grouped[group].map(p => (
                  <Fragment key={`item-${group}-${p.value}`}>
                    <ListItem
                      selected={p.value === population}
                      onClick={() => onChange(p.value)}
                      button
                    >
                      <ListItemText
                        primary={
                          <div
                            className={cn(classes.listItemSize, {
                              [classes.listItem]: connectedPopulations.includes(
                                p.value
                              ),
                            })}
                          >
                            {p.label}
                            {editConfigurationPermission &&
                            p.type !== 'global' &&
                            p.current ? (
                              <DeletePopulationButton
                                onClick={() => handleDeletePopulationClick(p)}
                              />
                            ) : null}
                          </div>
                        }
                        primaryTypographyProps={{
                          className: cn({
                            [classes.selectedPopulation]:
                              (connectedPopulations.includes(p.value) ||
                                p.value === population) &&
                              p.type !== 'global',
                            [classes.selectedGlobal]:
                              (connectedPopulations.includes(p.value) ||
                                p.value === population) &&
                              p.type === 'global',
                            [classes.parentPopulation]:
                              p.value !== population &&
                              connectedPopulations.includes(p.value) &&
                              ['groups', 'abtesting'].includes(group),
                            [classes.draft]: draftPopulations.find(
                              dp => dp.population === p.value
                            ),
                          }),
                        }}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </Fragment>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </div>
    </>
  );
};

Master.propTypes = {
  onChange: PropTypes.func.isRequired,
  allEdits: PropTypes.arrayOf(PropTypes.object),
};
Master.defaultProps = {
  allEdits: [],
};

export default Master;
