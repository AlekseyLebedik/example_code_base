import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter, Route, Switch, generatePath } from 'react-router-dom';
import { compose } from 'redux';

import { joinPath } from 'dw/core/helpers/path';
import { masterWidth } from './constants';
import Expander from './components/Expander';
import * as helpers from './helpers';

import './index.css';

export { helpers };

const styles = theme => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: masterWidth,
    flexShrink: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    overflow: 'hidden',
    height: '100%',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: masterWidth,
  },
  backToList: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'initial',
    },
  },
  ...helpers.getDrawerStyles()(theme),
});

const initialState = props => ({
  detailExpanded: false,
  viewDetailsMode: props.match.params.id,
  height: '100%',
});

export class MasterDetailBase extends Component {
  static propTypes = {
    master: PropTypes.func.isRequired,
    detail: PropTypes.func.isRequired,
    empty: PropTypes.func,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    loading: PropTypes.object,
    baseUrl: PropTypes.string,
    classes: PropTypes.object,
    width: PropTypes.string,
  };

  static defaultProps = {
    empty: null,
    loading: {},
    baseUrl: null,
    classes: {},
    width: 'lg',
  };

  state = initialState(this.props);

  getPassedProps() {
    return {
      actions: {
        onSelectItem: this.handleOnSelectItem,
      },
      match: this.props.match,
    };
  }

  setRef = el => {
    if (el !== null) {
      const { top } = el.getBoundingClientRect();
      this.setState({ height: `calc(-${top}px + 100vh)` });
    }
  };

  handleOnExpandDetail = () => {
    this.setState(previousState => ({
      detailExpanded: !previousState.detailExpanded,
    }));
  };

  handleBackToList = () => {
    this.setState({ viewDetailsMode: false });
  };

  handleOnSelectItem = (itemId, baseUrl) => {
    let path;
    const { history, match } = this.props;
    if (baseUrl !== undefined) {
      path = joinPath(baseUrl, itemId);
    } else {
      const query = history.location.search;
      const paramId = match.params.id;
      const base = !paramId
        ? joinPath(match.url, itemId || '')
        : generatePath(match.path, { ...match.params, id: itemId });
      path = !query ? base : `${base}${query}`;
    }
    history.replace(path);
    this.setState({ viewDetailsMode: true });
  };

  isDetailsLoading = () => {
    const { loadingDetails } = this.props.loading;
    return loadingDetails;
  };

  /**
   * Id should be removed from the end of the url otherwise it may replace
   * part of the baseUrl.
   */
  replaceUrlId = (url, id, newId) => url.replace(new RegExp(`${id}$`), newId);

  renderMaster = ({ match }) => {
    const { master } = this.props;
    const passedProps = this.getPassedProps();

    if (match.params.id) {
      return master({ ...passedProps, selectedItemId: match.params.id });
    }
    return master(passedProps);
  };

  renderDetail = ({ match }) => {
    const { detail, empty } = this.props;
    if (this.isDetailsLoading()) {
      return (
        <div className="loading__container">
          <CircularProgress />
        </div>
      );
    }
    const passedProps = this.getPassedProps();

    if (match.params.id) {
      return detail({
        ...passedProps,
        selectedItemId: match.params.id,
      });
    }
    return empty && empty(passedProps);
  };

  render() {
    const { detailExpanded, viewDetailsMode } = this.state;
    const { width, classes } = this.props;
    let drawerOpen = !detailExpanded;
    if (width === 'xs' || width === 'sm') {
      drawerOpen = !viewDetailsMode;
    }
    let baseUrl = this.props.baseUrl || this.props.match.url;
    const { id } = this.props.match.params;

    if (id !== undefined) {
      baseUrl = this.replaceUrlId(baseUrl, id, '');
    }

    return (
      <div
        ref={this.setRef}
        style={{ height: this.state.height }}
        className="master-detail__container"
      >
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classNames('master__container', classes.drawerPaper),
          }}
          PaperProps={{ elevation: 20 }}
        >
          <Switch>
            <Route exact path={baseUrl} render={this.renderMaster} />
            <Route path={joinPath(baseUrl, ':id')} render={this.renderMaster} />
          </Switch>
        </Drawer>
        <div
          className={classNames('detail__container', classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <Expander
            className={classes.expander}
            expanded={detailExpanded}
            onClick={this.handleOnExpandDetail}
          />
          <Expander
            className={classes.backToList}
            expanded={!viewDetailsMode}
            onClick={this.handleBackToList}
            title="Back to list"
          />
          <Switch>
            <Route exact path={baseUrl} render={this.renderDetail} />
            <Route path={joinPath(baseUrl, ':id')} render={this.renderDetail} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default compose(
  withWidth(),
  withStyles(styles),
  withRouter
)(MasterDetailBase);
