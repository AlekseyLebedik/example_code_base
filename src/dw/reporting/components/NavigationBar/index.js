import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { range } from 'lodash';
import Icon from '@material-ui/core/Icon';

import { joinPath } from 'dw/core/helpers/path';
import NavbarLayout from 'dw/core/components/NavbarLayout';
import Loading from 'dw/core/components/LoadingSkeleton';
import Profile from '@demonware/devzone-core/components/Profile';
import {
  franchisesSelector,
  selectedFranchiseSelector,
  selectedProjectSelector,
  getProjectName,
} from 'dw/reporting/selectors';

import { NUMBER_FRANCHISES_IN_PLACEHOLDER } from './constants';

import './index.css';

const stateToProps = (state, props) => ({
  franchises: franchisesSelector(state),
  franchise: selectedFranchiseSelector(state, props),
  project: selectedProjectSelector(state, props),
});

const NavigationBar = props => {
  const { franchises, franchise, project, location, match } = props;
  const baseUrl = match.path.split(':franchiseId')[0];
  const currentUrl = joinPath(baseUrl, (franchise && franchise.id) || '');
  const backLink = () =>
    location.pathname !== currentUrl && (
      <Link to={currentUrl} className="back-to-index">
        <Icon fontSize="small">arrow_back</Icon>
        <span className="mobile-hidden">Back to franchise index</span>
      </Link>
    );
  const getHeader = () => {
    if (!(franchise || project)) {
      return null;
    }
    if (location.pathname === currentUrl)
      return `${franchise.name} Franchise Statistics`;
    return (
      (project &&
        `Title Report: ${getProjectName(franchise.name, project.name)}`) ||
      (franchise && `${franchise.name} Franchise Report`) || (
        <Loading height={36} width={200} />
      )
    );
  };
  return (
    <NavbarLayout className="Reporting-NavbarLayout">
      <div className="nav__container flex flex-row">
        {baseUrl && franchise && backLink()}
        <div className="franchise-selector flex flex-row">
          {franchises
            ? franchises.map(f => (
                <Link
                  key={f.id}
                  to={joinPath(baseUrl, f.id)}
                  className={franchise && franchise.id === f.id ? 'active' : ''}
                >
                  {f.name}
                </Link>
              ))
            : range(NUMBER_FRANCHISES_IN_PLACEHOLDER).map(idx => (
                <Loading key={idx} className="empty-link" />
              ))}
        </div>
      </div>
      <Profile />
      <h3 className="header">{getHeader()}</h3>
    </NavbarLayout>
  );
};

NavigationBar.propTypes = {
  franchise: PropTypes.object,
  franchises: PropTypes.arrayOf(PropTypes.object),
  project: PropTypes.object,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

NavigationBar.defaultProps = {
  project: null,
  franchise: undefined,
  franchises: null,
};

export default withRouter(connect(stateToProps)(NavigationBar));
