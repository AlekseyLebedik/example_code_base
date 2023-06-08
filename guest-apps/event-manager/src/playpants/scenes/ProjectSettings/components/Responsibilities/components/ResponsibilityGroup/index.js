import React from 'react';
import PropTypes from 'prop-types';

import PermissionSelect from 'dw/core/components/FormFields/PermissionSelect';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import styles from './index.module.css';

const SourceResponsibilityChip = ({ index, envType, ...props }) => (
  <div key={`${envType.id}.${index}`}>
    <Chip {...props} />
  </div>
);

SourceResponsibilityChip.propTypes = {
  envType: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ResponsibilityGroup = ({ envType, selection, index }) => (
  <Paper className={styles.container}>
    <label className={styles.titleContent}>{envType.type}</label>
    <>
      <PermissionSelect
        options={envType.responsibilities}
        name={`${selection}.responsibilities`}
        placeholder="Please select Responsibilities"
        label="Responsibilities"
        ItemComponent={SourceResponsibilityChip}
        itemProps={{
          envType,
          index,
        }}
        fullWidth
        multiple
      />
    </>
  </Paper>
);

ResponsibilityGroup.propTypes = {
  envType: PropTypes.object.isRequired,
  selection: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default ResponsibilityGroup;
