import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import Loading from 'dw/core/components/Loading';

import { fetchThunderpantsLink } from './actions';

import styles from './index.module.css';

const linkSelector = (state, props) =>
  props.serverID && state.Scenes.ThunderpantsLink[props.serverID]
    ? state.Scenes.ThunderpantsLink[props.serverID].link
    : undefined;

class ThunderpantsLink extends React.Component {
  state = {
    serverID: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.serverID !== state.serverID) {
      props.fetchThunderpantsLink(props.serverID);
      return { serverID: props.serverID };
    }
    return null;
  }

  render() {
    const { serverID } = this.state;
    const { link, classes } = this.props;

    if (!serverID) return null;
    if (link && link !== null) {
      return (
        <a
          href={`${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(styles.link, classes.root)}
        >
          Thunderpants
          <Icon className={styles.icon}>open_in_new</Icon>
        </a>
      );
    }
    if (link === null) {
      return (
        <span>{`Thunderpants HQ not populated on server ${serverID}.`}</span>
      );
    }
    return (
      <div className={styles.link}>
        <Loading size={40} />
        {`Loading Thunderpants URL (${serverID})...`}
      </div>
    );
  }
}

ThunderpantsLink.propTypes = {
  link: PropTypes.string,
  classes: PropTypes.object,
  serverID: PropTypes.number,
  fetchThunderpantsLink: PropTypes.func.isRequired,
};

ThunderpantsLink.defaultProps = {
  serverID: undefined,
  link: '',
  classes: {
    root: null,
  },
};

function mapStateToProps(state, props) {
  return {
    link: linkSelector(state, props),
  };
}

export default connect(mapStateToProps, { fetchThunderpantsLink })(
  ThunderpantsLink
);
