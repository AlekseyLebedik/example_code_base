import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const PublishNowConfirmation = ({
  classes,
  needsConfirmations,
  setNeedsConfirmations,
}) => (
  <FormControlLabel
    checked={!needsConfirmations.publishNowCheck}
    className={classes.confirmProceed}
    control={
      <Checkbox
        className={classes.confirmProceedCheckbox}
        color="default"
        onChange={() =>
          setNeedsConfirmations({
            ...needsConfirmations,
            publishNowCheck: !needsConfirmations.publishNowCheck,
          })
        }
      />
    }
    label="Override defined publish date"
  />
);

PublishNowConfirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  needsConfirmations: PropTypes.object.isRequired,
  setNeedsConfirmations: PropTypes.func.isRequired,
};

export default PublishNowConfirmation;
