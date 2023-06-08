import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

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
    overscrollBehaviorY: 'contain',
  },
}));

const BansAccordion = props => {
  const styles = useStyles();
  return (
    <Accordion className={styles.accordion} defaultExpanded>
      <AccordionSummary
        classes={{
          root: styles.accordionSummary,
          expanded: styles.accordionSummaryexpanded,
          content: styles.accordionContent,
          expandIcon: styles.expandIcon,
        }}
        expandIcon={<Icon>expand_more</Icon>}
      >
        <Typography className={styles.heading}>
          Cross Platform Ban Status
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.detailsRoot}>
        <Typography variant="caption" className={styles.details}>
          {props.children}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
BansAccordion.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BansAccordion;
