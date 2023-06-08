import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { connect } from 'dw/core/helpers/component';
import TournamentSessionViewerStateless from './presentational';
import { fetchTournaments, fetchLobbies } from './actions';
import {
  tournamentsSelector,
  formattedLobbiesSelector,
  agGridLobbiesSelector,
  lobbiesLoadingSelector,
  searchQuerySelector,
  tournamentLoadingSelector,
  nextPageTokenSelector,
} from './selectors';

const stateToProps = (state, props) => ({
  tournaments: tournamentsSelector(state),
  formatDateTime: formatDateTimeSelector(state),
  lobbies: formattedLobbiesSelector(state, props),
  query: searchQuerySelector(state),
  nextPageToken: nextPageTokenSelector(state),
  lobbiesData: agGridLobbiesSelector(state, props),
  loading: lobbiesLoadingSelector(state),
  loadingList: tournamentLoadingSelector(state),
});

const dispatchToProps = dispatch => ({
  fetchTournaments: filters => dispatch(fetchTournaments(filters)),
  onShowMore: filters => {
    dispatch(fetchTournaments(filters, true));
  },
  onTournamentChanged: tournament => dispatch(fetchLobbies(tournament)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  detailsNextPage: () =>
    dispatchProps.onShowMore(
      {
        ...(stateProps.query || {}),
        nextPageToken: stateProps.nextPageToken,
      },
      true
    ),
});

class TournamentSessionViewer extends React.Component {
  state = {
    tournamentSelected: null,
  };

  static getDerivedStateFromProps(prevProps, prevState) {
    const { tournaments, onTournamentChanged } = prevProps;
    const { tournamentSelected } = prevState;
    if (!tournamentSelected && tournaments.length === 1) {
      const tournament = tournaments[0].tournamentID;
      onTournamentChanged(tournament);
      return {
        tournamentSelected: tournament,
      };
    }
    return null;
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    this.props.fetchTournaments(query);
  }

  onSelectTournament = tournament => {
    this.setState({
      tournamentSelected: tournament,
    });
    this.props.onTournamentChanged(tournament);
  };

  isSelected = tournament => this.state.tournamentSelected === tournament;

  clearSelected = () => {
    this.setState({ tournamentSelected: null });
  };

  render() {
    const { tournaments } = this.props;
    return (
      <TournamentSessionViewerStateless
        {...this.props}
        isSelected={this.isSelected}
        clearSelected={this.clearSelected}
        tournaments={tournaments}
        onSelectTournament={this.onSelectTournament}
        tournamentSelected={this.state.tournamentSelected}
      />
    );
  }
}

export default connect(
  stateToProps,
  dispatchToProps,
  TournamentSessionViewer,
  mergeProps
);
TournamentSessionViewer.propTypes = {
  tournaments: PropTypes.arrayOf(PropTypes.object),
  onLoad: PropTypes.func,
  onTournamentChanged: PropTypes.func,
  location: PropTypes.object.isRequired,
  fetchTournaments: PropTypes.func.isRequired,
};

TournamentSessionViewer.defaultProps = {
  tournaments: [],
  onLoad: () => {},
  onTournamentChanged: () => {},
};
