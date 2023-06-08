// TODO: explore the feasability of generating a hash for key
/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Empty from 'dw/core/components/Empty';
import { hasData } from 'dw/core/helpers/object';

import { Tree } from 'antd';

import { filteredJson, getExpandedNodes } from './selectors';

import styles from './index.module.css';

const highlight = (item, search) => {
  if (!(item && search)) return item;
  const title = String(item);
  const index = title.toLowerCase().indexOf(search.toLowerCase());
  const beforeStr = title.substr(0, index);
  const highlightedText = title.substr(index, search.length);
  const afterStr = title.substr(index + search.length);
  return index > -1 ? (
    <span>
      {beforeStr}
      <span className={styles.highlighted}>{highlightedText}</span>
      {afterStr}
    </span>
  ) : (
    <span>{title}</span>
  );
};

function buildTreeNodes(object, search) {
  const renderObjectNode = (key, value) =>
    hasData(value) ? (
      <Tree.TreeNode key={key} title={highlight(key, search)}>
        {buildTreeNodes(value, search)}
      </Tree.TreeNode>
    ) : (
      <Tree.TreeNode
        key={key}
        title={
          <>
            {highlight(key, search)}: {highlight(JSON.stringify(value), search)}
          </>
        }
      />
    );
  return Object.entries(object).map(([key, value]) => {
    if (Array.isArray(value)) {
      return (
        <Tree.TreeNode
          key={key}
          title={<span className={styles.key}>{highlight(key, search)}</span>}
        >
          {value.map((child, idx) =>
            typeof child === 'string' ? (
              <Tree.TreeNode
                key={`${key}-${idx}`}
                title={highlight(child, search)}
              />
            ) : (
              <Tree.TreeNode key={`${key}-${idx}`} title={idx}>
                {buildTreeNodes(child, search)}
              </Tree.TreeNode>
            )
          )}
        </Tree.TreeNode>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return renderObjectNode(key, value);
    }

    return (
      <Tree.TreeNode
        key={key}
        title={
          <>
            <span className={styles.key}>{highlight(key, search)}</span>:{' '}
            {highlight(value, search)}
          </>
        }
      />
    );
  });
}

class JSONTree extends Component {
  state = {
    expandedKeys: [...this.props.defaultExpandedKeys],
    search: '',
    autoExpandParent: true,
    data: filteredJson({ data: this.props.data }),
  };

  onChange = e => {
    const search = e.target.value;
    const data = filteredJson({ data: this.props.data, search });
    const expandedKeys = getExpandedNodes(data, search);
    this.setState({
      data,
      expandedKeys,
      search,
      autoExpandParent: true,
    });
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  render() {
    const { searchable } = this.props;
    const { expandedKeys, autoExpandParent, search, data } = this.state;
    return (
      <div>
        {searchable && (
          <TextField
            onChange={this.onChange}
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear Search"
                    onClick={() => this.onChange({ target: { value: '' } })}
                  >
                    <Icon>clear</Icon>
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        )}
        {data ? (
          <Tree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            className={styles.container}
          >
            {buildTreeNodes(data, search)}
          </Tree>
        ) : (
          <Empty className={styles.empty} />
        )}
      </div>
    );
  }
}

JSONTree.propTypes = {
  data: PropTypes.object.isRequired,
  searchable: PropTypes.bool,
  defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
};

JSONTree.defaultProps = {
  searchable: false,
  defaultExpandedKeys: [],
};

export default JSONTree;
