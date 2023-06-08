import PropTypes from 'prop-types';

export const CREATE_EVENT_FORM = 'CREATE_EVENT_FORM';
export const SCHEDULE_EVENT_DETAIL_ID = 'SCHEDULE_EVENT_DETAIL';
export const SCHEDULE_AB_TEST_DETAIL_ID = 'SCHEDULE_AB_TEST_DETAIL';
export const SCHEDULE_EXPY_TEST_DETAIL_ID = 'SCHEDULE_EXPY_TEST_DETAIL';
export const SCHEDULE_AUTH_DETAIL_ID = 'SCHEDULE_AUTH_DETAIL';
export const SCHEDULE_DEMONWARE_DETAIL_ID = 'SCHEDULE_DEMONWARE_DETAIL_ID';
export const SCHEDULE_EXTERNAL_DETAIL_ID = 'SCHEDULE_EXTERNAL_DETAIL_ID';
export const SCHEDULE_GAMERTAG_DETAIL_ID = 'SCHEDULE_GAMERTAG_DETAIL_ID';

export const EXPY_TEST_PROPTYPE = PropTypes.shape({
  categories: PropTypes.arrayOf(PropTypes.string),
  dateEnd: PropTypes.string,
  dateStart: PropTypes.string,
  detailsTitle: PropTypes.string,
  hypothesis: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  owner: PropTypes.string,
  status: PropTypes.string,
  summary: PropTypes.string,
});
