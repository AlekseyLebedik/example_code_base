import React from 'react';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';
import KeyValueChip from 'dw/core/components/KeyValueChip';
import { uuid } from 'dw/core/helpers/uuid';
import { DownloadButton } from './components/Buttons';
import styles from './index.module.css';
import { extractNumFromString } from './helpers';
import EditStatisticsModal from './components/EditStatisticsModal';

const OTHER_STATISTICS_FILTERED_FIELDS = ['downloads'];

export const downloadRenderer = params => (
  <div>
    <DownloadButton params={params} />
  </div>
);

export const editStatisticsRenderer = params => {
  const { statisticsValue, categoryValue } = params.context;
  return (
    <div className={styles.modalForm}>
      <KeyValueChip
        chipKey="Downloads"
        chipValue={params.data?.statistics[0].value}
        color="primary"
        size="small"
        className={styles.downloads}
      />
      <EditStatisticsModal
        data={params.data}
        statisticsValue={statisticsValue}
        categoryValue={categoryValue}
      />
    </div>
  );
};

export const otherStatisticsRenderer = ({ value }) => {
  const chips = value
    ?.filter(s => !OTHER_STATISTICS_FILTERED_FIELDS.includes(s.name))
    .map(s => (
      <KeyValueChip
        key={`${s.name}_${s.value}`}
        chipKey={capitalize(s.name)}
        chipValue={s.value}
        color="primary"
        size="small"
      />
    ));
  return chips?.length > 0 ? (
    <div className={styles.chips}>{chips}</div>
  ) : (
    <span>No statistics</span>
  );
};

export const playerIdRenderer = params => {
  const title = params.context.currentTitle.id;
  const env = params.context.currentEnv.shortType;
  const id = extractNumFromString(params.data.metadata.owner);
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      to={`/online-configuration/${title}/${env}/object-store/user/${id}`}
    >
      {params.data.metadata.owner}
    </Link>
  );
};

export const TagCellRenderer = params => {
  const chips = params?.value?.map(p => (
    <div key={uuid()} className={styles.chip}>
      {p.key}: {(p.values && p.values.join(' ')) || p.value}
    </div>
  ));
  return chips?.length > 0 ? <>{chips}</> : <span>No tags</span>;
};
