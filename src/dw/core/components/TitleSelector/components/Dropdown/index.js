import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { List } from 'react-virtualized';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import { PlatformIcon } from 'dw/core/components/Icons';
import { matchRegExp } from './helpers';

import styles from './index.module.css';

const ProjectNameRow = ({ item, style }) => (
  <div style={style}>
    <Divider className={styles.divider} />
    <ListSubheader className={styles.project_name} disableSticky>
      {item.name}
    </ListSubheader>
  </div>
);

ProjectNameRow.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};

const MenuItemRow = ({ onClick, style, className, details }) => (
  <MenuItem
    onClick={onClick}
    style={style}
    className={className}
    disableGutters
  >
    <div className={classNames(styles.item_container, 'flex', 'flex-row')}>
      {details}
    </div>
  </MenuItem>
);

MenuItemRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
};

const ProjectsList = ({
  projects,
  currentTitle,
  currentEnv,
  onSelectTitle,
}) => {
  const selectedIndex = projects.findIndex(
    item =>
      item.environment &&
      item.title.id === currentTitle.id &&
      item.environment.shortType === currentEnv.shortType
  );

  const rowRenderer =
    () =>
    // eslint-disable-next-line react/prop-types
    ({ index, key, style }) => {
      const item = projects[index];
      // eslint-disable-next-line react/prop-types
      const { height, ...newStyle } = style;
      if (!item.environment) {
        return <ProjectNameRow key={key} style={newStyle} item={item} />;
      }
      const { project, title, environment } = item;
      const { name, platform, id } = title;
      return (
        <MenuItemRow
          key={key}
          style={newStyle}
          className={classNames({
            [styles.is_active]: index === selectedIndex,
          })}
          onClick={() => onSelectTitle(project, title, environment)}
          details={
            <>
              <div className={styles.title_id}>({id})</div>
              <div className={styles.title_name}>{name}</div>
              <div className={styles.title_details}>
                <div
                  className={classNames(
                    styles.platform,
                    platform.toLowerCase(),
                    'items-center',
                    'flex'
                  )}
                >
                  <PlatformIcon className={styles.icon} platform={platform} />
                </div>
                <div
                  className={classNames(
                    styles.title_env,
                    environment.shortType
                  )}
                >
                  {environment.shortType}
                </div>
              </div>
            </>
          }
        />
      );
    };

  const longest = projects.reduce(
    (curMax, item) =>
      Math.max(
        curMax,
        item.environment
          ? `(${item.title.id}) ${item.title.name}`.length
          : item.name.length
      ),
    0
  );

  // margin + padding + max title lenght + max title env / platform size
  const width = 4 * 16 + longest * 10 + 160;
  const rows = projects.length < 5 ? 5 : 8;

  return (
    <List
      className={styles.titles_list}
      rowCount={projects.length}
      rowRenderer={rowRenderer()}
      height={rows * 36}
      rowHeight={36}
      width={width}
      scrollToIndex={selectedIndex}
    />
  );
};

const propTypes = {
  onSelectTitle: PropTypes.func.isRequired,
  currentTitle: PropTypes.object,
  currentEnv: PropTypes.object,
  projects: PropTypes.arrayOf(PropTypes.object),
};
const defaultProps = {
  projects: [],
  currentTitle: null,
  currentEnv: null,
};

ProjectsList.propTypes = propTypes;
ProjectsList.defaultProps = defaultProps;

class Dropdown extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  state = {
    searchTerm: '',
  };

  search = () => {
    const filteredProjects = [];
    const match = matchRegExp(this.state.searchTerm);

    let lastProjectId = null;

    this.props.projects.forEach(item => {
      if (
        match(
          `${item.title.id} ${item.title.name} ${item.title.platform} ${item.environment.shortType} ${item.project.name} ${item.project.id}`
        )
      ) {
        if (lastProjectId !== item.project.id) {
          filteredProjects.push(item.project);
          lastProjectId = item.project.id;
        }
        filteredProjects.push(item);
      }
    });

    return filteredProjects;
  };

  termChange = value =>
    this.setState({
      searchTerm: value,
    });

  render() {
    const filteredProjects = this.search();
    return (
      <div id="titles-dropdown" className={styles.dropdown}>
        <div className={styles.search}>
          <Icon className={styles.search_icon}>search</Icon>
          <input
            type="text"
            style={{ color: '#000' }}
            className={styles.search_input}
            placeholder="Search for title name..."
            onChange={e => this.termChange(e.target.value)}
            autoFocus
          />
        </div>
        <ProjectsList {...this.props} projects={filteredProjects} />
      </div>
    );
  }
}

export default Dropdown;
