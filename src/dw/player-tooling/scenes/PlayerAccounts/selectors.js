import { createSelector } from 'reselect';
import { timeFromNow } from 'dw/core/helpers/date-time';

export const Account2FADataSelector = state =>
  state.Scenes.PlayerAccounts.player2FA;

const AccountPIIDataSelector = state => state.Scenes.PlayerAccounts.pii;
export const AccountPIILoadingSelector = state =>
  state.Scenes.PlayerAccounts.piiLoading;

export const AccountPIISelector = createSelector(
  AccountPIIDataSelector,
  ({ dateOfBirth, email, address1, address2, city, state, country } = {}) => {
    const age = dateOfBirth && timeFromNow(dateOfBirth, 'years');
    let ageGroup;
    if (age) {
      if (age < 12) {
        ageGroup = 'U12';
      } else if (age < 16) {
        ageGroup = 'U16';
      } else if (age < 18) {
        ageGroup = 'U18';
      } else {
        ageGroup = 'Over 18';
      }
    }
    return {
      DOB: dateOfBirth,
      'Age Group': ageGroup || 'N/A',
      Email: email || 'N/A',
      Address: address1
        ? `${address1}${address2 ? `, ${address2}` : ''}`
        : 'N/A',
      City: city || 'N/A',
      State: state || 'N/A',
      Country: country || 'N/A',
    };
  }
);
