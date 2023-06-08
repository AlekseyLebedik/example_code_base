import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import styles from './index.module.css';
import DeleteButton from './deleteButton';

const GamerTagCellRenderer = params => {
  const { addGamerTags, toolTipClass } = params;
  const [inputValue, setInputValue] = useState([]);
  const isAddButtonDisabled = inputValue.length <= 0;

  return (
    <div className={styles.loginQueueInputBoxContainer}>
      <input
        type="text"
        value={inputValue}
        className={styles.loginQueueInputBox}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter new GamerTag/s here (comma separate) and click the add to list icon on the right"
      />
      <Tooltip
        title={
          isAddButtonDisabled
            ? 'Enter a GamerTag Name to activate button'
            : 'Add GamerTag'
        }
        placement="left"
        classes={{ tooltip: toolTipClass }}
      >
        <span>
          <IconButton
            onClick={() => {
              addGamerTags(inputValue);
              setInputValue(''); // clear input value after add
            }}
            disabled={isAddButtonDisabled}
            style={isAddButtonDisabled ? { pointerEvents: 'none' } : {}}
            id="add_gamertag_lq"
          >
            <Icon
              style={{
                color: isAddButtonDisabled ? 'rgba(0, 0, 0, 0.26)' : '#009688',
              }}
            >
              playlist_add
            </Icon>
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

const DeleteCellRenderer = params => {
  const { deleteGamerTag, toolTipClass } = params.colDef.cellRendererParams;
  if (params.node.rowPinned) return null;
  return (
    <DeleteButton
      onClick={deleteGamerTag}
      title="Remove"
      toolTipClass={toolTipClass}
    />
  );
};

export { GamerTagCellRenderer, DeleteCellRenderer };
