import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { useEnvScopeUri, useScopes } from '../../graphql/hooks';
import CreateScopeButton from '../CreateScopeButton';
import GameBuildSelector from '../GameBuildSelector';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: ({ scene }) => (scene === 'groups' ? theme.spacing(2) : 0),
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breadcrumb: {
    display: 'flex',
  },
  separator: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  buildSelectRoot: {
    marginBottom: 0,
    marginTop: '1px',
  },
  buildSelect: {
    padding: 0,
    paddingLeft: '3px',
    minWidth: '150px',
    ...theme.typography.subtitle2,
  },
  disabledBreadcrumb: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  active: {
    fontWeight: '600',
  },
}));

const GVSBreadcrumbs = React.forwardRef(
  ({ scopeOverride, hideGameBuild, variant }, ref) => {
    const { scopeURI: initialScopeURI, titleId, env, ...params } = useParams();
    const classes = useStyles(params);
    const titleName = useSelector(
      state => state.Components.TitleSelector.currentTitle?.name
    );
    const projectName = useSelector(
      state => state.Components.TitleSelector.currentProject?.name
    );
    const scopeURI = useMemo(
      () => scopeOverride || initialScopeURI,
      [scopeOverride, initialScopeURI]
    );
    const location = useLocation();
    const history = useHistory();
    const { refetch } = useScopes();
    const { envScopeUri } = useEnvScopeUri();
    const [franchise, game] = useMemo(
      () => (envScopeUri ? envScopeUri.split(':') : []),
      [envScopeUri]
    );
    const onScopeChange = useCallback(
      newScopeUri => {
        history.push({
          pathname: location.pathname.replace(scopeURI, newScopeUri),
          search: location.search,
        });
      },
      [history, location]
    );
    return (
      <div className={classes.container} ref={ref}>
        <div className={classes.breadcrumb}>
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            classes={{ separator: classes.separator }}
          >
            {variant === 'full' && [
              <Typography
                key="env"
                variant="subtitle2"
                className={classes.disabledBreadcrumb}
              >
                {env.toUpperCase()}
              </Typography>,
              <Typography
                key="franchise"
                variant="subtitle2"
                className={cn({
                  [classes.disabledBreadcrumb]: scopeURI !== franchise,
                  [classes.active]: scopeURI === franchise,
                })}
              >
                {franchise.toUpperCase()}
              </Typography>,
              <Typography
                key="game"
                variant="subtitle2"
                className={cn({
                  [classes.disabledBreadcrumb]:
                    scopeURI !== [franchise, game].join(':'),
                  [classes.active]: scopeURI === [franchise, game].join(':'),
                })}
              >
                {projectName || game.toUpperCase()}
              </Typography>,
            ]}
            <Typography
              key="title"
              variant="subtitle2"
              color="textPrimary"
              className={cn({
                [classes.disabledBreadcrumb]: scopeURI !== envScopeUri,
                [classes.active]: scopeURI === envScopeUri,
              })}
            >
              ({titleId}) - {titleName}
            </Typography>
            {!hideGameBuild && (
              <GameBuildSelector
                scopeURI={scopeURI}
                scopeRoot={envScopeUri}
                onScopeChange={onScopeChange}
                disabled={scopeURI === envScopeUri}
              />
            )}
          </Breadcrumbs>
          <CreateScopeButton
            refetchScopes={refetch}
            onScopeChange={onScopeChange}
          />
        </div>
      </div>
    );
  }
);
GVSBreadcrumbs.propTypes = {
  scopeOverride: PropTypes.string,
  hideGameBuild: PropTypes.bool,
  variant: PropTypes.string,
};
GVSBreadcrumbs.defaultProps = {
  scopeOverride: undefined,
  hideGameBuild: false,
  variant: 'full',
};

export default GVSBreadcrumbs;
