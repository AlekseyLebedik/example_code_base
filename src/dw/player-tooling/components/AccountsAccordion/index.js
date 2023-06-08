import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import OpenAllBtn from 'dw/player-tooling/components/OpenAllBtn';

const useStyles = makeStyles(theme => ({
  accordion: {
    width: '100%',
    maxHeight: '99%',
    backgroundColor: 'initial',
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
  accordionSummary: {
    margin: '0 !important',
    padding: '0 10px 5px !important',
    minHeight: '18px',
  },
  accordionSummaryexpanded: {
    minHeight: '18px !important',
  },
  accordionContent: {
    margin: '0px 0 !important',
    padding: '0 !important',
  },
  expandIcon: {
    margin: '0 !important',
    padding: '0 !important',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    color: 'rgba(0,0,0,.6)',
  },
  subHeading: {
    fontSize: '.75rem',
    fontWeight: 'bold',
    margin: 'auto 5%',
  },
  detailsRoot: {
    padding: '4px 15px',
  },
  details: {
    width: '100%',
    opacity: 0.6,
  },
  collapseContainer: {
    maxHeight: 525,
    marginRight: -5,
    marginBottom: 8,
    overflow: 'hidden',
    overflowY: 'auto',
    overscrollBehaviorY: 'auto',
  },
}));

const useChildStyles = makeStyles(theme => ({
  accordionSummary: {
    margin: '0 !important',
    padding: '0 !important',
    minHeight: '18px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'normal',
    textTransform: 'capitalize',
    width: '80px',
  },
  subHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'normal',
    margin: 0,
  },
  detailsRoot: {
    padding: '0 5px',
  },
  details: {
    opacity: 1,
  },
  collapseContainer: {
    overflowY: 'hidden',
    marginBottom: 0,
  },
}));

export const mergeStyles = (...styles) => {
  const styleObj = {};
  styles.forEach(style => {
    Object.entries(style).forEach(([key, value]) => {
      if (styleObj[key]) styleObj[key] += ` ${value}`;
      else styleObj[key] = value;
    });
  });
  return styleObj;
};

export const AccountsAccordionContent = ({
  details,
  expanded,
  expandAll,
  setExpanded,
  styles,
  subHeading,
  title,
  toggleExpandAll,
}) => {
  const { DetailsComponent, detailsProps } = details;
  const { SubHeadingComponent, subHeadingProps } = subHeading;
  return (
    <Accordion
      className={styles.accordion}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      TransitionProps={{ classes: { container: styles.collapseContainer } }}
    >
      <AccordionSummary
        expandIcon={<Icon>expand_more</Icon>}
        classes={{
          root: styles.accordionSummary,
          expanded: styles.accordionSummaryexpanded,
          content: styles.accordionContent,
          expandIcon: styles.expandIcon,
        }}
      >
        <Typography className={styles.heading}>{title}</Typography>
        {subHeading && (
          <Typography className={styles.subHeading}>
            {SubHeadingComponent === 'OpenAllBtn' ? (
              <OpenAllBtn expandAll={expandAll} onClick={toggleExpandAll} />
            ) : (
              <SubHeadingComponent {...subHeadingProps} expandAll={expandAll} />
            )}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails className={styles.detailsRoot}>
        <Typography variant="caption" className={styles.details}>
          <DetailsComponent expandAll={expandAll} {...detailsProps} />
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

AccountsAccordionContent.propTypes = {
  details: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.string,
  ]),
  expanded: PropTypes.bool,
  expandAll: PropTypes.bool,
  subHeading: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.string,
  ]),
  setExpanded: PropTypes.func,
  styles: PropTypes.object,
  toggleExpandAll: PropTypes.func,
  title: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

AccountsAccordionContent.defaultProps = {
  details: 'N/A',
  expanded: false,
  expandAll: false,
  setExpanded: null,
  styles: {},
  toggleExpandAll: null,
  subHeading: '',
};

export const AccountsAccordionChild = ({ classes, expandAll, ...props }) => {
  const defaultStyles = useStyles();
  const childStyles = useChildStyles();
  const [expanded, setExpanded] = useState(expandAll);
  const styles = mergeStyles(defaultStyles, childStyles, classes);
  return (
    <AccountsAccordionContent
      {...props}
      expanded={expanded}
      expandAll={expandAll}
      setExpanded={setExpanded}
      styles={styles}
    />
  );
};

AccountsAccordionChild.propTypes = {
  classes: PropTypes.object,
  expandAll: PropTypes.bool,
};

AccountsAccordionChild.defaultProps = {
  classes: {},
  expandAll: false,
};

const AccountsAccordion = ({ classes, defaultExpanded, ...props }) => {
  const [expandAll, toggleExpandAll] = useState(true);
  const defaultStyles = useStyles();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const styles = mergeStyles(defaultStyles, classes);
  return (
    <AccountsAccordionContent
      {...props}
      expanded={expanded}
      expandAll={expandAll}
      setExpanded={setExpanded}
      styles={styles}
      toggleExpandAll={toggleExpandAll}
    />
  );
};

AccountsAccordion.propTypes = {
  classes: PropTypes.object,
  defaultExpanded: PropTypes.bool,
};

AccountsAccordion.defaultProps = {
  classes: {},
  defaultExpanded: false,
};

export default AccountsAccordion;
