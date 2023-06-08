/**
 * Search through retrieved leaderboard data and ensure that selected leaderboard
 * is in fetched data
 * @param {*} leaderboards
 * @param {*} selectedLeaderboardId
 * @returns
 */
export const selectedLeaderboardDataFetched = (
  leaderboards,
  selectedLeaderboardId
) =>
  Boolean(
    !!selectedLeaderboardId &&
      leaderboards.find(lb => lb.id === selectedLeaderboardId)
  );
