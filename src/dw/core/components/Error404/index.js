import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { SUPPORT_EMAIL, SUPPORT_SLACK } from 'dw/config';
import { getMailto } from 'dw/core/helpers/email';

import './index.css';

export default function Error404(props) {
  const { redirectTo } = props;
  return (
    <div className="_404__container">
      <div className="_404__content">
        <div className="first">404</div>
        <div className="second">Page Not Found</div>
        <div className="third">
          You&rsquo;re Missing In Action... <br />
          <br />
          This page is not available, for support contact{' '}
          <a
            href={getMailto('Devzone Frontend page is not available feedback')}
          >
            {SUPPORT_EMAIL}
          </a>
          {' or our Slack channel '}
          <a href={SUPPORT_SLACK.url} target="_blank" rel="noopener noreferrer">
            {SUPPORT_SLACK.channel}
          </a>
        </div>
        <div className="actions">
          <Link to={redirectTo}>MAIN PAGE</Link>
        </div>
      </div>
    </div>
  );
}

Error404.propTypes = {
  redirectTo: PropTypes.string,
};

Error404.defaultProps = {
  redirectTo: '/',
};
