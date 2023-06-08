import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';

export const LEADERBOARDS_QUERY = gql`
  query Leaderboards(
    $unoID: ID!
    $accountsServiceConfigId: ID!
    $titleId: Int
    $limit: Int
  ) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      gameData(titleId: $titleId) {
        env {
          shortType
          title {
            id
            name
          }
        }
        leaderboards(limit: $limit) {
          id
          name
        }
      }
    }
  }
`;

export const useStyles = makeStyles(theme => ({
  titleSection: {
    marginBottom: 10,
  },
  link: {
    color: theme.palette.primary.main,
  },
  leaderboardLink: {
    color: theme.palette.primary.main,
    fontWeight: 'normal',
    display: 'block',
  },
}));
