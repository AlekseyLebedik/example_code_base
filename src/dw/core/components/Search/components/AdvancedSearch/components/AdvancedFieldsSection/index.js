import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import styles from './index.module.css';
import FieldRow from './components/FieldRow';

const AdvancedSearchButtons = ({ onSearch }) => (
  <div className={styles.footerRow}>
    <Button id="clear" onClick={() => onSearch({})}>
      Clear
    </Button>
    <Button
      className="filter-button"
      color="primary"
      onClick={() => onSearch()}
    >
      Filter
    </Button>
  </div>
);

AdvancedSearchButtons.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

const CloseAdvancedSearchButton = ({ close }) => (
  <Tooltip title="Close Advanced Search" placement="bottom">
    <IconButton className={styles.closeAdvanced} onClick={close}>
      <Icon fontSize="small">clear</Icon>
    </IconButton>
  </Tooltip>
);

CloseAdvancedSearchButton.propTypes = {
  close: PropTypes.func.isRequired,
};

const AdvancedFieldsSection = React.forwardRef(
  (
    {
      isOpen,
      searchComponent,
      close,
      fields,
      onSearch,
      values,
      onChange,
      timezone,
      removeField,
      addMoreFields,
    },
    ref
  ) => (
    <Popper
      ref={ref}
      open={isOpen}
      anchorEl={searchComponent}
      placement="bottom-start"
      className={styles.popper}
    >
      <Paper
        square
        style={{
          marginTop: 8,
          width: searchComponent ? searchComponent.clientWidth : null,
        }}
        className={styles.container}
      >
        <CloseAdvancedSearchButton close={close} />
        <div className={styles.fields}>
          {fields
            .map((f, index) => ({ ...f, position: index }))
            .map(f => (
              <FieldRow
                field={f}
                values={values}
                onChange={onChange}
                timezone={timezone}
                key={f.key}
                addMoreFields={addMoreFields}
                removeField={removeField}
              />
            ))}
        </div>
        <AdvancedSearchButtons onSearch={onSearch} />
      </Paper>
    </Popper>
  )
);

AdvancedFieldsSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  searchComponent: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  addMoreFields: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
};

export default AdvancedFieldsSection;
