import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ExportIcon from '../../../../icons/ExportIcon';
import Svg from '../../../../components/Svg';
import ExportABTesting from './views/ExportABTesting';
import ExportDefaultView from './views/ExportDefaultView';

import { openModal } from '../../../../components/Modal/state/actions';
import {
  addRecommenderTest,
  addMatchmakingTest,
  addMachineLearningTest,
} from './helpers';

const ExportAction = ({ className }) => {
  const testData = useSelector(state => state.Expy.activeTest);
  const status = useSelector(state => state.Expy.activeTest.status);
  const type = useSelector(state => state.Expy.activeTest.type);

  const dispatch = useDispatch();

  const typeView = {
    dw_abtesting_service: {
      view: ExportABTesting,
      props: {
        test: testData,
      },
    },
    matchmaking: {
      view: ExportDefaultView,
      props: {
        test: testData,
        onConfirm: addMatchmakingTest,
      },
    },
    ml_platform: {
      view: ExportDefaultView,
      props: {
        test: testData,
        onConfirm: addMachineLearningTest,
      },
    },
    recommender: {
      view: ExportDefaultView,
      props: {
        test: testData,
        onConfirm: addRecommenderTest,
      },
    },
  };

  if (status === 'Proposal') return null;

  return typeView[type] ? (
    <Button
      className={className}
      variant="outlined"
      size="small"
      onClick={() =>
        dispatch(
          openModal({ view: typeView[type].view, props: typeView[type].props })
        )
      }
      startIcon={<Svg size="small" icon={<ExportIcon />} />}
    >
      Export
    </Button>
  ) : null;
};

ExportAction.propTypes = {
  className: PropTypes.string,
};

ExportAction.defaultProps = {
  className: '',
};

export default ExportAction;
