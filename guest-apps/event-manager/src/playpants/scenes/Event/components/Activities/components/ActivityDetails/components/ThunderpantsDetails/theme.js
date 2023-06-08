import startCase from 'lodash/startCase';
import { TPANTS_STATUS_TYPES } from './constants';

export default theme => ({
  ...Object.assign(
    {},
    ...TPANTS_STATUS_TYPES.map(status => ({
      [`tpantsBadge${startCase(status)}`]: {
        background: theme.activities.thunderpants[status],
      },
      [`tpantsRow${startCase(status)}`]: {
        background: 'white',
        borderLeft: `7px solid ${theme.activities.thunderpants[status]} !important`,
      },
    }))
  ),
  tpantsDeprecated: {
    background: theme.activities.thunderpants.deprecated,
    borderRadius: '4px',
  },
});
