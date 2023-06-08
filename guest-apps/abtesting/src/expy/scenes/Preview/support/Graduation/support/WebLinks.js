import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'dw/core/axios';
import get from 'lodash/get';
import filter from 'lodash/filter';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import LinkInput from 'expy/components/InputFields/LinkInput';
import LinkDisplay from 'expy/components/InputFields/LinkDisplay';

import { formatErrorMsg } from '../helpers';
import { useStyles } from '../styles';

const WebLinks = ({ isLinkInput, setIsLinkInput }) => {
  const classes = useStyles();
  const { id: testId } = useSelector(state => state.Expy.activeTest);
  const links = useSelector(state =>
    get(state.Expy.activeTest, 'testGraduation.links', [])
  );

  const [linksState, setLinkState] = useState(links);
  const [error, setError] = useState({ hasError: false, msg: null });

  const updateLinks = async value => {
    setError({ hasError: false, msg: null });
    try {
      const response = await axios.put(`/expy/v1/graduation/${testId}`, {
        links: value,
      });
      const newState = response.data.test.links;
      setLinkState(newState);
    } catch (err) {
      const errMsg = formatErrorMsg(err);
      setError({ hasError: true, msg: errMsg });
    }
  };

  const onLinkCancel = () => setIsLinkInput(false);

  const onLinkDelete = ({ id }) => {
    const newLinkList = filter(linksState, l => l.id !== id);
    updateLinks(newLinkList);
  };

  const onLinkSave = link => {
    const allLinks = [...linksState, link];
    updateLinks(allLinks);
  };

  if (!isLinkInput && linksState.length === 0) return null;

  return (
    <>
      <div className={classes.container}>
        <Typography className={classes.heading} variant="subtitle2">
          Web Links
        </Typography>
        {linksState.map(link => (
          <LinkDisplay
            key={link.id}
            id={link.id}
            title={link.title}
            url={link.url}
            onDelete={onLinkDelete}
          />
        ))}
      </div>
      {isLinkInput && (
        <LinkInput
          onSave={onLinkSave}
          onCancel={onLinkCancel}
          error={error.hasError}
          errorMsg={error.msg}
        />
      )}
    </>
  );
};

WebLinks.propTypes = {
  isLinkInput: PropTypes.bool.isRequired,
  setIsLinkInput: PropTypes.func.isRequired,
};

export default WebLinks;
