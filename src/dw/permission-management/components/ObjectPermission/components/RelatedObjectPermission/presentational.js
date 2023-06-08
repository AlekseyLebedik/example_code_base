import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy';
import { withStyles } from '@material-ui/core/styles';
import EntityIcon from 'dw/core/components/EntityIcon';
import Chip from '@material-ui/core/Chip';

import styles from './presentational.module.css';

const RelatedObjectPermissionStateless = ({
  relatedPermissions,
  classes,
  isAdminOrStaff,
  hasEditMembershipsPermission,
}) => (
  <div>
    {console.log(relatedPermissions)}
    {Object.keys(relatedPermissions).map(contentTypeName => (
      <div key={contentTypeName}>
        <p className={styles.contentTypeName}>
          <strong>{contentTypeName.toUpperCase()}</strong>
        </p>
        {Object.keys(relatedPermissions[contentTypeName]).map(
          objectDisplayName => (
            <div key={objectDisplayName} className={styles.chipContainer}>
              <p>
                <strong>{objectDisplayName.toUpperCase()}</strong>
              </p>
              <div className={styles.chipLayout}>
                {uniqBy(
                  relatedPermissions[contentTypeName][objectDisplayName],
                  item => item.name
                ).map(item => {
                  if (isAdminOrStaff || hasEditMembershipsPermission) {
                    return (
                      <Link
                        to={`/permission-management/${item.type}/${item.id}`}
                        target="_blank"
                        key={`${item.type} - ${item.id}`}
                      >
                        <Chip
                          className={classes.chip}
                          style={{ cursor: 'pointer' }}
                          label={item.name}
                          icon={<EntityIcon type={item.type} />}
                        />
                      </Link>
                    );
                  }
                  return (
                    <Chip
                      className={classes.chip}
                      key={`${item.type} - ${item.id}`}
                      label={item.name}
                      icon={<EntityIcon type={item.type} />}
                    />
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    ))}
  </div>
);

const stylesRef = theme => ({
  chip: {
    minWidth: 'inherit',
    boxShadow: '0px 2px 2px rgba(0,0,0,0.3)',
    marginRight: theme.spacing(),
    marginBottom: theme.spacing(),
    paddingLeft: theme.spacing(),
    height: 32,
    borderRadius: 4,
  },
});

RelatedObjectPermissionStateless.propTypes = {
  relatedPermissions: PropTypes.object,
  classes: PropTypes.object,
  isAdminOrStaff: PropTypes.bool,
  hasEditMembershipsPermission: PropTypes.bool,
};

RelatedObjectPermissionStateless.defaultProps = {
  relatedPermissions: {},
  classes: {},
  isAdminOrStaff: false,
  hasEditMembershipsPermission: false,
};

export default withStyles(stylesRef)(RelatedObjectPermissionStateless);
