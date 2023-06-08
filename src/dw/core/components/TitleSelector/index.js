import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ReactGA from 'react-ga';
import { generatePath } from 'react-router-dom';

import { connect } from 'dw/core/helpers/component';
import {
  plainProjectsSelector,
  currentEnvironment,
  currentTitle,
} from 'dw/core/helpers/title-env-selectors';

import * as components from './components';
import * as actions from './actions';

const { ConfirmDefaultTitle, DropdownSelector, Dropdown } = components;

class TitleSelector extends Component {
  static propTypes = {
    currentTitle: PropTypes.object,
    currentEnv: PropTypes.object,
    usesMulticontext: PropTypes.bool,
    projects: PropTypes.arrayOf(PropTypes.object),
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    setTitle: PropTypes.func.isRequired,
    resetProjectData: PropTypes.func,
    externalSetTitleFunc: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    projects: [],
    currentTitle: null,
    currentEnv: null,
    usesMulticontext: false,
    externalSetTitleFunc: null,
    resetProjectData: () => {},
    className: undefined,
  };

  state = {
    dropdownStatus: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onSelectTitle = (project, title, environment) => {
    const { match, history, location } = this.props;

    if (
      (this.props.currentTitle && title.id !== this.props.currentTitle.id) ||
      (this.props.currentEnv && environment.id !== this.props.currentEnv.id)
    ) {
      const url = location.pathname
        .replace(
          match.url,
          generatePath(match.path, {
            titleId: title.id,
            env: environment.shortType,
          })
        )
        .replace('//', '/');

      history.push(url);
      this.props.resetProjectData();
      this.props.setTitle(project, title, environment);

      if (this.props.externalSetTitleFunc) {
        this.props.externalSetTitleFunc(project, title, environment);
      }
    }

    this.setState({ dropdownStatus: false });
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.dropdownStatus
    ) {
      this.setState({ dropdownStatus: false });
    }
  };

  toggleDropdown = () => {
    // Track when the user open the title selector
    if (!this.state.dropdownStatus) {
      ReactGA.event({
        category: 'User',
        action: 'Clicked on Title Selector',
      });
    }

    this.setState(prevState => ({
      dropdownStatus: !prevState.dropdownStatus,
    }));
  };

  render() {
    const { className: rootClassName } = this.props;
    const dropdownProps = {
      currentTitle: this.props.currentTitle,
      currentEnv: this.props.currentEnv,
      usesMulticontext: this.props.usesMulticontext,
    };

    return (
      <div
        className={classNames('title-selector__container', rootClassName)}
        ref={this.setWrapperRef}
      >
        <DropdownSelector
          {...dropdownProps}
          toggleDropdown={this.toggleDropdown}
        />
        {this.state.dropdownStatus && (
          <Dropdown
            {...dropdownProps}
            onSelectTitle={this.onSelectTitle}
            projects={this.props.projects}
          />
        )}
        <ConfirmDefaultTitle
          onSelectTitle={this.onSelectTitle}
          currentEnv={this.props.currentEnv}
          projects={this.props.projects}
        />
      </div>
    );
  }
}

const stateToProps = state => ({
  currentTitle: currentTitle(state),
  currentEnv: currentEnvironment(state),
  projects: plainProjectsSelector(state),
});

const dispatchToProps = {
  setTitle: actions.setTitle,
};

export default connect(stateToProps, dispatchToProps, TitleSelector);

export { default as reducer } from './reducer';
export { actions, components };
