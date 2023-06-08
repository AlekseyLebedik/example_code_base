import React from 'react';
import PropTypes from 'prop-types';
import SubnavMenu from '../SubnavMenu';
import SubnavLink from '../SubnavLink';

const SubnavElement = props => {
  const { item, menuProps, linkProps } = props;
  const { title, isMenu, items } = item;

  return (
    (isMenu && (
      <SubnavMenu
        title={title}
        items={items}
        linkProps={linkProps}
        {...menuProps}
      />
    )) || <SubnavLink item={item} key={title} {...linkProps} />
  );
};

SubnavElement.propTypes = {
  activeSubSection: PropTypes.string,
  className: PropTypes.string,
  item: PropTypes.object,
  linkProps: PropTypes.object,
  menuProps: PropTypes.object,
};

SubnavElement.defaultProps = {
  activeSubSection: null,
  className: undefined,
  item: {},
  linkProps: {},
  menuProps: {},
};

export default SubnavElement;
