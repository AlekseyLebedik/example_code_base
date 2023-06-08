import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NavLink from '../NavLink';
import BookmarkButton from '../BookmarkButton';
import { SuiteContext } from '../../context';
import styles from './index.module.css';
import slackIcon from '../../../themes/slack-icon.png';

export const RouteLink = ({ className, ...props }) => {
  const { key, title, url = '#', label, items, styleType, hidden } = props.data;
  const { onNavigate } = useContext(SuiteContext);
  return items && items.length > 0 ? (
    <Subsection {...props} />
  ) : (
    !hidden && (
      <div className={styles.routeContainer}>
        <BookmarkButton
          {...props}
          favKey={key || title}
          parentKey={get(props, 'parent.key') || get(props, 'parent.title')}
          className={styles.showOnHover}
        />
        <NavLink
          url={url}
          onClick={onNavigate}
          key={title}
          className={classNames(styles.listItem, className, {
            [styles[styleType]]: styleType,
          })}
        >
          <Typography className={styles.listItemText} variant="body2">
            {title}
          </Typography>
          <span className={styles.newItem}>
            <Typography className={styles.newItemText} variant="inherit">
              {label}
            </Typography>
          </span>
          {styleType === 'action' && (
            <Icon className={styles.actionIcon} fontSize="inherit">
              add_circle_outline
            </Icon>
          )}
        </NavLink>
      </div>
    )
  );
};
RouteLink.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  parent: PropTypes.object,
  deleteOnly: PropTypes.bool,
};
RouteLink.defaultProps = {
  className: '',
  parent: {},
  deleteOnly: false,
};

const visible = item => !item.hidden;

export const SubsectionBase = ({ data, classes, ...props }) => {
  const { title, items } = data;
  return (
    <div className={styles.subSection}>
      <Typography
        className={classNames(styles.subSectionTitle, classes.subSectionTitle)}
      >
        {title}
      </Typography>
      {items.filter(visible).map(item => (
        <RouteLink
          data={item}
          key={item.key || item.title}
          parent={data}
          {...props}
        />
      ))}
    </div>
  );
};
SubsectionBase.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object,
};
SubsectionBase.defaultProps = {
  classes: {},
};

const subSectionStyles = theme => ({
  subSectionTitle: {
    borderTop: '1px solid rgba(255,255,255,0.5)',
    fontSize: theme.typography.label1.fontSize,
    marginLeft: 37,
    marginTop: 10,
  },
});

export const Subsection = withStyles(subSectionStyles)(SubsectionBase);

export const CompanyColumn = ({ data, ...props }) => {
  const { key, title, email, slack, slackLink, items } = data;
  return (
    <div
      className={classNames(styles.companyColumn, {
        [styles.demonwareColumn]: key === 'dw',
        [styles.corevizColumn]: key === 'data_services',
        [styles.centralTechColumn]: key === 'ct',
      })}
    >
      <div className={styles.companyColumnHeader}>
        <span className={styles.companyColumnHeaderName}>
          <Typography
            variant="body2"
            component="span"
            classes={{ root: styles.companyColumnHeaderName }}
          >
            <span className={styles.sectionBy}>&zwnj;by</span>
            <span className={styles.sectionName}>{` ${title}`}</span>
          </Typography>
        </span>
        <span className={styles.contacts}>
          <span className={styles.contactsItem}>
            <Typography variant="body2" component="span">
              <Link href={slackLink} target="_blank" rel="noopener">
                <span className={styles.contactsIcon}>
                  <img
                    src={slackIcon}
                    style={{ width: '1em', height: '1em', alignSelf: 'center' }}
                    alt="Slack logo"
                  />
                </span>
                {`#${slack}`}
              </Link>
            </Typography>
          </span>
          <span className={styles.contactsItem}>
            <Typography variant="body2" component="span">
              <Link href={`mailto:${email}`} target="_blank" rel="noopener">
                <Icon className={styles.contactsIcon} fontSize="inherit">
                  email
                </Icon>
                {email}
              </Link>
            </Typography>
          </span>
        </span>
      </div>
      <div
        className={classNames(styles.companyColumnContent, {
          [styles.demonwareContent]: key === 'dw',
          [styles.corevizContent]: key === 'data_services',
          [styles.centralTechContent]: key === 'ct',
        })}
      >
        {items.filter(visible).map(section => (
          <Section
            data={section}
            key={section.key || section.title}
            {...props}
          />
        ))}
      </div>
    </div>
  );
};
CompanyColumn.propTypes = {
  data: PropTypes.object.isRequired,
};

const sectionStyles = theme => ({
  sectionHeader: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.label1.fontSize,
  },
});

const SectionBase = ({ data, classes, ...props }) => {
  const { key, title, items } = data;
  return (
    <ul className={styles.routesList}>
      <span className={classNames(styles.sectionHeader, classes.sectionHeader)}>
        <BookmarkButton
          favKey={key}
          section
          deleteOnly={props.deleteOnly}
          className={styles.showOnHover}
        />
        {title}
      </span>
      {items.filter(visible).map(item => (
        <RouteLink
          data={item}
          key={item.key || item.title}
          parent={data}
          {...props}
        />
      ))}
    </ul>
  );
};
SectionBase.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object,
  deleteOnly: PropTypes.bool,
};
SectionBase.defaultProps = {
  classes: {},
  deleteOnly: false,
};

export const Section = compose(withStyles(sectionStyles))(SectionBase);
