import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const EndNowConfirmation = ({
  classes,
  needsConfirmations,
  setNeedsConfirmations,
}) => (
  <FormControlLabel
    checked={!needsConfirmations.endNowCheck}
    className={classes.confirmProceed}
    control={
      <Checkbox
        className={classes.confirmProceedCheckbox}
        color="default"
        onChange={() =>
          setNeedsConfirmations({
            ...needsConfirmations,
            endNowCheck: !needsConfirmations.endNowCheck,
          })
        }
      />
    }
    label="Override defined end date"
  />
);

EndNowConfirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  needsConfirmations: PropTypes.object.isRequired,
  setNeedsConfirmations: PropTypes.func.isRequired,
};

export default EndNowConfirmation;
