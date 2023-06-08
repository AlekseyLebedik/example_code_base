import filter from 'lodash/filter';
import get from 'lodash/get';
import { createSelector } from 'reselect';

const releaseNoteSelector = state => get(state, 'releaseNotes.data', []);
export const maintenanceSelector = state => get(state, 'maintenance.data', []);
export const criticalEventsSelector = state =>
  get(state, 'criticalEvents.data', []);

export const devzoneMostRecentReleaseNoteSelector = createSelector(
  releaseNoteSelector,
  releaseNotes => {
    const devzoneRN = filter(
      releaseNotes,
      item => item.component === 'Devzone' && item.released
    );
    const mostRecentDate = new Date(
      Math.max.apply(
        null,
        devzoneRN.map(item => new Date(item.release_date))
      )
    );
    // filter out the object which is the most recent
    return devzoneRN.filter(
      item => new Date(item.release_date).getTime() === mostRecentDate.getTime()
    )[0];
  }
);

export const frameworkMostRecentReleaseNoteSelector = createSelector(
  releaseNoteSelector,
  releaseNotes => {
    const frameworksRN = filter(
      releaseNotes,
      item => item.component === 'Frameworks' && item.released
    );
    const mostRecentDate = new Date(
      Math.max.apply(
        null,
        frameworksRN.map(item => new Date(item.release_date))
      )
    );
    // filter out the object which is the most recent
    return frameworksRN.filter(
      item => new Date(item.release_date).getTime() === mostRecentDate.getTime()
    )[0];
  }
);

export const eventManagerMostRecentReleaseNoteSelector = createSelector(
  releaseNoteSelector,
  releaseNotes => {
    const eventManagerRN = filter(
      releaseNotes,
      item => item.component === 'EventManager' && item.released
    );
    const mostRecentDate = new Date(
      Math.max.apply(
        null,
        eventManagerRN.map(item => new Date(item.release_date))
      )
    );
    // filter out the object which is the most recent
    return eventManagerRN.filter(
      item => new Date(item.release_date).getTime() === mostRecentDate.getTime()
    )[0];
  }
);
