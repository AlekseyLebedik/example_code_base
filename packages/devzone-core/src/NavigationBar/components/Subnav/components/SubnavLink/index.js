import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ALLOW_BROWSER_TITLE_CHANGE } from '../../../../../config';
import NavLink from '../../../NavLink';
import { SectionTitleContext } from '../../../SectionTitleWrapper';
import styles from './index.module.css';

const SubnavLink = props => {
  const { item, className } = props;
  const { url, title } = item;
  const { subSection } = useContext(SectionTitleContext);

  useEffect(() => {
    if (!ALLOW_BROWSER_TITLE_CHANGE) {
      return null;
    }
    if (subSection) document.title = `${subSection} - Devzone`;

    return function cleanup() {
      document.title = '';
    };
  }, [subSection]);
  return (
    <NavLink
      url={url || '#'}
      key={title}
      className={classNames(className, {
        [styles.activeElement]: subSection === title,
      })}
    >
      <span>{title}</span>
    </NavLink>
  );
};

SubnavLink.propTypes = {
  item: PropTypes.object,
  url: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

SubnavLink.defaultProps = {
  item: {},
  url: '#',
  title: '',
  className: null,
};

export default SubnavLink;
