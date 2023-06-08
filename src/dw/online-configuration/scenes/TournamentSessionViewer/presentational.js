import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import NextPageButton from 'dw/core/components/NextPageButton';
import LoadingComponent from 'dw/core/components/Loading';
import DetailSection from 'dw/online-configuration/components/SessionViewer';

import SearchForm from './components/SearchForm';
import ListItem from './components/ListItem';
import styles from './presentational.module.css';

const TournamentSessionViewerStateless = props => {
  const {
    clearSelected,
    isSelected,
    tournaments,
    onSelectTournament,
    formatDateTime,
    lobbiesData,
  } = props;
  return (
    <div className={styles.tournamentSessionViewerContainer}>
      <div className={styles.left}>
        <SearchForm clearSelected={clearSelected} />
        <div className={styles.listContainer}>
          <Typography className={styles.tournamentHeader} variant="caption">
            Tournament IDs
          </Typography>
          {props.loadingList ? (
            <CircularProgress size={30} thickness={2} />
          ) : (
            tournaments &&
            tournaments.length > 0 &&
            tournaments.map(tournament => (
              <ListItem
                tournament={tournament}
                key={tournament.tournamentID}
                isSelected={isSelected}
                onSelectTournament={onSelectTournament}
              />
            ))
          )}
        </div>
        <NextPageButton
          isLoading={props.nextPageToken === undefined}
          className={styles.nextPage}
          nextPageToken={
            props.nextPageToken !== undefined ? props.nextPageToken : 'loading'
          }
          onClick={props.detailsNextPage}
        />
      </div>
      <div className={styles.right}>
        {props.loading ? (
          <LoadingComponent />
        ) : (
          <DetailSection
            formatDateTime={formatDateTime}
            lobbies={lobbiesData}
          />
        )}
      </div>
    </div>
  );
};
export default TournamentSessionViewerStateless;

TournamentSessionViewerStateless.propTypes = {
  isSelected: PropTypes.func,
  loading: PropTypes.bool,
  clearSelected: PropTypes.func,
  loadingList: PropTypes.bool,
  tournaments: PropTypes.arrayOf(PropTypes.object),
  onSelectTournament: PropTypes.func,
  formatDateTime: PropTypes.func,
  lobbiesData: PropTypes.arrayOf(PropTypes.object),
  nextPageToken: PropTypes.string,
  detailsNextPage: PropTypes.func.isRequired,
};

TournamentSessionViewerStateless.defaultProps = {
  isSelected: () => {},
  tournaments: [],
  loading: false,
  loadingList: false,
  onSelectTournament: () => {},
  clearSelected: () => {},
  formatDateTime: () => {},
  lobbiesData: [],
  nextPageToken: undefined,
};
