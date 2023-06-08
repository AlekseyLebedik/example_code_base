import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import keyPressAction from 'playpants/helpers/keyPressAction';

import { LANGUAGES } from '../../constants';

import styles from './index.module.css';

const StatelessItem = props => {
  const {
    language,
    languageInput,
    text,
    isEditable,
    languageValidation,
    error,
    onLanguageChange,
    onTextChange,
    onToggle,
    handleSubmit,
    handleRemove,
    disabled,
  } = props;

  const title =
    language && !isEditable ? (
      LANGUAGES[language].name
    ) : (
      <FormControl error={error}>
        <InputLabel>Language</InputLabel>
        <Select
          value={languageInput || language}
          className={styles.select}
          onChange={onLanguageChange}
        >
          {Object.entries(LANGUAGES).map(([motdLanguage, languageInfo]) => (
            <MenuItem value={motdLanguage} key={motdLanguage}>
              {languageInfo.name}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{languageValidation}</FormHelperText>}
      </FormControl>
    );

  const btnGroup = isEditable ? (
    <>
      <Fab color="primary" mini onClick={handleSubmit}>
        {language ? <Icon>done</Icon> : <Icon>backup</Icon>}
      </Fab>
      <Fab mini onClick={onToggle}>
        <Icon>clear</Icon>
      </Fab>
    </>
  ) : (
    <>
      <Fab color="primary" mini onClick={onToggle} disabled={disabled}>
        <Icon>edit</Icon>
      </Fab>
      <Fab color="secondary" mini onClick={handleRemove} disabled={disabled}>
        <Icon>delete</Icon>
      </Fab>
    </>
  );

  return (
    <>
      {language || isEditable ? (
        <Card classes={{ root: styles.card }}>
          <CardHeader
            classes={{ title: styles.cardTitle }}
            title={title}
            action={btnGroup}
          />
          <Divider />
          <CardContent>
            {!isEditable ? (
              text
            ) : (
              <TextField
                fullWidth
                label="Message of the Day"
                defaultValue={text}
                onChange={onTextChange}
                onKeyDown={e => keyPressAction(e, handleSubmit, onToggle)}
              />
            )}
          </CardContent>
        </Card>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={styles.newButton}
          onClick={onToggle}
          disabled={disabled}
        >
          <Icon>add</Icon> New Language
        </Button>
      )}
    </>
  );
};

StatelessItem.propTypes = {
  language: PropTypes.string.isRequired,
  languageInput: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  languageValidation: PropTypes.string,
  onLanguageChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

StatelessItem.defaultProps = {
  error: null,
  languageValidation: '',
};

export default StatelessItem;
