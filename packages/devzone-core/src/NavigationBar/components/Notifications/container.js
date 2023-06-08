import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NotificationStateless from './presentational';
import { useCriticalEvents, useMaintenances } from './hooks';

function NotificationContainer({
  devzoneReleaseNote,
  eventManagerReleaseNote,
  frameworkReleaseNote,
  hasFeatureSwitch,
}) {
  const [toggleBadge, setBadgeToggle] = useState(true);
  const [badgeCount, setBadgeCount] = useState(0);
  const [showUnread, setUnread] = useState({
    devzone: false,
    EventManager: false,
    Frameworks: false,
    CriticalEvents: false,
    Maintenance: false,
  });
  const criticalEventsList = useCriticalEvents(setUnread, setBadgeCount);
  const finalMaintenanceList = useMaintenances(setUnread, setBadgeCount);
  useEffect(() => {
    const devzoneRnId = localStorage.getItem('devzoneReleaseNoteId');
    const emId = localStorage.getItem('emReleaseNoteId');
    const frameworkId = localStorage.getItem('frameworkReleaseNoteId');
    if (
      devzoneReleaseNote.id &&
      Number(devzoneRnId) !== devzoneReleaseNote.id
    ) {
      localStorage.setItem('devzoneReleaseNoteId', devzoneReleaseNote.id);
      setBadgeCount(prevCount => prevCount + 1);
      setUnread(preVal => ({ ...preVal, devzone: true }));
    }
    if (
      eventManagerReleaseNote.id &&
      Number(emId) !== eventManagerReleaseNote.id
    ) {
      localStorage.setItem('emReleaseNoteId', eventManagerReleaseNote.id);
      setBadgeCount(prevCount => prevCount + 1);
      setUnread(preVal => ({ ...preVal, EventManager: true }));
    }
    if (
      frameworkReleaseNote.id &&
      Number(frameworkId) !== frameworkReleaseNote.id
    ) {
      localStorage.setItem('frameworkReleaseNoteId', frameworkReleaseNote.id);
      setBadgeCount(prevCount => prevCount + 1);
      setUnread(preVal => ({ ...preVal, Frameworks: true }));
    }
    if (badgeCount > 0) {
      setBadgeToggle(false);
    }
  }, [
    badgeCount,
    devzoneReleaseNote.id,
    eventManagerReleaseNote.id,
    frameworkReleaseNote.id,
  ]);
  return (
    <NotificationStateless
      hasFeatureSwitch={hasFeatureSwitch}
      criticalEventsList={criticalEventsList}
      currentMaintenanceList={finalMaintenanceList}
      devzoneReleaseNote={devzoneReleaseNote}
      eventManagerReleaseNote={eventManagerReleaseNote}
      frameworkReleaseNote={frameworkReleaseNote}
      showUnread={showUnread}
      setUnread={setUnread}
      setToggleBadge={setBadgeToggle}
      toggleBadge={toggleBadge}
      badgeCount={badgeCount}
    />
  );
}

NotificationContainer.propTypes = {
  devzoneReleaseNote: PropTypes.object,
  eventManagerReleaseNote: PropTypes.object,
  frameworkReleaseNote: PropTypes.object,
  hasFeatureSwitch: PropTypes.func.isRequired,
};

NotificationContainer.defaultProps = {
  devzoneReleaseNote: {},
  eventManagerReleaseNote: {},
  frameworkReleaseNote: {},
};

export default NotificationContainer;
