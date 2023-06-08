import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import IconMenu from 'dw/core/components/IconMenu';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';

const ExportMenuItem = ({ type, onClose, onExport }) => (
  <MenuItem
    key={type}
    onClick={() => {
      onClose();
      onExport(type);
    }}
  >
    {type.toUpperCase()}
  </MenuItem>
);

ExportMenuItem.propTypes = {
  onClose: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

const Export = ({ onExport }) => (
  <FeatureSwitchesCheck
    featureSwitches={[fs.EXPORT_SERVER_LOGS]}
    isStaffAllowed={false}
  >
    <IconMenu icon="file_download" tooltip="Export Server Logs">
      {onClose => [
        ['xlsx', 'csv', 'json'].map(format => (
          <ExportMenuItem type={format} onClose={onClose} onExport={onExport} />
        )),
      ]}
    </IconMenu>
  </FeatureSwitchesCheck>
);

Export.propTypes = {
  onExport: PropTypes.func.isRequired,
};

export default Export;
