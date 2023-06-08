import { useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useSelector, useDispatch } from '../../AppStore';
import { actions as userActions } from './index';

export const useUserProfileActions = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [userProfile, setUserProfile] = useState(profile);
  useEffect(() => {
    if (!isEqual(profile, userProfile)) setUserProfile(profile);
  }, [profile, userProfile, setUserProfile]);
  const user = useMemo(
    () => ({
      user: {
        profile: userProfile,
        actions: {
          updateUserProfile: (...args) =>
            dispatch(userActions.updateUserProfile(...args)),
          updateUserProfileSetting: (...args) =>
            dispatch(userActions.updateUserProfileSetting(...args)),
          createUserProfileSetting: (...args) =>
            dispatch(userActions.createUserProfileSetting(...args)),
          logoutUser: (...args) => dispatch(userActions.logoutUser(...args)),
        },
      },
    }),
    [userProfile, dispatch]
  );
  return user;
};
