import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import find from 'lodash/find';

import Button from '@material-ui/core/Button';
import ExportIcon from '../../../icons/ExportIcon';
import Svg from '../../../components/Svg';
import { TEST_TITLES } from '../../../constants';

const getDWTestUrl = ({ dwTestId, title }) => {
  if (process.env.NODE_ENV === 'production') {
    return `/abtesting/view/${title}/live/${dwTestId}`;
  }
  return `/abtesting/view/5682/dev/${dwTestId}`;
};

const ViewDWTestAction = ({ className }) => {
  const history = useHistory();
  const dwTestId = useSelector(state => state.Expy.activeTest.dwTestId);
  const title = useSelector(state => state.Expy.activeTest.title);

  return (
    <Button
      className={className}
      variant="outlined"
      size="small"
      onClick={() => {
        const url = getDWTestUrl({
          dwTestId,
          title: find(TEST_TITLES, { pretty_name: title }).id,
        });
        history.push(url);
      }}
      startIcon={<Svg size="small" icon={<ExportIcon />} />}
    >
      View AB Test
    </Button>
  );
};

ViewDWTestAction.propTypes = {
  className: PropTypes.string,
};

ViewDWTestAction.defaultProps = {
  className: '',
};

export default ViewDWTestAction;
