import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import UserAutoComplete from 'dw/online-configuration/components/UserAutoComplete';
import { GET_POPULATION_QUERY } from 'dw/online-configuration/scenes/gvs/graphql/queries';
import { useApolloClient } from '@apollo/client';

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: -theme.spacing(2),
  },
  container: {
    height: '100%',
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    padding: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  warning: {
    color: 'rgba(0, 0, 0, 0.5)',
    '&>span': {
      color: theme.palette.warning.main,
      display: 'flex',
      alignItems: 'center',
    },
    '&>span:before': {
      fontFamily: 'Material Icons',
      content: '"\\e002"',
      marginRight: theme.spacing(1),
    },
    '&>span:after': {
      fontFamily: 'Material Icons',
      content: '"\\e002"',
      marginLeft: theme.spacing(1),
    },
  },
}));

const AddPopulationButton = ({ setAddedPopulations }) => {
  const classes = useStyles();
  const [value, setValue] = useState(() => []);
  const [open, setOpen] = useState(false);
  const client = useApolloClient();
  const onAdd = useCallback(() => {
    const populations = value.map(({ label }) => {
      const [displayValue, id] = label.split(' | ');
      return {
        type: 'user',
        value: `uno-${id}`,
        displayValue,
      };
    });
    setAddedPopulations(prev =>
      populations.reduce((acc, p) => {
        const exists = acc.find(
          ap => ap.type === p.type && ap.value === p.value
        );
        if (exists) {
          return acc;
        }
        client.writeQuery({
          query: GET_POPULATION_QUERY,
          data: { Population: { ...p, __typename: 'Population' } },
          variables: p,
        });
        return [...acc, p];
      }, prev)
    );
    setOpen(false);
  }, [value, setAddedPopulations, client]);
  useEffect(() => setValue([]), [open]);
  return (
    <>
      <Tooltip title="Add a new Player">
        <IconButton
          className={classes.button}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon color="primary">person_add</Icon>
        </IconButton>
      </Tooltip>
      {open && (
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <div className={classes.container}>
            <div className="flex-grow">
              <UserAutoComplete
                label="Select players to add"
                value={value}
                onChange={setValue}
                valuesOnly={false}
                fullWidth
                isMulti
                autoFocus
              />
            </div>
            {value.length > 0 ? (
              <div className={classes.warning}>
                <span>WARNING</span>
                Make sure you add the overrides for the selected populations
                before you navigate to other page or change a scope. Otherwise
                the added populations would be lost. You will lose them after
                page reload as well.
              </div>
            ) : null}
            <div className={classes.actions}>
              <Button color="default" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={onAdd}
                disabled={value.length === 0}
              >
                Add
              </Button>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};
AddPopulationButton.propTypes = {
  setAddedPopulations: PropTypes.func.isRequired,
};

export default AddPopulationButton;
