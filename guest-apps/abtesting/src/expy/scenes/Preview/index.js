import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import find from 'lodash/find';

import Loading from 'dw/core/components/Loading';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import BarChartIcon from '@material-ui/icons/BarChart';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import Typography from '@material-ui/core/Typography';

import PendingIcon from '../../icons/PendingIcon';
import ApprovedIcon from '../../icons/ApprovedIcon';
import InfoIcon from '../../icons/InfoIcon';
import DeniedIcon from '../../icons/DeniedIcon';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import Svg from '../../components/Svg';
import PerformanceSummary from '../../components/Coreviz/PerformanceSummary';
import DeleteWarning from '../../components/Modal/views/DeleteWarning';
import ErrorWarning from '../../components/Modal/views/ErrorWarning';
import Section from './support/Section';
import Graduation from './support/Graduation';
import Treatment from './support/Treatment';
import SlackAction from './support/SlackAction';
import ExportAction from './support/ExportAction';
import SlackNotify from './support/SlackNotify';
import SlackApproval from './support/SlackApproval';
import ViewDWTestAction from './support/ViewDWTestAction';
import Summary from './support/Summary';

import { openModal } from '../../components/Modal/state/actions';
import { fetchActiveTest } from './helpers';
import { getPrettyDate, isJSON } from '../../helpers';
import { TEST_TYPES } from '../../constants';

import { useStyles } from './styles';

const statusIcons = {
  approved: <Svg size="small" color="approved" icon={<ApprovedIcon />} />,
  denied: <Svg size="small" color="denied" icon={<DeniedIcon />} />,
  pending: <Svg size="small" color="pending" icon={<PendingIcon />} />,
  info: <Svg size="small" color="info" icon={<InfoIcon />} />,
};

const Preview = () => {
  const classes = useStyles();

  const history = useHistory();
  const { testId: activeTestId } = useParams();

  const [slackView, setSlackView] = useState();

  const dispatch = useDispatch();

  const pending = useSelector(state => state.Expy.activeTest.pending);
  const error = useSelector(state => state.Expy.activeTest.error);

  const name = useSelector(state => state.Expy.activeTest.name);
  const status = useSelector(state => state.Expy.activeTest.status);
  const owner = useSelector(state => state.Expy.activeTest.owner);
  const type = useSelector(state => state.Expy.activeTest.type);
  const hypothesis = useSelector(state => state.Expy.activeTest.hypothesis);
  const summary = useSelector(state => state.Expy.activeTest.summary);
  const responsibilities = useSelector(
    state => state.Expy.activeTest.responsibilities
  );
  const dateStart = useSelector(state => state.Expy.activeTest.dateStart);
  const dateEnd = useSelector(state => state.Expy.activeTest.dateEnd);
  const kpi = useSelector(state => state.Expy.activeTest.kpi);
  const moreUrl = useSelector(state => state.Expy.activeTest.moreUrl);
  const approvers = useSelector(state => state.Expy.activeTest.approvers);
  const treatments = useSelector(state => state.Expy.activeTest.treatments);
  const categories = useSelector(state => state.Expy.activeTest.categories);
  const dwTestId = useSelector(state => state.Expy.activeTest.dwTestId);

  useEffect(() => {
    if (slackView) setSlackView();
    if (activeTestId) dispatch(fetchActiveTest(activeTestId));
  }, [activeTestId]);

  if (pending)
    return (
      <div className={classes.loadingContainer}>
        <Loading />
      </div>
    );

  if (error)
    return (
      <ErrorWarning
        heading="Oops...error!"
        description="No test matching criteria. Try again."
      />
    );

  return (
    <Container className={classes.root}>
      <div className={classes.nameContainer}>
        <Typography className={classes.name} variant="h5" component="h2">
          {name}
        </Typography>
      </div>
      <Badge withBullet color={status.toLowerCase()}>
        {status}
      </Badge>
      <div className={classes.actions}>
        <Button
          className={classes.actionBtn}
          variant="outlined"
          size="small"
          onClick={() => history.push(`/abtesting/expy/edit/${activeTestId}`)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          className={classes.actionBtn}
          variant="outlined"
          size="small"
          onClick={() => history.push(`/abtesting/expy/clone/${activeTestId}`)}
          startIcon={<FileCopyOutlinedIcon />}
        >
          Clone
        </Button>
        {moreUrl && (
          <Button
            className={classes.actionBtn}
            variant="outlined"
            size="small"
            href={moreUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<MoreHorizIcon />}
          >
            Learn More
          </Button>
        )}
        {dwTestId ? (
          <ViewDWTestAction className={classes.actionBtn} />
        ) : (
          <ExportAction className={classes.actionBtn} />
        )}
        <Button
          className={classes.actionBtn}
          variant="outlined"
          size="small"
          onClick={() =>
            dispatch(
              openModal({ view: DeleteWarning, props: { activeTestId } })
            )
          }
          startIcon={<DeleteOutlineRoundedIcon />}
        >
          Trash
        </Button>
      </div>
      <Section title="Owner" description={owner || 'None'} />
      <Section title="Approval Status">
        <SlackAction
          className={classes.slackBtn}
          onClick={({ value }) => setSlackView(value.toLowerCase())}
        />
        {slackView &&
          (slackView === 'notify' ? <SlackNotify /> : <SlackApproval />)}
        {approvers.length !== 0 &&
          approvers.map(approver => (
            <Alert
              key={approver.name}
              color={approver.status}
              title={approver.name}
              icon={statusIcons[approver.status]}
            >
              {approver.input && approver.input}
            </Alert>
          ))}
      </Section>
      <Section title="Hypothesis" description={hypothesis} />
      <Section title="Summary">
        {isJSON(summary) ? <Summary content={summary} /> : <p>{summary}</p>}
        {type && (
          <div className={classes.type}>
            <div className={classes.icon}>
              <FingerprintIcon />
            </div>
            <div>{find(TEST_TYPES, { id: type })?.pretty_name}</div>
          </div>
        )}
        {(dateStart || dateEnd) && (
          <div className={classes.date}>
            <div className={classes.icon}>
              <CalendarTodayIcon />
            </div>
            <div>
              {' '}
              {dateStart ? getPrettyDate(dateStart) : 'TBD'} -{' '}
              {dateEnd ? getPrettyDate(dateEnd) : 'TBD'}
            </div>
          </div>
        )}
        {kpi && (
          <div className={classes.kpi}>
            <div className={classes.icon}>
              <BarChartIcon />
            </div>
            <div>{kpi}</div>
          </div>
        )}
      </Section>
      <Section title="Responsibilities" description={responsibilities} />
      {treatments.length !== 0 && (
        <Section title="Treatments">
          <Grid container spacing={2}>
            {treatments.map(t => (
              <Grid key={`${t.name}-preview`} item xs={12} lg={6} xl={6}>
                <Treatment
                  name={t.name}
                  imageName={t.imageName}
                  percentage={t.percentage}
                  type={t.type}
                  isControl={t.isControl}
                  segment={t.segment}
                  dateStart={t.dateStart}
                  dateEnd={t.dateEnd}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
      )}
      {categories.length !== 0 && (
        <Section title="Categories">
          {categories.map(tag => (
            <Badge key={tag} color="white">
              {tag}
            </Badge>
          ))}
        </Section>
      )}
      <Section title="Performance Summary">
        <PerformanceSummary
          name={name}
          status={status}
          type={type}
          hasDashboardButton
        />
      </Section>
      <Section title="Test Graduation">
        <Graduation />
      </Section>
    </Container>
  );
};

export default Preview;
