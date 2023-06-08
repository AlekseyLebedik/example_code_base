import gql from 'graphql-tag';

export const formatAchievementsServiceData = data =>
  data.reduce(
    (map, { titleId, achievements }) =>
      achievements.length ? map.set(titleId, achievements) : map,
    new Map()
  );

export const PLAYER_ACHIEVEMENTS_QUERY = gql`
  query PlayerAchievements(
    $unoID: ID!
    $accountsServiceConfigId: ID!
    $titleId: Int
    $limit: Int
  ) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      userAchievements(titleId: $titleId) {
        titleAchievements {
          titleId
          achievements(limit: $limit) {
            id
            activationTimestamp
            name
            progress
            progressTarget
            titleId
          }
        }
      }
    }
  }
`;
