import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link as DomLink } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import { chunk, range } from 'lodash';
import withWidth from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import AdapterLink from 'dw/core/components/AdapterLink';
import { PlatformIcon } from 'dw/core/components/Icons';
import { uuid } from 'dw/core/helpers/uuid';
import Container from 'dw/reporting/components/ContainerWithBackground';
import { getProjectName } from 'dw/reporting/selectors';
import { matchPlatform } from 'dw/reporting/constants';
import { joinPath } from 'dw/core/helpers/path';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import PlatformsTableLoading from './components/PlatformsTableLoading';
import {
  platformsSelector,
  getProjectPlatformsSelector,
} from '../../selectors';

import styles from './index.module.css';

const MIN_PLATFORM_WIDTH = 50;
const MAX_PLATFORM_WIDTH = 100;
const MIN_PROJECT_WIDTH = 150;

const calculatePlatformColumns = availableWidth =>
  Math.floor((availableWidth - MIN_PROJECT_WIDTH) / MIN_PLATFORM_WIDTH);

const PLATFORMS_MAP = {
  XBOX360: 'X360',
  'Xbox One': 'XB1',
  'PC-Steam': 'PC',
  'PC-BNet': 'PC',
};

const PlatformsHeader = ({ platforms, availableWidth }) => (
  <div className="flex flex-row justify-end">
    <div>{'\u00A0'}</div>
    {platforms.map((platform, idx) => (
      <div
        key={platform || idx}
        className={styles.platformHeader}
        style={{ width: availableWidth }}
      >
        {PLATFORMS_MAP[platform] || platform || '\u00A0'}
      </div>
    ))}
  </div>
);

PlatformsHeader.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableWidth: PropTypes.number.isRequired,
};

const ProjectLink = ({
  project,
  franchise,
  baseUrl,
  availableWidth,
  mobile,
}) => {
  const getLink = () => joinPath(baseUrl, 'projects', project.id);
  const projectName = getProjectName(franchise.name, project.name);
  return (
    <Container className={styles.project} style={{ width: availableWidth }}>
      {mobile ? (
        <DomLink to={getLink()}>{projectName}</DomLink>
      ) : (
        <>
          <Tooltip title="All platforms report" placement="bottom-end">
            <IconButton
              component={AdapterLink}
              to={getLink()}
              className={classNames(styles.button, 'hoverable')}
            >
              <Icon>assessment</Icon>
            </IconButton>
          </Tooltip>
          {projectName}
        </>
      )}
    </Container>
  );
};

ProjectLink.propTypes = {
  franchise: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  availableWidth: PropTypes.number.isRequired,
  mobile: PropTypes.bool.isRequired,
};

const PlatformLink = ({
  project,
  platform,
  origPlatform,
  baseUrl,
  availableWidth,
  mobile,
}) => {
  const style = { width: availableWidth };
  if (!platform)
    return (
      <div
        key={origPlatform || uuid()}
        className={styles.platformEmpty}
        style={style}
      />
    );
  return (
    <Container
      key={platform}
      className={`${styles.platform} ${
        styles[`platform-${platform.toLowerCase()}`]
      }`}
      style={style}
    >
      <Tooltip title={platform} placement="bottom-end">
        <Button
          component={AdapterLink}
          to={joinPath(baseUrl, 'projects', project.id, escape(platform))}
          className={styles.button}
        >
          <PlatformIcon
            platform={platform}
            className={styles.icon}
            size={mobile ? 18 : 20}
          />
        </Button>
      </Tooltip>
    </Container>
  );
};

PlatformLink.propTypes = {
  project: PropTypes.object.isRequired,
  platform: PropTypes.string,
  origPlatform: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
  availableWidth: PropTypes.number.isRequired,
  mobile: PropTypes.bool.isRequired,
};

PlatformLink.defaultProps = {
  platform: null,
  origPlatform: null,
};

const stateToProps = (state, props) => {
  const use3Columns = hasFeaturesEnabledFuncSelector(state)(
    fs.REPORTING_PLATFORMS_USE_3_COLUMNS,
    false
  );
  return {
    platforms: platformsSelector(state, props),
    getProjectPlatforms: getProjectPlatformsSelector(state, props),
    calculatePlatformColumns: use3Columns ? () => 3 : calculatePlatformColumns,
    use3Columns,
  };
};

const PlatformsTable = ({ franchise, availableWidth, width, ...props }) => {
  if (!franchise) {
    return <PlatformsTableLoading className={styles.container} />;
  }

  const PLATFORM_COLUMNS = Math.min(
    availableWidth ? props.calculatePlatformColumns(availableWidth) : 8,
    props.platforms.length
  );

  const PLATFORM_WIDTH =
    Math.min(
      Math.floor((availableWidth - MIN_PROJECT_WIDTH) / PLATFORM_COLUMNS),
      MAX_PLATFORM_WIDTH
    ) - 6;

  const PROJECT_WIDTH =
    availableWidth - PLATFORM_COLUMNS * (PLATFORM_WIDTH + 6);

  const normalizedPlatforms = [...props.platforms];
  if (props.platforms.length % PLATFORM_COLUMNS > 0) {
    range(
      PLATFORM_COLUMNS - (props.platforms.length % PLATFORM_COLUMNS)
    ).forEach(() => {
      normalizedPlatforms.push(null);
    });
  }

  return (
    <div className={styles.container}>
      {chunk(normalizedPlatforms, PLATFORM_COLUMNS).map(platforms => (
        <div key={platforms.join('-')} className={styles.platformsPart}>
          <PlatformsHeader
            platforms={platforms}
            availableWidth={PLATFORM_WIDTH}
          />
          {franchise.projects.map(project => {
            const projectPlatforms =
              props.getProjectPlatforms(project.id) || [];
            const matchedPlatforms = platforms.map(platform =>
              matchPlatform(platform, projectPlatforms)
            );
            if (!matchedPlatforms.some(p => p)) return null;
            return (
              <div
                key={project.id}
                className={`${styles.row} flex flex-row justify-end`}
              >
                <ProjectLink
                  {...props}
                  franchise={franchise}
                  project={project}
                  availableWidth={PROJECT_WIDTH}
                  mobile={width === 'xs'}
                />
                {matchedPlatforms.map((platform, idx) => (
                  <PlatformLink
                    key={platforms[idx] || uuid()}
                    project={project}
                    platform={platform}
                    origPlatform={platforms[idx]}
                    baseUrl={props.baseUrl}
                    availableWidth={PLATFORM_WIDTH}
                    mobile={width === 'xs'}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

PlatformsTable.propTypes = {
  franchise: PropTypes.object,
  getProjectPlatforms: PropTypes.func.isRequired,
  platforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  baseUrl: PropTypes.string.isRequired,
  availableWidth: PropTypes.number.isRequired,
  calculatePlatformColumns: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

PlatformsTable.defaultProps = {
  franchise: null,
};

function HigherOrderComponent(props) {
  return <PlatformsTable {...props} />;
}

export const PlatformsTableConnected =
  connect(stateToProps)(HigherOrderComponent);
export default withWidth()(PlatformsTableConnected);
