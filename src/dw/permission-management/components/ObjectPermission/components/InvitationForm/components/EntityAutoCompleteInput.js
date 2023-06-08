import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import { isValid as isValidEmail } from 'dw/core/helpers/email-validation';

const BACKSPACE_KEY_CODE = 8;
const ENTER_KEY_CODE = 13;

function getSuggestions(entities, value) {
  const normSearch = value.toLowerCase();
  const select = entities.filter(
    i => i.name.toLowerCase().indexOf(normSearch) > -1
  );
  const newOption = isValidEmail(value)
    ? [
        {
          name: value,
          id: value,
          type: 'user',
        },
      ]
    : [];
  return [...select, ...newOption];
}

const ICONS = {
  group: 'group',
  company: 'domain',
  user: 'person',
};

const EntityIcon = ({ type }) => <Icon>{ICONS[type]}</Icon>;

class EntityAutoCompleteInput extends React.Component {
  state = {
    inputValue: '',
  };

  handleInputKeyDown =
    ({ selectItemAtIndex, isOpen }) =>
    event => {
      if (event.keyCode === ENTER_KEY_CODE && isOpen) {
        selectItemAtIndex(0);
        event.preventDefault();
        return;
      }
      if (event.keyCode !== BACKSPACE_KEY_CODE) return;

      this.setState(state => {
        const { inputValue } = state;
        const { value, onChange } = this.props;
        if (value.length && !inputValue.length) {
          const newValue = value.slice(0, value.length - 1);
          onChange(newValue);
        }
        return {};
      });
    };

  handleInputChange = event => {
    const { value: inputValue } = event.target;

    if (inputValue.endsWith(' ') && isValidEmail(inputValue.trim())) {
      const newValue = {
        name: inputValue,
        id: inputValue,
        type: 'user',
      };
      this.handleChange(newValue);
      return;
    }

    this.setState({ inputValue });
  };

  handleInputBlur = event => {
    const { value: inputValue } = event.target;

    if (isValidEmail(inputValue.trim())) {
      const newValue = {
        name: inputValue,
        id: inputValue,
        type: 'user',
      };
      this.handleChange(newValue);
    }
  };

  handleChange = item => {
    const { value, onChange } = this.props;

    if (value.indexOf(item) === -1) {
      const selectedItem = [...value, item];
      onChange(selectedItem);
    }

    this.setState({
      inputValue: '',
    });
  };

  handleDelete = item => () => {
    const { value, onChange } = this.props;
    onChange(value.filter(i => i !== item));
  };

  render() {
    const { inputValue } = this.state;
    const { entities, value, classes } = this.props;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={value}
        itemToString={item => item.name}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          highlightedIndex,
          openMenu,
          selectItemAtIndex,
        }) => (
          <div className={classes.container}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: value.length > 0 ? true : undefined }}
              InputProps={getInputProps({
                classes: {
                  root: classes.inputRoot,
                  input: classes.inputInput,
                },
                startAdornment:
                  value.length > 0
                    ? value.map(item => (
                        <Chip
                          classes={{
                            root: classes.chip,
                            deleteIcon: classes.deleteIcon,
                          }}
                          key={`${item.type}-${item.id}`}
                          tabIndex={-1}
                          label={item.name}
                          icon={<EntityIcon type={item.type} />}
                          onDelete={this.handleDelete(item)}
                        />
                      ))
                    : undefined,
                onClick: openMenu,
                onChange: this.handleInputChange,
                onBlur: this.handleInputBlur,
                onKeyDown: this.handleInputKeyDown({
                  selectItemAtIndex,
                  isOpen,
                }),
              })}
              label="Company/Group/Email"
            />
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(entities, inputValue2).map(
                  (suggestion, index) => {
                    const isHighlighted = highlightedIndex === index;
                    return (
                      <MenuItem
                        key={`${suggestion.type}-${suggestion.id}`}
                        selected={isHighlighted}
                        component="div"
                        {...getItemProps({ item: suggestion })}
                      >
                        <EntityIcon type={suggestion.type} />
                        {suggestion.name}
                      </MenuItem>
                    );
                  }
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      width: 552,
      height: 350,
      overflowY: 'scroll',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
    position: 'fixed',
    zIndex: 1,
  },
  chip: {
    minWidth: 'inherit',
    marginRight: theme.spacing(),
    marginBottom: theme.spacing(),
    paddingLeft: theme.spacing(),
    height: 32,
    borderRadius: 4,
  },
  deleteIcon: {
    backgroundColor: 'transparent',
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
});

const StyledEntityAutoCompleteInput = withStyles(styles)(
  EntityAutoCompleteInput
);

const ReduxFormSelect = ({
  input,
  meta: { touched, error },
  helperText,
  ...props
}) => (
  <StyledEntityAutoCompleteInput
    error={Boolean(touched && error)}
    helperText={(touched && error) || helperText}
    {...input}
    {...props}
  />
);

ReduxFormSelect.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  helperText: PropTypes.string,
};

ReduxFormSelect.defaultProps = {
  input: {},
  meta: {},
  helperText: null,
};

export default ReduxFormSelect;
