import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { SUPPORT_EMAIL, SUPPORT_SLACK } from 'dw/config';
import { getMailto } from 'dw/core/helpers/email';
import AdapterLink from 'dw/core/components/AdapterLink';

import './presentational.css';

const FeatureNotSupportedError = ({
  error: { subtitleOverride = 'Feature not supported', showTitle = true },
  error,
  handleGoBack,
}) => {
  const homeButton = (
    <Button component={AdapterLink} to="/">
      Go to title info
    </Button>
  );
  return (
    <div className="not-supported-error">
      {showTitle && <div className="title">415</div>}
      <div className="subtitle">{subtitleOverride}</div>
      <div className="description">
        For support contact{' '}
        <a href={getMailto('Devzone Frontend Error Feedback', error.message)}>
          {SUPPORT_EMAIL}
        </a>
        {' or our Slack channel '}
        <a href={SUPPORT_SLACK.url} target="_blank" rel="noopener noreferrer">
          {SUPPORT_SLACK.channel}
        </a>
      </div>
      <div className="actions">
        {handleGoBack && (
          <Button onClick={handleGoBack}>Go back to previous</Button>
        )}
        {homeButton}
      </div>
    </div>
  );
};
FeatureNotSupportedError.propTypes = {
  error: PropTypes.object,
  handleGoBack: PropTypes.func,
};
FeatureNotSupportedError.defaultProps = {
  error: {},
  handleGoBack: undefined,
};

const Error500 = ({ error, handleGoBack, retry, children }) => (
  <div className="critical-error">
    <div className="title">500</div>
    <div className="subtitle">Something went wrong</div>
    <div className="description">
      Try again and if the problem persists
      <br />
      contact{' '}
      <a href={getMailto('Devzone Frontend Error Feedback', error.message)}>
        {SUPPORT_EMAIL}
      </a>
      {' or our Slack channel '}
      <a href={SUPPORT_SLACK.url} target="_blank" rel="noopener noreferrer">
        {SUPPORT_SLACK.channel}
      </a>
    </div>
    <div className="actions">
      {handleGoBack && <Button onClick={handleGoBack}>Back</Button>}
      {retry && <Button onClick={retry}>Retry</Button>}
    </div>
    {children}
  </div>
);
Error500.propTypes = {
  error: PropTypes.object,
  handleGoBack: PropTypes.func,
  retry: PropTypes.func,
  children: PropTypes.node,
};
Error500.defaultProps = {
  error: {},
  handleGoBack: undefined,
  retry: undefined,
  children: null,
};

export const filteredError = err => {
  const { request: { responseText = '' } = {}, message } = err;

  const isTitleError =
    responseText.indexOf('is not configured') !== -1 ||
    /Title \d+ does not exist/.test(responseText);

  const filteredErr = isTitleError
    ? {
        ...err,
        message,
        request: {
          ...err?.request,
          status: 415,
        },
        subtitleOverride: 'Service not configured for this Title Environment',
        showTitle: false,
      }
    : err;

  return filteredErr;
};

function CriticalErrorStateless({
  isVisible,
  error,
  retry,
  handleGoBack,
  children,
}) {
  if (!isVisible) {
    return <>{children}</>;
  }

  const filteredErr = filteredError(error);

  switch (filteredErr?.request?.status) {
    case 415:
      return (
        <FeatureNotSupportedError
          error={filteredErr}
          handleGoBack={handleGoBack}
        />
      );
    default:
      return (
        <Error500
          error={filteredErr}
          handleGoBack={handleGoBack}
          retry={retry}
        />
      );
  }
}

CriticalErrorStateless.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    request: PropTypes.object,
  }),
  retry: PropTypes.func,
  handleGoBack: PropTypes.func,
  children: PropTypes.node,
};

CriticalErrorStateless.defaultProps = {
  error: { message: '', request: {} },
  retry: () => null,
  handleGoBack: () => null,
  children: null,
};

export default CriticalErrorStateless;

export { Error500 };
