/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Toolbar from '@material-ui/core/Toolbar';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import AutoComplete from 'dw/core/components/AutocompleteGeneral';
import { PlatformIcon, ProjectIcon } from 'dw/core/components/Icons';

import styles from './AutoComplete.module.css';

const options = [
  {
    value: 'ocean',
    label: 'Ocean',
    icon: <PlatformIcon platform="ps4" className="icon" />,
  },
  { value: 'blue', label: 'Blue', icon: <PlatformIcon platform="pc-steam" /> },
  { value: 'purple', label: 'Purple', icon: <PlatformIcon platform="xbox" /> },
  { value: 'red', label: 'Red', icon: <PlatformIcon platform="wii" /> },
  {
    value: 'orange',
    label: 'Orange',
    icon: <PlatformIcon platform="pc-bnet" />,
  },
  { value: 'yellow', label: 'Yellow', icon: <ProjectIcon name="aw" /> },
  { value: 'green', label: 'Green', icon: <ProjectIcon name="iw" /> },
  { value: 'forest', label: 'Forest', icon: <ProjectIcon name="mw" /> },
  { value: 'slate', label: 'Slate', icon: <ProjectIcon name="ww2" /> },
  { value: 'silver', label: 'Silver', icon: <ProjectIcon name="t8" /> },
];

const getOption = value => options.find(o => o.value === value);

const filterOptions = inputValue =>
  options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterOptions(inputValue));
  }, 1000);
};

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      disabled={props.isDisabled}
      component="div"
      style={props.getStyles('option', props)}
      {...props.innerProps}
    >
      <Avatar className={styles.avatar}>{props.data.icon}</Avatar>
      <ListItemText
        inset
        primary={props.data.label}
        primaryTypographyProps={{
          className: styles.optionText,
        }}
      />
    </MenuItem>
  );
}

function SingleValue(props) {
  return (
    <Typography {...props.innerProps} className={styles.singleValue}>
      <Avatar className={styles.avatar}>{props.data.icon}</Avatar>
      {props.data.label}
    </Typography>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<Icon {...props.removeProps}>cancel</Icon>}
      avatar={<Avatar className={styles.avatar}>{props.data.icon}</Avatar>}
    />
  );
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : provided.color,
    backgroundColor: state.isSelected ? '#4ac0f1' : provided.backgroundColor,
    display: 'flex',
    height: 36,
    paddingTop: 0,
    paddingBottom: 0,
  }),
};

storiesOf('core/AutocompleteGeneral')
  .addDecorator(withInfo())
  .add('single selection', () => (
    <div className={styles.container}>
      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="Default"
      />

      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="Help Text"
        helperText="Red is selected by default"
        defaultValue={getOption('red')}
      />

      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="Error State"
        helperText="Something goes wrong"
        error
      />

      <AutoComplete
        options={options}
        onChange={action('onChange')}
        onAdd={action('onAdd')}
        label="Creatable"
      />
    </div>
  ))
  .add('multiple selection', () => (
    <div className={styles.container}>
      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="Default"
        isMulti
      />

      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="With default options pre-selected"
        defaultValue={[getOption('blue'), getOption('yellow')]}
        helperText="Blue and Yellow selected by default"
        isMulti
      />

      <AutoComplete
        options={options}
        onChange={action('onChange')}
        onAdd={action('onAdd')}
        label="Creatable"
        isMulti
      />
    </div>
  ))
  .add('async loading', () => (
    <div className={styles.container}>
      <AutoComplete
        onChange={action('onChange')}
        loadOptions={loadOptions}
        label="Single Selection"
        placeholder="Select favorite color"
      />

      <AutoComplete
        onChange={action('onChange')}
        loadOptions={loadOptions}
        label="Multiple Selection"
        placeholder="Select multiple colors"
        isMulti
      />

      <AutoComplete
        onChange={action('onChange')}
        loadOptions={loadOptions}
        label="Creatable"
        onAdd={action('onAdd')}
        placeholder="You may create color if we miss one"
      />
    </div>
  ))
  .add('custom options', () => (
    <div className={styles.container}>
      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="Single"
        variant="default"
        defaultValue={getOption('purple')}
        components={{ Option, SingleValue }}
        styles={customStyles}
      />

      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="Multiple"
        variant="default"
        components={{ Option, MultiValue }}
        defaultValue={[
          getOption('ocean'),
          getOption('orange'),
          getOption('silver'),
        ]}
        styles={customStyles}
        isMulti
      />
    </div>
  ))
  .add('styling: variant', () => (
    <div className={styles.container}>
      <AutoComplete
        options={options}
        onChange={action('onChange')}
        label="Default"
        variant="default"
      />

      <AppBar position="relative" className={styles.appBar}>
        <Toolbar>
          <AutoComplete
            options={options}
            onChange={action('onChange')}
            label="Contrast Single"
            variant="contrast"
          />
        </Toolbar>
      </AppBar>

      <AppBar position="relative" className={styles.appBar}>
        <Toolbar>
          <AutoComplete
            options={options}
            onChange={action('onChange')}
            label="Contrast Multiple"
            variant="contrast"
            isMulti
          />
        </Toolbar>
      </AppBar>

      <AppBar position="relative" className={styles.appBar}>
        <Toolbar>
          <AutoComplete
            options={options}
            onChange={action('onChange')}
            label="Box Single"
            variant="box"
          />
        </Toolbar>
      </AppBar>

      <AppBar position="relative" className={styles.appBar}>
        <Toolbar>
          <AutoComplete
            options={options}
            onChange={action('onChange')}
            label="Box Multiple"
            variant="box"
            isMulti
          />
        </Toolbar>
      </AppBar>
    </div>
  ));
