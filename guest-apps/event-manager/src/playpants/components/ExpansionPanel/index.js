import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Icon from '@material-ui/core/Icon';

import styles from './index.module.css';

const ExpansionPanelBase = ({
  classes,
  dataCy,
  defaultExpanded,
  details,
  expanded,
  handleSelection,
  id,
  secondary,
  title,
}) => {
  const onChange = value => handleSelection(value !== expanded ? value : '');

  return (
    <Accordion
      {...(expanded
        ? { expanded: id ? expanded === id : expanded === title }
        : {})}
      data-cy={dataCy}
      defaultExpanded={defaultExpanded}
      onChange={() => onChange(id || title)}
      classes={{ root: styles.expansionPanel }}
    >
      <AccordionSummary
        expandIcon={details && <Icon>expand_more</Icon>}
        classes={{
          root: classNames(styles.expansionLabel, classes.title),
        }}
      >
        <div className={classNames(styles.primaryHeading, classes.primary)}>
          {title}
        </div>
        <div className={classNames(styles.secondaryHeading, classes.secondary)}>
          {secondary}
        </div>
      </AccordionSummary>
      {details && (
        <AccordionDetails
          classes={{
            root: classes.details,
          }}
        >
          {details}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

ExpansionPanelBase.propTypes = {
  classes: PropTypes.object,
  dataCy: PropTypes.string,
  defaultExpanded: PropTypes.bool,
  details: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  expanded: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  handleSelection: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secondary: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

ExpansionPanelBase.defaultProps = {
  classes: {},
  dataCy: null,
  defaultExpanded: true,
  details: null,
  expanded: null,
  handleSelection: () => {},
  id: null,
  secondary: null,
};

export default ExpansionPanelBase;
