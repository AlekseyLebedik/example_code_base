import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';

import { joinPath } from 'dw/core/helpers/path';
import Loading from 'dw/core/components/Loading';

import {
  SelectionPanelList,
  SelectionPanelItem,
  SelectionPanelItemCounts,
} from './components/SelectionPanelList';
import DetailPanel from './components/DetailPanel';
import styles from './presentational.module.css';

const ServerInventory = props => {
  const {
    serversAllocationLoading,
    disableServerList,
    contexts,
    selectedContext,
    dataCenters,
    selectedDataCenter,
    buildNames,
    selectedBuildName,
    baseUrl,
  } = props;

  if (serversAllocationLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={classNames(styles.panel, styles.contextPanel)}>
        <div className={classNames(styles.headers)}>
          <div className={styles.contextTitle}>Context</div>
        </div>
        <Divider className={styles.headerDivider} variant="middle" />
        <SelectionPanelList
          data={contexts.map(x => ({ name: x }))}
          selectedItem={selectedContext}
          url={baseUrl}
          listItemClasses={{ root: styles.contextListItem }}
          ItemComponent={SelectionPanelItem}
        />
      </div>
      <div className={classNames(styles.panel, styles.buildNamePanel)}>
        <div className={classNames(styles.itemContainer, styles.headers)}>
          <div className={styles.title}>BuildNames</div>
          <div className={styles.countColumn}>Idle</div>
          <div className={styles.countColumn}>Allo</div>
        </div>
        <Divider className={styles.headerDivider} variant="middle" />
        <SelectionPanelList
          data={buildNames}
          url={joinPath(baseUrl, selectedContext)}
          selectedItem={selectedBuildName}
          emptyText="Select a Context"
          listItemClasses={{ root: styles.buildListItem }}
          ItemComponent={SelectionPanelItemCounts}
        />
      </div>
      <div className={classNames(styles.panel, styles.DCPanel)}>
        <div className={classNames(styles.itemContainer, styles.headers)}>
          <div className={styles.title}>DC</div>
          <div className={styles.countColumn}>Idle</div>
          <div className={styles.countColumn}>Allo</div>
        </div>
        <Divider className={styles.headerDivider} variant="middle" />
        <SelectionPanelList
          data={dataCenters}
          selectedItem={selectedDataCenter}
          url={joinPath(baseUrl, selectedContext, selectedBuildName)}
          emptyText="Select a Build Name"
          listItemClasses={{ root: styles.dcListItem }}
          ItemComponent={SelectionPanelItemCounts}
        />
      </div>
      <div className={classNames(styles.panel, styles.detailListPanel)}>
        <DetailPanel
          disableList={disableServerList}
          context={selectedContext}
          emptyText="Select a DC"
          buildname={selectedBuildName}
          datacenter={selectedDataCenter}
        />
      </div>
    </div>
  );
};

ServerInventory.propTypes = {
  serversAllocationLoading: PropTypes.bool.isRequired,
  disableServerList: PropTypes.bool,
  contexts: PropTypes.array,
  dataCenters: PropTypes.array,
  buildNames: PropTypes.array,
  selectedContext: PropTypes.string,
  selectedDataCenter: PropTypes.string,
  selectedBuildName: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
};

ServerInventory.defaultProps = {
  disableServerList: false,
  contexts: [],
  dataCenters: [],
  buildNames: [],
  selectedContext: null,
  selectedDataCenter: null,
  selectedBuildName: null,
};

export default ServerInventory;
