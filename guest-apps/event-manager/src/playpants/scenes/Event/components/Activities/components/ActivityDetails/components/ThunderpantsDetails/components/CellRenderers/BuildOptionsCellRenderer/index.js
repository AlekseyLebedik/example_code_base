import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'dw/core/components/IconButton';

const BuildOptionsCellRendererComponent = ({
  buildData,
  buildList,
  data,
  disabled,
  handleConfirmAction,
  handleModify,
  handleModifyLock,
  unlockedDeployments,
  userParamsSchema,
}) => {
  const { lock, type } = data;
  const BUTTON_MAP = {
    modify: (
      <IconButton
        disabled={disabled}
        key={`${data.uid}-modify`}
        onClick={() =>
          handleModify({
            buildList,
            data,
            unlockedDeployments,
            userParamsSchema,
          })
        }
        tooltip="Edit"
        icon="build"
        size="small"
      />
    ),
    modifyLock: (
      <IconButton
        disabled={disabled}
        key={`${data.uid}-modifyLock`}
        onClick={() => handleModifyLock(data, lock ? 'unsetLock' : 'setLock')}
        tooltip={lock ? 'Unset Lock' : 'Set Lock'}
        icon={lock ? 'lock_open' : 'lock'}
        size="small"
      />
    ),
    undeploy: (
      <IconButton
        disabled={disabled}
        key={`${data.uid}-undeploy`}
        onClick={() =>
          handleConfirmAction({
            data: {
              ...data,
              build: buildData,
              message:
                'Are you sure you would like to undeploy this live build?',
            },
            actionType: 'undeploy',
            unlockedDeployments,
          })
        }
        tooltip="Undeploy"
        icon="work_off"
        size="small"
      />
    ),
    clear: (
      <IconButton
        disabled={disabled}
        key={`${data.uid}-clear`}
        onClick={() =>
          handleConfirmAction({
            data: {
              ...data,
              build: buildData,
              message:
                'Are you sure that you would like to clear this scheduled build deployment from this activity?',
            },
            actionType: 'clear',
            unlockedDeployments,
          })
        }
        tooltip="Clear"
        icon="clear"
        size="small"
      />
    ),
  };

  const OPTIONS_MAP = {
    live: [BUTTON_MAP.modify, BUTTON_MAP.undeploy, BUTTON_MAP.modifyLock],
    deploy: [BUTTON_MAP.modify, BUTTON_MAP.modifyLock, BUTTON_MAP.clear],
    undeploy: [BUTTON_MAP.modifyLock, BUTTON_MAP.clear],
    modify: [BUTTON_MAP.modify, BUTTON_MAP.modifyLock, BUTTON_MAP.clear],
  };

  return <>{OPTIONS_MAP[type].map(button => button)}</>;
};

export default BuildOptionsCellRendererComponent;

BuildOptionsCellRendererComponent.propTypes = {
  buildData: PropTypes.object.isRequired,
  buildList: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleConfirmAction: PropTypes.func.isRequired,
  handleModify: PropTypes.func.isRequired,
  handleModifyLock: PropTypes.func.isRequired,
  unlockedDeployments: PropTypes.object.isRequired,
  userParamsSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
};
