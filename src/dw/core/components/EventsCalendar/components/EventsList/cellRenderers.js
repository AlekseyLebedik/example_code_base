import React from 'react';
import { selectGroup } from 'dw/core/components/EventsCalendar/helpers';
import DateTimePicker from 'dw/core/components/DateTimePicker/LocalizedFormFieldDateTimePicker';
import { dateValueGetter, eventWriteCheck } from './helpers';
import styles from './index.module.css';

export const DateCellRenderer = params => {
  const { event } = params.data;
  let value;
  let field;
  let clearable = false;
  if (params.colDef.field === 'endDate') {
    value = event.end_at;
    field = 'end_at';
    if (!event.is_schedule) clearable = true;
  } else {
    field = 'publish_at';
    value = event.publish_at;
  }

  const canUpateEvent = eventWriteCheck(event, params.context.writeAccess);
  if (!canUpateEvent) {
    return (
      <div className={styles.defaultDateField}>{dateValueGetter(value)}</div>
    );
  }
  return (
    <DateTimePicker
      classes={{ input: styles.dateTimePicker }}
      input={{
        clearable,
        fullWidth: true,
        label: 'Date',
        onChange: timestamp =>
          params.context.updateEventDate(event, { [field]: timestamp }),
        returnTimestamp: true,
        value,
      }}
    />
  );
};

export const TitleLinkRenderer = params => {
  const { eventGroups, context, data } = params;
  const { userTimezone } = context;
  const group = selectGroup(eventGroups, data.eventGroup);
  const { GroupLink } = group;
  return <GroupLink data={data} group={group} userTimezone={userTimezone} />;
};
