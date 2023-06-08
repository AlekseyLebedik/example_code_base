import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import { range } from 'lodash';

const LINE_HEIGHT = 32;
const MARGIN = 4;
const PROJECTS_NO = 5;
const PLATFORMS_NO = 3;
const PROJECT_WIDTH = 170;
const PLATFORM_WIDTH = 58;
const MISSING_PLATFORMS = {
  1: [2],
  2: [0],
  3: [1],
};

const width = MARGIN + PROJECT_WIDTH + (PLATFORM_WIDTH + MARGIN) * PLATFORMS_NO;
const height = LINE_HEIGHT + (LINE_HEIGHT + MARGIN) * PROJECTS_NO;

const PlatformHeader = ({ platformId }) => (
  <rect
    x={
      MARGIN +
      PROJECT_WIDTH +
      MARGIN +
      (PLATFORM_WIDTH + MARGIN) * platformId +
      10
    }
    y={10}
    rx={0}
    ry={0}
    width={40}
    height={16}
  />
);

PlatformHeader.propTypes = {
  platformId: PropTypes.number.isRequired,
};

const Project = ({ projectId }) => (
  <rect
    x={MARGIN}
    y={LINE_HEIGHT + projectId * (LINE_HEIGHT + MARGIN)}
    rx={0}
    ry={0}
    width={PROJECT_WIDTH}
    height={LINE_HEIGHT}
  />
);

Project.propTypes = {
  projectId: PropTypes.number.isRequired,
};

const Platform = ({ projectId, platformId }) =>
  MISSING_PLATFORMS[projectId] &&
  MISSING_PLATFORMS[projectId].includes(platformId) ? null : (
    <rect
      x={
        MARGIN + PROJECT_WIDTH + MARGIN + (PLATFORM_WIDTH + MARGIN) * platformId
      }
      y={LINE_HEIGHT + projectId * (LINE_HEIGHT + MARGIN)}
      rx={0}
      ry={0}
      width={PLATFORM_WIDTH}
      height={LINE_HEIGHT}
    />
  );

Platform.propTypes = {
  projectId: PropTypes.number.isRequired,
  platformId: PropTypes.number.isRequired,
};

const PlatformsTableLoader = props => (
  <div style={{ width, height }}>
    <ContentLoader
      height={height}
      width={width}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      {...props}
    >
      <Fragment key="headers">
        {range(PLATFORMS_NO).map(idx => (
          <PlatformHeader key={idx} platformId={idx} />
        ))}
      </Fragment>
      {range(PROJECTS_NO).map(projectId => (
        <Fragment key={projectId}>
          <Project projectId={projectId} />
          {range(PLATFORMS_NO).map(platformId => (
            <Platform
              key={platformId}
              projectId={projectId}
              platformId={platformId}
            />
          ))}
        </Fragment>
      ))}
    </ContentLoader>
  </div>
);
export default PlatformsTableLoader;
